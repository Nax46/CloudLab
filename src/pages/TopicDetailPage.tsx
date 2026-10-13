import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  FileText,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { getTopicBySlug, TopicDetail } from '../services/topicsService';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DetailSkeleton } from '../components/common/LoadingSkeleton';
import { useData } from '../context/DataContext';
import { Topic3DVisualizer } from '../components/visualizer/Topic3DVisualizer';
import { TopicAudioPlayer } from '../components/audio/TopicAudioPlayer';
import { TopicEngagementHub } from '../components/engagement/TopicEngagementHub';

export const TopicDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { markTopicComplete, progress } = useData();

  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (slug) {
      setIsLoading(true);
      getTopicBySlug(slug)
        .then((data) => {
          if (mounted) {
            setTopic(data);
            if (data?.slug) {
              markTopicComplete(data.slug);
            }
          }
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

  if (!topic) {
    return (
      <div className="space-y-6 pb-12 text-center py-16">
        <Breadcrumbs items={[{ label: 'Units', path: '/units' }, { label: 'Topic Not Found' }]} />
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Topic Not Found</h2>
          <p className="text-xs text-slate-500">The requested syllabus topic could not be found.</p>
          <Link to="/units" className="inline-block mt-3 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold">
            Back to Syllabus Units
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = progress.completedTopics.includes(topic.slug);

  return (
    <div className="space-y-8 animate-fade-in pb-16 text-slate-900">
      <Breadcrumbs
        items={[
          { label: 'Syllabus Units', path: '/units' },
          ...(topic.unit
            ? [{ label: `Unit ${topic.unit.unit_number}`, path: `/units/${topic.unit.slug}` }]
            : []),
          { label: topic.title },
        ]}
      />

      {/* Topic Title & Unit Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {topic.unit && (
            <Link
              to={`/units/${topic.unit.slug}`}
              className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition"
            >
              Unit {topic.unit.unit_number}: {topic.unit.title.replace(/^Unit \d+:\s*/, '')}
            </Link>
          )}

          {isCompleted && (
            <span className="flex items-center space-x-1 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Topic Completed</span>
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {topic.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
          {topic.short_description}
        </p>
      </div>

      {/* Audio Walkthrough Player */}
      <TopicAudioPlayer
        title={topic.title}
        summaryText={topic.short_description || topic.content.slice(0, 200)}
        keyPoints={topic.key_points}
      />

      {/* 3D Interactive Topic Visualizer */}
      <Topic3DVisualizer
        unitNumber={topic.unit?.unit_number || 1}
        topicSlug={topic.slug}
        topicTitle={topic.title}
      />

      {/* Main Educational Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Core Lesson & Deep Dive (Left 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Detailed Content Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-150 pb-3 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Syllabus Explanation &amp; Theory</span>
            </h2>

            {/* Safely rendered text blocks preserving paragraphs and formatting */}
            <div className="space-y-3 whitespace-pre-line text-slate-700 text-xs sm:text-sm leading-relaxed">
              {topic.content}
            </div>
          </div>

          {/* Real-World Industry Example */}
          {topic.real_world_example && (
            <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-800">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span>Real-World Cloud Production Example</span>
              </div>
              <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
                {topic.real_world_example}
              </p>
            </div>
          )}

          {/* Practical Lessons under this Topic */}
          {topic.lessons && topic.lessons.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Practical Lessons &amp; Scenarios</span>
              </h3>

              <div className="space-y-4">
                {topic.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs"
                  >
                    <h4 className="text-sm font-bold text-slate-900">{lesson.title}</h4>
                    <p className="text-xs text-slate-500 italic">{lesson.introduction}</p>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                      {lesson.content}
                    </div>

                    {lesson.practical_example && (
                      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-1">
                        <span className="font-bold text-blue-800 text-[11px] uppercase tracking-wider">
                          Practical Scenario:
                        </span>
                        <p className="text-blue-900">{lesson.practical_example}</p>
                      </div>
                    )}

                    {lesson.summary && (
                      <div className="text-[11px] text-slate-500 pt-1">
                        <span className="font-bold text-slate-700">Summary: </span>
                        {lesson.summary}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Engagement & University Exam Prep Hub */}
          <TopicEngagementHub
            unitNumber={topic.unit?.unit_number || 1}
            topicTitle={topic.title}
            keyPoints={topic.key_points || []}
          />
        </div>

        {/* Sidebar: Key Takeaways & Lab Links (Right 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Key Points Card */}
          {topic.key_points && topic.key_points.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Key Exam Takeaways
              </h3>
              <ul className="space-y-2 text-xs">
                {topic.key_points.map((kp, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{kp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Lab Links */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs shadow-xs">
            <div className="flex items-center space-x-2 text-blue-700 font-bold uppercase tracking-wider text-[11px]">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>Recommended Simulation</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Reinforce these concepts in our interactive simulators.
            </p>
            <Link
              to="/labs"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs transition"
            >
              <span>Open Interactive Labs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Related Topics in this Unit */}
          {topic.relatedTopics && topic.relatedTopics.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Related Topics in Unit
              </h3>
              <div className="space-y-2">
                {topic.relatedTopics.map((rt) => (
                  <Link
                    key={rt.id}
                    to={`/topics/${rt.slug}`}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition block group"
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                      {rt.title}
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {rt.shortDescription}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
