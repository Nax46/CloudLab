import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Home, Layers } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 text-center space-y-6 max-w-md mx-auto text-slate-900">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
        <Cloud className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <div className="text-4xl font-extrabold text-slate-900 font-mono">404</div>
        <h1 className="text-xl font-bold text-slate-900">Page Not Found</h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          The requested cloud educational resource could not be found. Please check the URL or return to the syllabus dashboard.
        </p>
      </div>

      <div className="flex justify-center space-x-3 pt-2">
        <Link
          to="/"
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 transition"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
        >
          <Layers className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
};
