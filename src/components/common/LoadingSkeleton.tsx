import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 animate-pulse shadow-xs">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-slate-200" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-3 bg-slate-100 rounded w-1/4" />
        </div>
      </div>
      <div className="h-3 bg-slate-200 rounded w-full" />
      <div className="h-3 bg-slate-150 rounded w-4/5" />
      <div className="pt-2 flex justify-between items-center">
        <div className="h-3 bg-slate-200 rounded w-20" />
        <div className="h-6 bg-slate-200 rounded w-16" />
      </div>
    </div>
  );
};

export const DetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-3">
        <div className="h-6 bg-slate-200 rounded w-1/4" />
        <div className="h-8 bg-slate-200 rounded w-2/3" />
        <div className="h-4 bg-slate-150 rounded w-1/2" />
      </div>
      <div className="h-64 bg-slate-100 rounded-xl border border-slate-200" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-4 bg-slate-150 rounded w-4/6" />
      </div>
    </div>
  );
};
