import { CaseStudy } from '../types/database';
import { apiGet } from './apiClient';
import { mockCaseStudies } from '../data/mockData';

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const live = await apiGet<any[]>('/case-studies');
  if (live && Array.isArray(live) && live.length > 0) {
    return live.map((cs) => ({
      id: cs._id || cs.id,
      title: cs.title,
      organization: cs.organization,
      cloud_concepts: cs.cloudConcepts || cs.cloud_concepts || [],
      description: cs.description,
      lessons_learned: cs.lessonsLearned || cs.lessons_learned || [],
      source_url: cs.sourceUrl || cs.source_url,
      display_order: cs.displayOrder || cs.display_order || 0,
    }));
  }

  return mockCaseStudies;
}
