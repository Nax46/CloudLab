import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Cpu,
  ShieldCheck,
  Database,
  TrendingUp,
  Terminal,
  BookOpen,
  HelpCircle,
  FolderGit2,
  BookmarkCheck,
  Server,
  Cloud,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { progress } = useData();

  const unitsNav = [
    { num: 1, title: 'Unit 1: Intro to Cloud', slug: 'unit-1-intro-to-cloud-computing', icon: Cloud },
    { num: 2, title: 'Unit 2: Virtualization', slug: 'unit-2-virtualization-in-cloud', icon: Cpu },
    { num: 3, title: 'Unit 3: Architecture & Models', slug: 'unit-3-cloud-architecture-services-models', icon: Layers },
    { num: 4, title: 'Unit 4: Security & Privacy', slug: 'unit-4-cloud-security-and-privacy', icon: ShieldCheck },
    { num: 5, title: 'Unit 5: Storage & Data', slug: 'unit-5-cloud-storage-data-management', icon: Database },
    { num: 6, title: 'Unit 6: Trends & Future Scope', slug: 'unit-6-cloud-trends-standards-future-scope', icon: TrendingUp },
  ];

  const labsNav = [
    { title: 'A. Service Models (IaaS/PaaS/SaaS)', path: '/labs/architecture' },
    { title: 'B. Deployment Models', path: '/labs/architecture' },
    { title: 'C. Virtualization Simulator', path: '/labs/virtualization' },
    { title: 'D. Load Balancing Simulator', path: '/labs/virtualization' },
    { title: 'E. Architecture Builder', path: '/labs/architecture' },
    { title: 'F. Cloud Security Lab', path: '/labs/security' },
    { title: 'G. Cloud Storage Explorer', path: '/labs/storage' },
    { title: 'H. Backup & Replication', path: '/labs/storage' },
    { title: 'I. Future Cloud Explorer', path: '/labs/future-cloud' },
  ];

  const mainNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
      isActive
        ? 'bg-blue-50 text-blue-700 border border-blue-200'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-24 z-50 md:z-20 h-screen md:h-[calc(100vh-6rem)] w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 transition-transform duration-300 ease-in-out overflow-y-auto shadow-xs ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Main Section */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Main Navigation
            </div>
            <NavLink to="/dashboard" className={mainNavClass} onClick={onClose}>
              <LayoutDashboard className="w-4 h-4 text-blue-600" />
              <span>Learning Dashboard</span>
            </NavLink>
            <NavLink to="/units" className={mainNavClass} onClick={onClose}>
              <Layers className="w-4 h-4 text-blue-600" />
              <span>All 6 Syllabus Units</span>
            </NavLink>
            <NavLink to="/labs" className={mainNavClass} onClick={onClose}>
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>9 Interactive Labs</span>
            </NavLink>
          </div>

          {/* Syllabus Units Breakdown */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>BCA FCC Syllabus</span>
              <span className="text-[9px] font-mono font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                Sem V
              </span>
            </div>
            {unitsNav.map((u) => {
              const Icon = u.icon;
              return (
                <NavLink
                  key={u.num}
                  to={`/units/${u.slug}`}
                  className={mainNavClass}
                  onClick={onClose}
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span className="truncate">{u.title}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Interactive Simulations */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Simulation Directory
            </div>
            {labsNav.map((lab, idx) => (
              <NavLink
                key={idx}
                to={lab.path}
                className={mainNavClass}
                onClick={onClose}
              >
                <Server className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate text-[11px]">{lab.title}</span>
              </NavLink>
            ))}
          </div>

          {/* Course Utilities & Exam Materials */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Exam &amp; Reference Material
            </div>
            <NavLink to="/providers" className={mainNavClass} onClick={onClose}>
              <Server className="w-4 h-4 text-slate-500" />
              <span>AWS, Azure &amp; GCP</span>
            </NavLink>
            <NavLink to="/case-studies" className={mainNavClass} onClick={onClose}>
              <FolderGit2 className="w-4 h-4 text-slate-500" />
              <span>Industry Case Studies</span>
            </NavLink>
            <NavLink to="/quiz" className={mainNavClass} onClick={onClose}>
              <BookmarkCheck className="w-4 h-4 text-slate-500" />
              <span>Unit-wise Quizzes</span>
            </NavLink>
            <NavLink to="/glossary" className={mainNavClass} onClick={onClose}>
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>Cloud Terminology</span>
            </NavLink>
            <NavLink to="/resources" className={mainNavClass} onClick={onClose}>
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Official Curated Docs</span>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
