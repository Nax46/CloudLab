import React, { useEffect, useState } from 'react';
import { Award, GraduationCap } from 'lucide-react';
import { getQuizzes } from '../services/quizzesService';
import { Quiz } from '../types/database';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DetailSkeleton } from '../components/common/LoadingSkeleton';
import { QuizRunner } from '../components/quiz/QuizRunner';
import { useData } from '../context/DataContext';

export const QuizPage: React.FC = () => {
  const { progress } = useData();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getQuizzes()
      .then((data) => {
        if (mounted) {
          setQuizzes(data);
          if (data.length > 0 && !activeQuizId) {
            setActiveQuizId(data[0].id);
          }
        }
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const activeQuiz = quizzes.find((q) => q.id === activeQuizId);

  return (
    <div className="space-y-8 animate-fade-in pb-16 text-slate-900">
      <Breadcrumbs items={[{ label: 'Unit-Wise Mastery Quizzes' }]} />

      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-1">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>BCA Semester V Self-Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Unit-Wise Cloud Mastery Quizzes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Test your conceptual understanding with immediate feedback, detailed question explanations, and local score tracking.
        </p>
      </div>

      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quiz Selection Tabs (Left 4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Unit Quiz ({quizzes.length})
            </h2>

            <div className="space-y-2">
              {quizzes.map((q, idx) => {
                const isSelected = activeQuizId === q.id;
                const pastScore = progress.quizScores[q.id || q.title];

                return (
                  <button
                    key={q.id || idx}
                    onClick={() => setActiveQuizId(q.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition flex flex-col space-y-1.5 ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 text-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900 line-clamp-1">{q.title}</span>
                      {pastScore && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                          {pastScore.score}/{pastScore.total}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {q.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Quiz Runner (Right 8 cols) */}
          <div className="lg:col-span-8">
            {activeQuiz ? (
              <QuizRunner key={activeQuiz.id} quiz={activeQuiz} />
            ) : (
              <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                Please select a unit quiz to begin.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
