import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, BookOpen, ExternalLink, ShieldCheck, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Cloud className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                Cloud<span className="text-blue-600">Lab</span>
              </span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Interactive Cloud Computing Learning &amp; Simulation Platform for BCA Honors Semester V — Fundamental of Cloud Computing (FCC).
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md w-fit font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Public Learning Platform • No Login Required</span>
            </div>
          </div>

          {/* Syllabus Units */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              FCC Syllabus Units
            </div>
            <ul className="space-y-1.5 font-medium">
              <li><Link to="/units/unit-1-intro-to-cloud-computing" className="hover:text-blue-600 transition">Unit 1: Intro to Cloud Computing</Link></li>
              <li><Link to="/units/unit-2-virtualization-in-cloud" className="hover:text-blue-600 transition">Unit 2: Virtualization &amp; Containers</Link></li>
              <li><Link to="/units/unit-3-cloud-architecture-services-models" className="hover:text-blue-600 transition">Unit 3: Architecture &amp; Service Models</Link></li>
              <li><Link to="/units/unit-4-cloud-security-and-privacy" className="hover:text-blue-600 transition">Unit 4: Security, Privacy &amp; DR</Link></li>
              <li><Link to="/units/unit-5-cloud-storage-data-management" className="hover:text-blue-600 transition">Unit 5: Storage &amp; Data Management</Link></li>
              <li><Link to="/units/unit-6-cloud-trends-standards-future-scope" className="hover:text-blue-600 transition">Unit 6: Trends, Standards &amp; Future Scope</Link></li>
            </ul>
          </div>

          {/* Interactive Labs */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Practical Simulations
            </div>
            <ul className="space-y-1.5 font-medium">
              <li><Link to="/labs/architecture" className="hover:text-blue-600 transition">Cloud Architecture Designer</Link></li>
              <li><Link to="/labs/virtualization" className="hover:text-blue-600 transition">Virtualization Resource Calculator</Link></li>
              <li><Link to="/labs/virtualization" className="hover:text-blue-600 transition">Load Balancing Sandbox</Link></li>
              <li><Link to="/labs/security" className="hover:text-blue-600 transition">CIA Triad &amp; Security Scenarios</Link></li>
              <li><Link to="/labs/storage" className="hover:text-blue-600 transition">Storage Architecture Explorer</Link></li>
              <li><Link to="/labs/future-cloud" className="hover:text-blue-600 transition">Serverless &amp; Edge Latency</Link></li>
            </ul>
          </div>

          {/* Academic & University Context */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Academic Context
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-3">
              Built as an educational tool for Indian university BCA, MCA, and Computer Science students. Focuses on theoretical depth, laboratory practicals, and university semester examinations.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-blue-700 font-semibold">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>BCA Honors Curriculum • Semester V</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} CloudLab — Interactive Cloud Computing Learning &amp; Simulation Platform.
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
            <Link to="/units" className="hover:text-blue-600 transition">Syllabus</Link>
            <Link to="/labs" className="hover:text-blue-600 transition">Labs</Link>
            <Link to="/quiz" className="hover:text-blue-600 transition">Quizzes</Link>
            <Link to="/resources" className="hover:text-blue-600 transition">Resources</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
