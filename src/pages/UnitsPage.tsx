import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Clock, CheckCircle, BookOpen, Cloud, Cpu, ShieldCheck, Database, TrendingUp, GraduationCap } from 'lucide-react';
import { getUnits } from '../services/unitsService';
import { Unit } from '../types/database';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CardSkeleton } from '../components/common/LoadingSkeleton';

export const UnitsPage: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getUnits()
      .then((data) => {
        if (mounted) setUnits(data);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const getUnitIcon = (num: number) => {
    switch (num) {
      case 1: return Cloud;
      case 2: return Cpu;
      case 3: return Layers;
      case 4: return ShieldCheck;
      case 5: return Database;
      case 6: return TrendingUp;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 text-slate-900">
      <Breadcrumbs items={[{ label: 'Syllabus Units' }]} />

      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-1">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>BCA Honors Semester V Curriculum</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          FCC Syllabus Units
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Complete six-unit curriculum for BCA Honors Semester V — Fundamental of Cloud Computing.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {units.map((unit) => {
            const Icon = getUnitIcon(unit.unit_number || 1);
            return (
              <div
                key={unit.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          Unit {unit.unit_number}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{unit.estimated_minutes} mins estimated</span>
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 mt-1">
                        {unit.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-3xl">
                        {unit.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/units/${unit.slug}`}
                    className="shrink-0 flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
                  >
                    <span>View Lessons &amp; 3D Models</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Learning Objectives List */}
                {unit.learning_objectives && unit.learning_objectives.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                      University Learning Objectives:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                      {unit.learning_objectives.map((obj, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
