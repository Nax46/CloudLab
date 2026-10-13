import React, { useState } from 'react';
import {
  Smartphone,
  Globe,
  Waypoints,
  Server,
  Zap,
  Database,
  HardDrive,
  Cpu,
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface ArchComponent {
  id: string;
  type: string;
  name: string;
  icon: any;
  category: 'client' | 'network' | 'compute' | 'storage';
  role: string;
}

export const ArchitectureBuilderLab: React.FC = () => {
  const { markLabComplete } = useData();

  const availableCatalog: ArchComponent[] = [
    { id: 'client', type: 'client', name: 'Web & Mobile Clients', icon: Smartphone, category: 'client', role: 'Issues HTTPS requests and renders React UI' },
    { id: 'cdn', type: 'cdn', name: 'Cloud CDN (Edge PoPs)', icon: Globe, category: 'network', role: 'Terminates TLS, caches static media close to users' },
    { id: 'api_gateway', type: 'api_gateway', name: 'API Gateway', icon: Waypoints, category: 'network', role: 'Authentication routing, rate limiting, and SSL termination' },
    { id: 'app_server', type: 'app_server', name: 'Application Microservices', icon: Server, category: 'compute', role: 'Executes core business logic and API endpoints' },
    { id: 'serverless', type: 'serverless', name: 'Serverless Functions (FaaS)', icon: Zap, category: 'compute', role: 'Event-driven on-demand background image & telemetry processing' },
    { id: 'database', type: 'database', name: 'Managed Database (MongoDB/SQL)', icon: Database, category: 'storage', role: 'ACID transactional data records and document storage' },
    { id: 'object_storage', type: 'object_storage', name: 'Cloud Object Storage (S3)', icon: HardDrive, category: 'storage', role: 'Unstructured file uploads, videos, and immutable archives' },
    { id: 'cache', type: 'cache', name: 'In-Memory Cache (Redis)', icon: Cpu, category: 'storage', role: 'Sub-millisecond session state and database query caching' },
  ];

  // Default architecture
  const [activeNodes, setActiveNodes] = useState<ArchComponent[]>([
    availableCatalog[0], // Client
    availableCatalog[1], // CDN
    availableCatalog[2], // API Gateway
    availableCatalog[3], // App Server
    availableCatalog[5], // Database
    availableCatalog[6], // Object Storage
  ]);

  const handleAddComponent = (comp: ArchComponent) => {
    if (activeNodes.some((n) => n.id === comp.id)) return;
    setActiveNodes((prev) => [...prev, comp]);
    markLabComplete('lab-architecture-builder');
  };

  const handleRemoveComponent = (id: string) => {
    setActiveNodes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleReset = () => {
    setActiveNodes([availableCatalog[0], availableCatalog[2], availableCatalog[3], availableCatalog[5]]);
  };

  const handleLoadPreset = (presetName: string) => {
    if (presetName === '3tier') {
      setActiveNodes([availableCatalog[0], availableCatalog[1], availableCatalog[2], availableCatalog[3], availableCatalog[5], availableCatalog[6]]);
    } else if (presetName === 'serverless') {
      setActiveNodes([availableCatalog[0], availableCatalog[1], availableCatalog[2], availableCatalog[4], availableCatalog[5], availableCatalog[6]]);
    } else if (presetName === 'highperformance') {
      setActiveNodes([availableCatalog[0], availableCatalog[1], availableCatalog[2], availableCatalog[3], availableCatalog[7], availableCatalog[5], availableCatalog[6]]);
    }
    markLabComplete('lab-architecture-builder');
  };

  // Evaluate architecture health
  const hasClient = activeNodes.some((n) => n.category === 'client');
  const hasCompute = activeNodes.some((n) => n.category === 'compute');
  const hasStorage = activeNodes.some((n) => n.category === 'storage');
  const hasNetwork = activeNodes.some((n) => n.category === 'network');
  const hasCache = activeNodes.some((n) => n.id === 'cache');

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Interactive Lab E</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-white">Cloud Architecture Builder</h3>
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition w-fit"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Canvas</span>
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Assemble, connect, and validate multi-tier cloud infrastructure topologies using standard architectural patterns.
        </p>
      </div>

      {/* Architecture Preset Templates */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium">Architecture Presets:</span>
        <button
          onClick={() => handleLoadPreset('3tier')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition"
        >
          Classic 3-Tier Web System
        </button>
        <button
          onClick={() => handleLoadPreset('serverless')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 transition"
        >
          Serverless Event-Driven Pipeline
        </button>
        <button
          onClick={() => handleLoadPreset('highperformance')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition"
        >
          High-Throughput Cached Tier
        </button>
      </div>

      {/* Component Library Palette */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Component Palette (Click to Add into Architecture)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {availableCatalog.map((comp) => {
            const Icon = comp.icon;
            const isAdded = activeNodes.some((n) => n.id === comp.id);
            return (
              <button
                key={comp.id}
                onClick={() => handleAddComponent(comp)}
                disabled={isAdded}
                className={`p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                  isAdded
                    ? 'bg-slate-950/40 border-slate-800/40 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-cyan-500 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate text-[11px] font-medium">{comp.name}</span>
                </div>
                {isAdded ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topology Canvas */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider text-[11px] text-cyan-400">
            Active System Topology Pipeline
          </span>
          <span>{activeNodes.length} Components Active</span>
        </div>

        {/* Dynamic Connected Flow */}
        <div className="flex flex-wrap items-center gap-3 py-4">
          {activeNodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <React.Fragment key={node.id}>
                <div className="relative group p-4 rounded-xl bg-slate-900 border border-slate-700/80 shadow-md min-w-[170px] max-w-[210px] space-y-2 hover:border-cyan-500 transition">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-lg bg-cyan-950/70 text-cyan-400 border border-cyan-800/80">
                      <Icon className="w-5 h-5" />
                    </div>
                    <button
                      onClick={() => handleRemoveComponent(node.id)}
                      className="text-slate-400 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition"
                      title="Remove component"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white leading-tight">{node.name}</div>
                    <div className="text-[10px] text-slate-400 capitalize mt-0.5">{node.category} Tier</div>
                  </div>

                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {node.role}
                  </p>
                </div>

                {index < activeNodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-cyan-500 shrink-0 hidden sm:block animate-pulse" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Architecture Health Evaluation Checklist */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-200">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Well-Architected Framework Validation</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${hasClient ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 ${hasClient ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>Frontend Client Layer</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${hasNetwork ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 ${hasNetwork ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>Edge Routing / Gateway</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${hasCompute ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 ${hasCompute ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>Compute / App Layer</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center space-x-2 ${hasStorage ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
            <CheckCircle2 className={`w-4 h-4 ${hasStorage ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>Persistent Data Tier</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400">
          {hasCache ? (
            <span className="text-emerald-400 font-medium">
              ✓ In-Memory Cache tier is active: Relieves database load by up to 80% during peak read surges.
            </span>
          ) : (
            <span className="text-slate-400">
              Tip: Add In-Memory Cache (Redis) to decouple heavy read traffic from the primary database cluster.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
