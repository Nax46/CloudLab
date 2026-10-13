import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cloud, Search, Menu, X, BookOpen, Layers, Award, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar, isMobileSidebarOpen }) => {
  const location = useLocation();
  const { apiStatus, isDemoForced, setIsSearchOpen } = useData();

  const isLive = apiStatus.isLiveApi && apiStatus.database === 'connected' && !isDemoForced;

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: BookOpen },
    { name: 'Syllabus Units', path: '/units', icon: Layers },
    { name: 'Interactive Labs', path: '/labs', icon: Terminal },
    { name: 'Providers', path: '/providers' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Quizzes', path: '/quiz', icon: Award },
    { name: 'Glossary', path: '/glossary' },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle navigation drawer"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <Cloud className="w-5 h-5" />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition">
                  Cloud<span className="text-blue-600">Lab</span>
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider text-blue-700 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
                  BCA FCC • Semester V
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 5).map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search & Connection Status */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs transition"
              title="Global Search (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline font-medium">Search syllabus...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white text-slate-500 border border-slate-200 rounded font-mono shadow-2xs">
                Ctrl K
              </kbd>
            </button>

            {/* Connection Badge */}
            <div
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                isLive
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              {isLive ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Atlas Connected</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Local Demo</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
