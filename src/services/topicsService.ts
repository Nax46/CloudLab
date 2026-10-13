import { Topic, Lesson, Unit } from '../types/database';
import { apiGet } from './apiClient';
import { mockTopics, mockLessons, mockUnits } from '../data/mockData';

export interface TopicDetail extends Topic {
  unit?: Unit;
  lessons?: Lesson[];
  relatedTopics?: { id: string; title: string; slug: string; shortDescription: string }[];
}

export async function getTopicBySlug(slug: string): Promise<TopicDetail | null> {
  const liveTopic = await apiGet<any>(`/topics/${slug}`);
  if (liveTopic) {
    return {
      id: liveTopic._id || liveTopic.id,
      unit_id: liveTopic.unitId || liveTopic.unit_id,
      slug: liveTopic.slug,
      title: liveTopic.title,
      short_description: liveTopic.shortDescription || liveTopic.short_description,
      content: liveTopic.content,
      key_points: liveTopic.keyPoints || liveTopic.key_points || [],
      real_world_example: liveTopic.realWorldExample || liveTopic.real_world_example || '',
      display_order: liveTopic.displayOrder || liveTopic.display_order || 0,
      published: liveTopic.published !== false,
      unit: liveTopic.unit
        ? {
            id: liveTopic.unit._id || liveTopic.unit.id,
            slug: liveTopic.unit.slug,
            title: liveTopic.unit.title,
            short_description: liveTopic.unit.shortDescription || liveTopic.unit.short_description,
            description: liveTopic.unit.description,
            unit_number: liveTopic.unit.unitNumber || liveTopic.unit.unit_number,
            learning_objectives: liveTopic.unit.learningObjectives || liveTopic.unit.learning_objectives || [],
            estimated_minutes: liveTopic.unit.estimatedMinutes || 60,
            icon: liveTopic.unit.icon || 'Cloud',
            published: true,
            display_order: liveTopic.unit.displayOrder || 0,
          }
        : undefined,
      lessons: liveTopic.lessons?.map((l: any) => ({
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
      relatedTopics: liveTopic.relatedTopics?.map((rt: any) => ({
        id: rt._id || rt.id,
        title: rt.title,
        slug: rt.slug,
        shortDescription: rt.shortDescription || rt.short_description,
      })),
    };
  }

  // Fallback to local demo dataset
  const fallbackTopic = mockTopics.find((t) => t.slug === slug);
  if (!fallbackTopic) return null;

  const unit = mockUnits.find((u) => u.id === fallbackTopic.unit_id);
  const lessons = mockLessons.filter((l) => l.topic_id === fallbackTopic.id);
  const relatedTopics = mockTopics
    .filter((t) => t.unit_id === fallbackTopic.unit_id && t.id !== fallbackTopic.id)
    .map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      shortDescription: t.short_description || '',
    }));

  return {
    ...fallbackTopic,
    unit,
    lessons,
    relatedTopics,
  };
}
