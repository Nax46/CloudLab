import { CloudProvider } from '../types/database';
import { apiGet } from './apiClient';
import { mockProviders } from '../data/mockData';

export async function getProviders(): Promise<CloudProvider[]> {
  const live = await apiGet<any[]>('/providers');
  if (live && Array.isArray(live) && live.length > 0) {
    return live.map((p) => ({
      id: p._id || p.id,
      name: p.name,
      description: p.description,
      service_categories: p.serviceCategories || p.service_categories || [],
      official_website: p.officialWebsite || p.official_website,
      display_order: p.displayOrder || p.display_order || 0,
    }));
  }

  return mockProviders;
}
