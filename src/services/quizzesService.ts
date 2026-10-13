import { Quiz } from '../types/database';
import { apiGet } from './apiClient';
import { mockQuizzes, mockUnits } from '../data/mockData';

export async function getQuizzes(): Promise<Quiz[]> {
  const liveQuizzes = await apiGet<any[]>('/quizzes');
  if (liveQuizzes && Array.isArray(liveQuizzes) && liveQuizzes.length > 0) {
    return liveQuizzes.map((q) => ({
      id: q._id || q.id,
      unit_id: q.unitId || q.unit_id,
      title: q.title,
      description: q.description,
      published: q.published !== false,
      unit: q.unit,
      questionCount: q.questionCount,
    }));
  }

  return mockQuizzes;
}

export async function getQuizByUnitSlug(unitSlug: string): Promise<Quiz | null> {
  const liveQuiz = await apiGet<any>(`/quizzes/unit/${unitSlug}`);
  if (liveQuiz) {
    return {
      id: liveQuiz._id || liveQuiz.id,
      unit_id: liveQuiz.unitId || liveQuiz.unit_id,
      title: liveQuiz.title,
      description: liveQuiz.description,
      published: liveQuiz.published !== false,
      questions: liveQuiz.questions?.map((qq: any) => ({
        id: qq._id || qq.id,
        quiz_id: qq.quizId || qq.quiz_id,
        question: qq.question,
        options: qq.options || [],
        correct_answer: qq.correctAnswer !== undefined ? qq.correctAnswer : qq.correct_answer,
        explanation: qq.explanation,
        difficulty: qq.difficulty || 'medium',
        display_order: qq.displayOrder || qq.display_order || 0,
      })),
    };
  }

  // Fallback
  const unit = mockUnits.find((u) => u.slug === unitSlug);
  if (!unit) return null;
  return mockQuizzes.find((q) => q.unit_id === unit.id) || null;
}
