import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Terminal,
  BookOpen,
  Award,
  ArrowRight,
  Cloud,
  Cpu,
  ShieldCheck,
  Database,
  TrendingUp,
  GraduationCap,
} from 'lucide-react';
import { getUnits } from '../services/unitsService';
import { Unit } from '../types/database';
import { useData } from '../context/DataContext';
import { CardSkeleton } from '../components/common/LoadingSkeleton';

export const DashboardPage: React.FC = () => {
  const { progress } = useData();
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

  const totalQuizzesAttempted = Object.keys(progress.quizScores).length;

  return (
    <div className="space-y-8 animate-fade-in pb-12 text-slate-900">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>BCA Honors Semester V Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            FCC Student Learning Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Fundamental of Cloud Computing — 6 Syllabus Units, 9 Interactive Practical Labs, and Quizzes.
          </p>
        </div>

        {/* Local Progress Indicator Badge */}
        <div className="flex items-center space-x-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs">
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-bold">Your Study Progress</div>
            <div className="text-xs font-bold text-blue-700">
              {progress.completedLabs.length} Labs Done • {totalQuizzesAttempted} Quizzes Completed
            </div>
          </div>
        </div>
      </div>

      {/* Six Units Grid with Topic Counts from Database */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>Syllabus Units ({units.length})</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Curriculum from Database</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit) => {
              const Icon = getUnitIcon(unit.unit_number || 1);
              return (
                <div
                  key={unit.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        Unit {unit.unit_number}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{unit.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {unit.short_description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">
                      {(unit as any).topicCount ? `${(unit as any).topicCount} Topics` : 'Comprehensive Syllabus'}
                    </span>
                    <Link
                      to={`/units/${unit.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
                    >
                      <span>Study Unit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Featured Labs & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Available Simulations (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-blue-600" />
              <span>Available Practical Labs</span>
            </h2>
            <Link to="/labs" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
              View All 9 Labs →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              {
                title: 'Lab A: Service Models (IaaS, PaaS, SaaS)',
                path: '/labs/architecture',
                category: 'Unit 1 & 3',
                desc: 'Explore provider vs customer responsibility matrix.',
              },
              {
                title: 'Lab C: Virtualization Resource Simulator',
                path: '/labs/virtualization',
                category: 'Unit 2',
                desc: 'Configure vCPUs, RAM, and test overcommitment.',
              },
              {
                title: 'Lab D: Load Balancing Simulator',
                path: '/labs/virtualization',
                category: 'Unit 2',
                desc: 'Round-robin traffic distribution and server failover.',
              },
              {
                title: 'Lab E: Cloud Architecture Designer',
                path: '/labs/architecture',
                category: 'Unit 3',
                desc: 'Interactive multi-tier system topology canvas.',
              },
              {
                title: 'Lab F: Cloud Security & Threats',
                path: '/labs/security',
                category: 'Unit 4',
                desc: 'CIA triad challenges, DDoS, and IAM policies.',
              },
              {
                title: 'Lab G: Storage Explorer & Benchmarks',
                path: '/labs/storage',
                category: 'Unit 5',
                desc: 'Block vs File vs Object storage characteristics.',
              },
            ].map((lab, idx) => (
              <Link
                key={idx}
                to={lab.path}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition block space-y-1.5"
              >
                <div className="flex justify-between text-[10px] text-blue-700 uppercase font-bold">
                  <span>{lab.category}</span>
                  <span>Simulation</span>
                </div>
                <div className="text-xs font-bold text-slate-900">{lab.title}</div>
                <p className="text-[11px] text-slate-600 leading-relaxed">{lab.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Review & References Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Curriculum References</span>
          </h2>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs shadow-xs">
            <Link
              to="/providers"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-between transition block"
            >
              <div>
                <div className="font-bold text-slate-900">AWS vs Azure vs GCP</div>
                <div className="text-[10px] text-slate-500">Service mapping matrix</div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>

            <Link
              to="/case-studies"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-between transition block"
            >
              <div>
                <div className="font-bold text-slate-900">Netflix &amp; Dropbox Studies</div>
                <div className="text-[10px] text-slate-500">Chaos engineering &amp; hybrid storage</div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>

            <Link
              to="/quiz"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-between transition block"
            >
              <div>
                <div className="font-bold text-slate-900">Unit-Wise Master Quizzes</div>
                <div className="text-[10px] text-slate-500">Instant explanations &amp; scoring</div>
              </div>
              <Award className="w-4 h-4 text-amber-500" />
            </Link>

            <Link
              to="/glossary"
              className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-between transition block"
            >
              <div>
                <div className="font-bold text-slate-900">Cloud Terms Glossary</div>
                <div className="text-[10px] text-slate-500">Searchable A-Z terms</div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
