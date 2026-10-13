import React, { useEffect, useState } from 'react';
import { ExternalLink, GraduationCap } from 'lucide-react';
import { getResources } from '../services/resourcesService';
import { LearningResource } from '../types/database';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getResources()
      .then((data) => {
        if (mounted) setResources(data);
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
      <Breadcrumbs items={[{ label: 'Curated Syllabus Resources' }]} />

      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-1">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>BCA Semester V Reference Manuals</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Curated Educational Resources &amp; Standards
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Authoritative reference manuals, NIST special publications, IEEE standards, and recommended textbooks for BCA Semester V.
        </p>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-slate-500">Loading resources...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 hover:border-blue-400 hover:shadow-xs transition"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {res.resource_type}
                  </span>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded text-slate-500 hover:text-blue-600 transition"
                    title="Open official publication"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <h2 className="text-base font-bold text-slate-900">{res.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{res.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-150 flex items-center justify-between text-[11px] text-slate-500">
                <span>Provider: {res.provider}</span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-semibold flex items-center space-x-1"
                >
                  <span>Access Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
