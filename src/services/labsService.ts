import { LabConfiguration } from '../types/database';
import { apiGet } from './apiClient';
import { mockLabs } from '../data/mockData';

export async function getLabs(): Promise<LabConfiguration[]> {
  const liveLabs = await apiGet<any[]>('/labs');
  if (liveLabs && Array.isArray(liveLabs) && liveLabs.length > 0) {
    return liveLabs.map((l) => ({
      id: l._id || l.id,
      unit_id: l.unitId || l.unit_id,
      slug: l.slug,
      title: l.title,
      description: l.description,
      configuration: l.configuration || {},
      lab_type: l.labType || l.lab_type,
      display_order: l.displayOrder || l.display_order || 0,
      published: l.published !== false,
      unit: l.unit,
    }));
  }

  return mockLabs;
}

export async function getLabBySlug(slug: string): Promise<LabConfiguration | null> {
  const liveLab = await apiGet<any>(`/labs/${slug}`);
  if (liveLab) {
    return {
      id: liveLab._id || liveLab.id,
      unit_id: liveLab.unitId || liveLab.unit_id,
      slug: liveLab.slug,
      title: liveLab.title,
      description: liveLab.description,
      configuration: liveLab.configuration || {},
      lab_type: liveLab.labType || liveLab.lab_type,
      display_order: liveLab.displayOrder || liveLab.display_order || 0,
      published: liveLab.published !== false,
      unit: liveLab.unit,
    };
  }

  return mockLabs.find((l) => l.slug === slug) || null;
}
