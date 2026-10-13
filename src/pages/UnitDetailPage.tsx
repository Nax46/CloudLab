import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Layers,
  Clock,
  BookOpen,
  Terminal,
  Award,
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { getUnitBySlug, UnitDetail } from '../services/unitsService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DetailSkeleton } from '../components/common/LoadingSkeleton';
import { QuizRunner } from '../components/quiz/QuizRunner';

export const UnitDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [unit, setUnit] = useState<UnitDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'topics' | 'labs' | 'quiz'>('topics');

  useEffect(() => {
    let mounted = true;
    if (slug) {
      setIsLoading(true);
      getUnitBySlug(slug)
        .then((data) => {
          if (mounted) setUnit(data);
        })
        .finally(() => {
          if (mounted) setIsLoading(false);
        });
    }
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <Breadcrumbs items={[{ label: 'Units', path: '/units' }, { label: 'Loading...' }]} />
        <DetailSkeleton />
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="space-y-6 pb-12 text-center py-16">
        <Breadcrumbs items={[{ label: 'Units', path: '/units' }, { label: 'Not Found' }]} />
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Unit Not Found</h2>
          <p className="text-xs text-slate-500">The requested syllabus unit could not be located in the database.</p>
          <Link to="/units" className="inline-block mt-3 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold">
            Back to All Units
          </Link>
        </div>
      </div>
    );
  }

  const topics = unit.topics || [];
  const labs = unit.labs || [];
  const quiz = unit.quiz;

  return (
    <div className="space-y-6 animate-fade-in pb-16 text-slate-900">
      <Breadcrumbs
        items={[
          { label: 'Syllabus Units', path: '/units' },
          { label: `Unit ${unit.unit_number}: ${unit.title.replace(/^Unit \d+:\s*/, '')}` },
        ]}
      />

      {/* Unit Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Unit {unit.unit_number} of 6
            </span>
            <span className="text-xs text-slate-500 flex items-center space-x-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{unit.estimated_minutes} Minutes Study Time</span>
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {unit.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
          {unit.description}
        </p>

        {/* Learning Objectives Box */}
        {unit.learning_objectives && unit.learning_objectives.length > 0 && (
          <div className="pt-4 border-t border-slate-150 space-y-2">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Unit Learning Objectives
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {unit.learning_objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* View Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm">
        <button
          onClick={() => setActiveTab('topics')}
          className={`pb-3 font-semibold transition border-b-2 flex items-center space-x-2 ${
            activeTab === 'topics'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Syllabus Topics ({topics.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('labs')}
          className={`pb-3 font-semibold transition border-b-2 flex items-center space-x-2 ${
            activeTab === 'labs'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Interactive Labs ({labs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`pb-3 font-semibold transition border-b-2 flex items-center space-x-2 ${
            activeTab === 'quiz'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Mastery Quiz</span>
        </button>
      </div>

      {/* Tab Content: Topics List */}
      {activeTab === 'topics' && (
        <div className="space-y-4">
          {topics.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
              No topics published for this unit yet.
            </div>
          ) : (
            topics.map((t, idx) => (
              <div
                key={t.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">
                      Topic {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{t.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{t.short_description}</p>
                  </div>

                  <Link
                    to={`/topics/${t.slug}`}
                    className="shrink-0 flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
                  >
                    <span>Read Topic &amp; 3D Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {t.key_points && t.key_points.length > 0 && (
                  <div className="pt-3 border-t border-slate-150 flex flex-wrap gap-2">
                    {t.key_points.slice(0, 3).map((kp: string, kidx: number) => (
                      <span
                        key={kidx}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-700"
                      >
                        • {kp}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Labs List */}
      {activeTab === 'labs' && (
        <div className="space-y-4">
          {labs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
              No interactive lab explicitly linked to this unit. Explore the global{' '}
              <Link to="/labs" className="text-blue-600 hover:underline">
                Labs Directory
              </Link>
              .
            </div>
          ) : (
            labs.map((lab) => (
              <div
                key={lab.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                      {lab.lab_type}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{lab.title}</h3>
                    <p className="text-xs text-slate-600">{lab.description}</p>
                  </div>

                  <Link
                    to={`/labs/${lab.slug}`}
                    className="shrink-0 flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
                  >
                    <span>Launch Lab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Mastery Quiz */}
      {activeTab === 'quiz' && (
        <div>
          {quiz ? (
            <QuizRunner quiz={quiz} />
          ) : (
            <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200 space-y-2">
              <Award className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-sm font-semibold text-slate-800">No Unit Quiz Found</div>
              <p className="text-xs">
                Take quizzes from other units on the{' '}
                <Link to="/quiz" className="text-blue-600 hover:underline">
                  Quizzes Page
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
