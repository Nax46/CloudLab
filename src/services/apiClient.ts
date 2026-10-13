/**
 * Centralized API Client & Data Access Layer for CloudLab
 * Manages HTTP communication with the Express REST API (backed by MongoDB Atlas)
 * and seamless fallback to Local Demo mode when offline or explicitly enabled.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiStatus {
  isLiveApi: boolean;
  status: 'connected' | 'demo' | 'connecting' | 'error';
  database: 'connected' | 'disconnected';
  message: string;
  apiUrl: string;
}

// Local storage key for manual demo override
const DEMO_OVERRIDE_KEY = 'cloudlab_force_demo_mode';

let currentStatus: ApiStatus = {
  isLiveApi: false,
  status: 'connecting',
  database: 'disconnected',
  message: 'Connecting to MongoDB Atlas API...',
  apiUrl: API_BASE_URL,
};

type StatusListener = (status: ApiStatus) => void;
const listeners: Set<StatusListener> = new Set();

export function subscribeToApiStatus(listener: StatusListener): () => void {
  listeners.add(listener);
  listener(currentStatus);
  return () => {
    listeners.delete(listener);
  };
}

function updateStatus(newStatus: Partial<ApiStatus>) {
  currentStatus = { ...currentStatus, ...newStatus };
  listeners.forEach((fn) => fn(currentStatus));
}

export function isLocalDemoForced(): boolean {
  if (import.meta.env.VITE_USE_LOCAL_DEMO === 'true') return true;
  try {
    return localStorage.getItem(DEMO_OVERRIDE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setForceLocalDemo(enable: boolean): void {
  try {
    if (enable) {
      localStorage.setItem(DEMO_OVERRIDE_KEY, 'true');
    } else {
      localStorage.removeItem(DEMO_OVERRIDE_KEY);
    }
  } catch {
    // Ignore storage errors in test or private environments
  }
  checkApiHealth();
}

/**
 * Checks connection to the Express API & MongoDB Atlas
 */
export async function checkApiHealth(): Promise<ApiStatus> {
  if (isLocalDemoForced()) {
    updateStatus({
      isLiveApi: false,
      status: 'demo',
      database: 'disconnected',
      message: 'Local Demo Mode is manually enabled. Using local educational dataset.',
    });
    return currentStatus;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const isDbLive = data.database === 'connected';

      updateStatus({
        isLiveApi: true,
        status: isDbLive ? 'connected' : 'demo',
        database: isDbLive ? 'connected' : 'disconnected',
        message: isDbLive
          ? 'Live MongoDB Atlas Connected via Express API.'
          : 'Express server connected, but MongoDB Atlas is disconnected. Fallback to Local Demo available.',
      });
      return currentStatus;
    } else {
      throw new Error(`HTTP ${res.status}`);
    }
  } catch {
    updateStatus({
      isLiveApi: false,
      status: 'demo',
      database: 'disconnected',
      message: 'Express backend unreachable at ' + API_BASE_URL + '. Running in Local Demo Mode.',
    });
    return currentStatus;
  }
}

/**
 * Generic API GET requester
 */
export async function apiGet<T>(endpoint: string): Promise<T | null> {
  if (!currentStatus.isLiveApi || isLocalDemoForced()) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      console.warn(`[CloudLab API] Failed to fetch ${endpoint}: HTTP ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (error) {
    console.warn(`[CloudLab API] Network error on ${endpoint}:`, error);
    return null;
  }
}

export function getCurrentApiStatus(): ApiStatus {
  return currentStatus;
}
