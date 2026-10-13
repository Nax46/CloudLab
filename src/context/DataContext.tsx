import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ApiStatus,
  checkApiHealth,
  subscribeToApiStatus,
  setForceLocalDemo,
  isLocalDemoForced,
} from '../services/apiClient';

interface ProgressState {
  completedTopics: string[]; // topic slugs
  completedLabs: string[]; // lab slugs
  quizScores: Record<string, { score: number; total: number; date: string }>; // quizId -> score
}

interface DataContextType {
  apiStatus: ApiStatus;
  refreshApiStatus: () => Promise<void>;
  toggleForceDemo: (force: boolean) => void;
  isDemoForced: boolean;
  progress: ProgressState;
  markTopicComplete: (topicSlug: string) => void;
  markLabComplete: (labSlug: string) => void;
  saveQuizScore: (quizKey: string, score: number, total: number) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const PROGRESS_STORAGE_KEY = 'cloudlab_student_progress_v1';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    isLiveApi: false,
    status: 'connecting',
    database: 'disconnected',
    message: 'Initializing...',
    apiUrl: '',
  });

  const [isDemoForced, setIsDemoForced] = useState<boolean>(isLocalDemoForced());
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Local progress storage (anonymous, stored locally on client)
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { completedTopics: [], completedLabs: [], quizScores: {} };
    } catch {
      return { completedTopics: [], completedLabs: [], quizScores: {} };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage errors
    }
  }, [progress]);

  useEffect(() => {
    const unsubscribe = subscribeToApiStatus(setApiStatus);
    checkApiHealth();
    return () => unsubscribe();
  }, []);

  // Global Ctrl+K keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const refreshApiStatus = async () => {
    await checkApiHealth();
  };

  const toggleForceDemo = (force: boolean) => {
    setForceLocalDemo(force);
    setIsDemoForced(force);
  };

  const markTopicComplete = (topicSlug: string) => {
    setProgress((prev) => ({
      ...prev,
      completedTopics: prev.completedTopics.includes(topicSlug)
        ? prev.completedTopics
        : [...prev.completedTopics, topicSlug],
    }));
  };

  const markLabComplete = (labSlug: string) => {
    setProgress((prev) => ({
      ...prev,
      completedLabs: prev.completedLabs.includes(labSlug)
        ? prev.completedLabs
        : [...prev.completedLabs, labSlug],
    }));
  };

  const saveQuizScore = (quizKey: string, score: number, total: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizKey]: { score, total, date: new Date().toISOString() },
      },
    }));
  };

  return (
    <DataContext.Provider
      value={{
        apiStatus,
        refreshApiStatus,
        toggleForceDemo,
        isDemoForced,
        progress,
        markTopicComplete,
        markLabComplete,
        saveQuizScore,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
