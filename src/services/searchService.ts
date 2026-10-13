import { apiGet } from './apiClient';
import { mockUnits, mockTopics, mockLessons, mockGlossary } from '../data/mockData';

export interface SearchResults {
  units: { id: string; title: string; slug: string; shortDescription: string; unitNumber: number }[];
  topics: { id: string; title: string; slug: string; shortDescription: string }[];
  lessons: { id: string; title: string; summary: string }[];
  glossary: { id: string; term: string; definition: string }[];
}

export async function searchContent(query: string): Promise<SearchResults> {
  const cleanQ = query.trim();
  if (cleanQ.length < 2) {
    return { units: [], topics: [], lessons: [], glossary: [] };
  }

  const live = await apiGet<any>(`/search?q=${encodeURIComponent(cleanQ)}`);
  if (live && live.results) {
    return {
      units: live.results.units || [],
      topics: live.results.topics || [],
      lessons: live.results.lessons || [],
      glossary: live.results.glossary || [],
    };
  }

  // Fallback search over local mock dataset
  const qLower = cleanQ.toLowerCase();
  const matchedUnits = mockUnits
    .filter((u) => u.title.toLowerCase().includes(qLower) || (u.short_description && u.short_description.toLowerCase().includes(qLower)))
    .slice(0, 5)
    .map((u) => ({
      id: u.id,
      title: u.title,
      slug: u.slug,
      shortDescription: u.short_description || '',
      unitNumber: u.unit_number || 1,
    }));

  const matchedTopics = mockTopics
    .filter((t) => t.title.toLowerCase().includes(qLower) || (t.short_description && t.short_description.toLowerCase().includes(qLower)) || t.content.toLowerCase().includes(qLower))
    .slice(0, 8)
    .map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      shortDescription: t.short_description || '',
    }));

  const matchedLessons = mockLessons
    .filter((l) => l.title.toLowerCase().includes(qLower) || l.introduction.toLowerCase().includes(qLower))
    .slice(0, 5)
    .map((l) => ({
      id: l.id,
      title: l.title,
      summary: l.summary,
    }));

  const matchedGlossary = mockGlossary
    .filter((g) => g.term.toLowerCase().includes(qLower) || g.definition.toLowerCase().includes(qLower))
    .slice(0, 6)
    .map((g) => ({
      id: g.id,
      term: g.term,
      definition: g.definition,
    }));

  return {
    units: matchedUnits,
    topics: matchedTopics,
    lessons: matchedLessons,
    glossary: matchedGlossary,
  };
}
