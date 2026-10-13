import { Unit } from '../types/database';
import { apiGet } from './apiClient';
import { mockUnits, mockTopics, mockLabs, mockQuizzes } from '../data/mockData';

export interface UnitDetail extends Unit {
  topics?: any[];
  labs?: any[];
  quiz?: any;
}

export async function getUnits(): Promise<Unit[]> {
  const liveData = await apiGet<any[]>('/units');
  if (liveData && Array.isArray(liveData) && liveData.length > 0) {
    return liveData.map((u) => ({
      id: u._id || u.id,
      slug: u.slug,
      title: u.title,
      short_description: u.shortDescription || u.short_description,
      description: u.description,
      unit_number: u.unitNumber || u.unit_number,
      learning_objectives: u.learningObjectives || u.learning_objectives || [],
      estimated_minutes: u.estimatedMinutes || u.estimated_minutes || 60,
      icon: u.icon || 'Cloud',
      published: u.published !== false,
      display_order: u.displayOrder || u.display_order || 0,
      topicCount: u.topicCount,
    }));
  }

  // Fallback to local demo dataset
  return mockUnits;
}

export async function getUnitBySlug(slug: string): Promise<UnitDetail | null> {
  const liveUnit = await apiGet<any>(`/units/${slug}`);
  if (liveUnit) {
    return {
      id: liveUnit._id || liveUnit.id,
      slug: liveUnit.slug,
      title: liveUnit.title,
      short_description: liveUnit.shortDescription || liveUnit.short_description,
      description: liveUnit.description,
      unit_number: liveUnit.unitNumber || liveUnit.unit_number,
      learning_objectives: liveUnit.learningObjectives || liveUnit.learning_objectives || [],
      estimated_minutes: liveUnit.estimatedMinutes || liveUnit.estimated_minutes || 60,
      icon: liveUnit.icon || 'Cloud',
      published: liveUnit.published !== false,
      display_order: liveUnit.displayOrder || liveUnit.display_order || 0,
      topics: liveUnit.topics?.map((t: any) => ({
        id: t._id || t.id,
        unit_id: t.unitId || t.unit_id,
        slug: t.slug,
        title: t.title,
        short_description: t.shortDescription || t.short_description,
        content: t.content,
        key_points: t.keyPoints || t.key_points || [],
        real_world_example: t.realWorldExample || t.real_world_example || '',
        display_order: t.displayOrder || t.display_order || 0,
        published: t.published !== false,
        lessons: t.lessons?.map((l: any) => ({
          id: l._id || l.id,
          topic_id: l.topicId || l.topic_id,
          title: l.title,
          introduction: l.introduction,
          content: l.content,
          practical_example: l.practicalExample || l.practical_example,
          summary: l.summary,
          display_order: l.displayOrder || l.display_order || 0,
          published: l.published !== false,
        })),
      })),
      labs: liveUnit.labs?.map((lab: any) => ({
        id: lab._id || lab.id,
        unit_id: lab.unitId || lab.unit_id,
        slug: lab.slug,
        title: lab.title,
        description: lab.description,
        configuration: lab.configuration || {},
        lab_type: lab.labType || lab.lab_type,
        display_order: lab.displayOrder || lab.display_order || 0,
        published: lab.published !== false,
      })),
      quiz: liveUnit.quiz
        ? {
            id: liveUnit.quiz._id || liveUnit.quiz.id,
            unit_id: liveUnit.quiz.unitId || liveUnit.quiz.unit_id,
            title: liveUnit.quiz.title,
            description: liveUnit.quiz.description,
            published: liveUnit.quiz.published !== false,
            questions: liveUnit.quiz.questions?.map((q: any) => ({
              id: q._id || q.id,
              quiz_id: q.quizId || q.quiz_id,
              question: q.question,
              options: q.options || [],
              correct_answer: q.correctAnswer !== undefined ? q.correctAnswer : q.correct_answer,
              explanation: q.explanation,
              difficulty: q.difficulty || 'medium',
              display_order: q.displayOrder || q.display_order || 0,
            })),
          }
        : undefined,
    };
  }

  // Local demo fallback
  const fallbackUnit = mockUnits.find((u) => u.slug === slug);
  if (!fallbackUnit) return null;

  const unitTopics = mockTopics.filter((t) => t.unit_id === fallbackUnit.id);
  const unitLabs = mockLabs.filter((l) => l.unit_id === fallbackUnit.id);
  const unitQuiz = mockQuizzes.find((q) => q.unit_id === fallbackUnit.id);

  return {
    ...fallbackUnit,
    topics: unitTopics,
    labs: unitLabs,
    quiz: unitQuiz,
  };
}
