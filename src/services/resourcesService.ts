import { LearningResource } from '../types/database';
import { apiGet } from './apiClient';
import { mockResources } from '../data/mockData';

export async function getResources(): Promise<LearningResource[]> {
  const live = await apiGet<any[]>('/resources');
  if (live && Array.isArray(live) && live.length > 0) {
    return live.map((r) => ({
      id: r._id || r.id,
      title: r.title,
      description: r.description,
      resource_type: r.resourceType || r.resource_type,
      url: r.url,
      provider: r.provider,
      display_order: r.displayOrder || r.display_order || 0,
    }));
  }

  return mockResources;
}
