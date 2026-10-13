import React, { useEffect, useState } from 'react';
import { ExternalLink, Lightbulb, CheckCircle2, GraduationCap } from 'lucide-react';
import { getCaseStudies } from '../services/caseStudiesService';
import { CaseStudy } from '../types/database';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DetailSkeleton } from '../components/common/LoadingSkeleton';

export const CaseStudiesPage: React.FC = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCaseStudies()
      .then((data) => {
        if (mounted) setStudies(data);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-16 text-slate-900">
      <Breadcrumbs items={[{ label: 'Enterprise Case Studies' }]} />

      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-1">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Real-World Implementation Analysis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cloud Computing Case Studies
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Production architectural analyses and real-world migrations from Netflix, Dropbox, and Spotify.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <DetailSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {studies.map((cs) => (
            <div
              key={cs.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xs hover:border-blue-400 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {cs.organization}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2">{cs.title}</h2>
                </div>

                {cs.source_url && (
                  <a
                    href={cs.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                  >
                    <span>Official Engineering Blog</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Concepts Tags */}
              <div className="flex flex-wrap gap-2">
                {(cs.cloud_concepts || []).map((concept, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200 font-medium"
                  >
                    #{concept}
                  </span>
                ))}
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {cs.description}
              </div>

              {/* Lessons Learned Box */}
              {cs.lessons_learned && cs.lessons_learned.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5">
                  <div className="flex items-center space-x-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span>Architectural Lessons &amp; Takeaways for Students</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-blue-950">
                    {cs.lessons_learned.map((lesson, lIdx) => (
                      <li key={lIdx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
