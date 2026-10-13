import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cloud,
  ArrowRight,
  BookOpen,
  Terminal,
  Cpu,
  ShieldCheck,
  Database,
  TrendingUp,
  Layers,
  Award,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { getUnits } from '../services/unitsService';
import { Unit } from '../types/database';
import { CardSkeleton } from '../components/common/LoadingSkeleton';
import { Topic3DVisualizer } from '../components/visualizer/Topic3DVisualizer';

export const HomePage: React.FC = () => {
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
    <div className="space-y-16 pb-16 animate-fade-in text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-10 pb-12 sm:pt-16 sm:pb-16 overflow-hidden rounded-3xl bg-white border border-slate-200 px-6 sm:px-12 shadow-sm">
        <div className="relative max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>BCA Honors Semester V Curriculum • Fundamental of Cloud Computing (FCC)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Learn Cloud Computing With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600">
              Interactive 3D Simulations
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A comprehensive, free educational platform tailored for college students. Master virtualization, cloud architectures, hypervisors, storage models, and semester exam concepts without any login barrier.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition transform hover:-translate-y-0.5"
            >
              <span>Explore Syllabus Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/labs"
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold border border-slate-300 transition"
            >
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>Launch 9 Practical Labs</span>
            </Link>
          </div>

          {/* College Stats & Syllabus Snapshot */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left border-t border-slate-200">
            <div className="p-2">
              <div className="text-2xl font-bold text-slate-900 font-mono">6 Units</div>
              <div className="text-xs text-slate-500 font-medium">Full University Syllabus</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold text-blue-600 font-mono">9 Labs</div>
              <div className="text-xs text-slate-500 font-medium">Interactive Simulations</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold text-indigo-600 font-mono">3D Models</div>
              <div className="text-xs text-slate-500 font-medium">Rotatable Architecture</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold text-emerald-600 font-mono">100% Free</div>
              <div className="text-xs text-slate-500 font-medium">No Login Required</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Visualizer Feature Spotlight */}
      <section className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-150 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>3D Interactive Learning</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Interactive 3D Virtualization Stack
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Rotate, zoom, and explode architectural layers to understand how hypervisors abstract bare-metal physical silicon to host multiple independent virtual machines.
            </p>
          </div>
          <Link
            to="/topics/u2-hypervisors-type1-type2"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition"
          >
            <span>Read Unit 2 Topic &amp; Audio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Topic3DVisualizer
          unitNumber={2}
          topicSlug="u2-hypervisors-type1-type2"
          topicTitle="Unit 2: Type 1 & Type 2 Hypervisor and Bare-Metal Hardware Stack"
        />
      </section>

      {/* Syllabus Units Directory */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Course Structure
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              BCA Semester V FCC Syllabus Units
            </h2>
            <p className="text-xs text-slate-500">
              Select any unit to access structured lessons, 3D diagrams, audio walkthroughs, and exam practice questions.
            </p>
          </div>
          <Link to="/units" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <span>View all 6 units</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {units.map((unit) => {
              const Icon = getUnitIcon(unit.unit_number || 1);
              return (
                <Link
                  key={unit.id}
                  to={`/units/${unit.slug}`}
                  className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        Unit {unit.unit_number}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                        {unit.title.replace(/^Unit \d+:\s*/, '')}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {unit.short_description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                    <span>{unit.estimated_minutes} mins reading</span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                      <span>Explore Unit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Featured Interactive Practical Labs Showcase */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Laboratory Practicals
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Interactive Cloud Simulations
            </h2>
            <p className="text-xs text-slate-500">
              Reinforce theoretical concepts with live computational sandboxes designed for college laboratory sessions.
            </p>
          </div>
          <Link to="/labs" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <span>Explore all 9 labs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Lab 1 */}
          <Link
            to="/labs/virtualization"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
              Virtualization Resource Calculator
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Configure virtual machines, vCPUs, and RAM workloads. Learn CPU overcommit thresholds and hypervisor memory contention.
            </p>
            <div className="pt-2 text-xs font-semibold text-blue-600 flex items-center space-x-1">
              <span>Open Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Lab 2 */}
          <Link
            to="/labs/virtualization"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
              Load Balancing Simulator
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Simulate traffic distribution with Round-Robin algorithms, take servers offline, and observe automated health-check failover.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center space-x-1">
              <span>Open Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Lab 3 */}
          <Link
            to="/labs/architecture"
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
              Cloud Architecture Designer
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect web clients, API gateways, microservice containers, databases, and CDNs on an interactive architectural canvas.
            </p>
            <div className="pt-2 text-xs font-semibold text-purple-700 flex items-center space-x-1">
              <span>Open Designer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* College Benefits & Features Section */}
      <section className="p-8 sm:p-12 rounded-3xl bg-slate-100 border border-slate-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Why Indian College Students Excel With CloudLab
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Built Specifically for BCA &amp; IT Undergraduates
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Everything you need to secure top marks in your university theory examination, viva voce, and practical labs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">100% Syllabus Aligned</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Covers all six units of BCA Honors Semester V FCC, including NIST models, hypervisors, SOA, CIA Triad, and cloud migration frameworks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">University Exam Questions</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Practice 5-mark and 10-mark questions with scoring keys and model answers curated from past university question papers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">No Login Required</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open directly on mobile, tablet, or college computer lab without creating accounts or entering personal data.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Interactive 3D Visuals</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              View hypervisor layers, storage disk structures, and security perimeters in 3D instead of memorizing flat textbook diagrams.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Unit Mastery Quizzes</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Test your understanding with instant explanations for every question and track your learning progress privately.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <ExternalLink className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">AWS, Azure &amp; GCP Comparison</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compare actual cloud services (EC2 vs Virtual Machines vs Compute Engine; S3 vs Blob Storage vs Cloud Storage) side-by-side.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
