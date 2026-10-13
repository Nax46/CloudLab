import { GlossaryTerm } from '../types/database';
import { apiGet } from './apiClient';
import { mockGlossary } from '../data/mockData';

export async function getGlossary(query?: string): Promise<GlossaryTerm[]> {
  const endpoint = query ? `/glossary?q=${encodeURIComponent(query)}` : '/glossary';
  const live = await apiGet<any[]>(endpoint);
  if (live && Array.isArray(live) && live.length > 0) {
    return live.map((g) => ({
      id: g._id || g.id,
      term: g.term,
      definition: g.definition,
      related_unit_id: g.relatedUnitId || g.related_unit_id,
      display_order: g.displayOrder || g.display_order || 0,
    }));
  }

  if (query && query.trim()) {
    const qLower = query.toLowerCase();
    return mockGlossary.filter(
      (g) => g.term.toLowerCase().includes(qLower) || g.definition.toLowerCase().includes(qLower)
    );
  }

  return mockGlossary;
}
