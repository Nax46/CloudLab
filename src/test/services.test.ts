import { describe, it, expect } from 'vitest';
import { getUnits, getUnitBySlug } from '../services/unitsService';
import { getTopicBySlug } from '../services/topicsService';
import { getQuizzes } from '../services/quizzesService';
import { getLabs } from '../services/labsService';
import { getProviders } from '../services/providersService';
import { getCaseStudies } from '../services/caseStudiesService';
import { getGlossary } from '../services/glossaryService';
import { getResources } from '../services/resourcesService';
import { searchContent } from '../services/searchService';

describe('Data Access Layer (Services)', () => {
  it('fetches all 6 units from data access layer', async () => {
    const units = await getUnits();
    expect(units).toBeDefined();
    expect(units.length).toBe(6);
    expect(units[0].unit_number).toBe(1);
    expect(units[5].unit_number).toBe(6);
  });

  it('fetches single unit details by slug', async () => {
    const unit1 = await getUnitBySlug('unit-1-intro-to-cloud-computing');
    expect(unit1).not.toBeNull();
    expect(unit1?.title).toContain('Introduction to Cloud Computing');
    expect(unit1?.learning_objectives?.length).toBeGreaterThan(0);
  });

  it('fetches topic details by slug with lessons', async () => {
    const topic = await getTopicBySlug('u1-definition-evolution-characteristics');
    expect(topic).not.toBeNull();
    expect(topic?.title).toContain('NIST Characteristics');
    expect(topic?.key_points?.length).toBeGreaterThan(0);
  });

  it('fetches quizzes catalog', async () => {
    const quizzes = await getQuizzes();
    expect(quizzes.length).toBeGreaterThanOrEqual(1);
  });

  it('fetches interactive labs configurations', async () => {
    const labs = await getLabs();
    expect(labs.length).toBe(9);
  });

  it('fetches cloud providers comparison data', async () => {
    const providers = await getProviders();
    expect(providers.length).toBe(3);
    const names = providers.map((p) => p.name);
    expect(names.some((n) => n.includes('AWS'))).toBe(true);
    expect(names.some((n) => n.includes('Azure'))).toBe(true);
    expect(names.some((n) => n.includes('Google Cloud'))).toBe(true);
  });

  it('fetches educational case studies', async () => {
    const caseStudies = await getCaseStudies();
    expect(caseStudies.length).toBeGreaterThanOrEqual(3);
    const orgs = caseStudies.map((cs) => cs.organization);
    expect(orgs).toContain('Netflix Inc.');
    expect(orgs).toContain('Dropbox Inc.');
  });

  it('fetches glossary terms and supports query filtering', async () => {
    const allTerms = await getGlossary();
    expect(allTerms.length).toBeGreaterThan(10);

    const filtered = await getGlossary('NIST');
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered[0].term).toContain('NIST');
  });

  it('fetches curated educational resources', async () => {
    const resources = await getResources();
    expect(resources.length).toBeGreaterThanOrEqual(5);
  });

  it('executes global search across units, topics, and glossary', async () => {
    const res = await searchContent('virtualization');
    expect(res.units.length + res.topics.length + res.glossary.length).toBeGreaterThan(0);
  });
});
