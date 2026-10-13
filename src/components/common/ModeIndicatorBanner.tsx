import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Database, AlertTriangle, CheckCircle, RefreshCw, Sliders, X } from 'lucide-react';

export const ModeIndicatorBanner: React.FC = () => {
  const { apiStatus, isDemoForced, toggleForceDemo, refreshApiStatus } = useData();
  const [showModal, setShowModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshApiStatus();
    setIsRefreshing(false);
  };

  const isLive = apiStatus.isLiveApi && apiStatus.database === 'connected' && !isDemoForced;

  return (
    <>
      {/* Top Banner */}
      <aside aria-label="System status" className={`border-b text-xs px-4 py-2 transition-colors duration-200 ${
        isLive
          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
          : 'bg-amber-50 border-amber-200 text-amber-900'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            {isLive ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span className="font-bold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-800 shadow-2xs">
              {isLive ? 'MongoDB Atlas Connected' : 'Local Demo Mode'}
            </span>
            <span className="hidden sm:inline font-medium opacity-90 truncate max-w-xl text-xs">
              {isLive
                ? 'Educational curriculum dynamically streamed from MongoDB Atlas via Express REST API.'
                : 'Displaying offline syllabus dataset. All labs, topics, and quizzes remain 100% functional.'}
            </span>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-2xs transition disabled:opacity-50"
              title="Test connection to MongoDB API"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
              <span className="hidden sm:inline">Check Connection</span>
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold shadow-2xs transition"
              title="Switch between Live Database and Local Demo"
            >
              <Sliders className="w-3 h-3 text-slate-600" />
              <span>Data Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Settings Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Database &amp; Data Source</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">API Endpoint:</span>
                  <span className="text-slate-900 truncate max-w-[200px]">{apiStatus.apiUrl || 'http://localhost:5000/api'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">MongoDB Status:</span>
                  <span className={isLive ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                    {apiStatus.database.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Active Mode:</span>
                  <span className="text-blue-700 font-bold">{isLive ? 'LIVE ATLAS' : 'OFFLINE DEMO'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 space-y-2">
                <div className="font-bold text-xs">Switch Mode</div>
                <p className="text-[11px] text-blue-800 leading-normal">
                  You can toggle between the live MongoDB Atlas backend and the local demo mode without restarting the app.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      toggleForceDemo(false);
                      setShowModal(false);
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                      !isDemoForced
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Live MongoDB
                  </button>
                  <button
                    onClick={() => {
                      toggleForceDemo(true);
                      setShowModal(false);
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold border transition ${
                      isDemoForced
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Force Local Demo
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
