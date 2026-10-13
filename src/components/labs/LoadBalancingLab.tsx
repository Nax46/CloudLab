import React, { useState } from 'react';
import { Server, Plus, Minus, RefreshCw, Activity, Shield, Cpu, Gauge } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface ServerNode {
  id: number;
  name: string;
  weight: number;
  isOnline: boolean;
}

export const LoadBalancingLab: React.FC = () => {
  const { markLabComplete } = useData();

  const [totalRps, setTotalRps] = useState<number>(3000); // Requests per second
  const [algorithm, setAlgorithm] = useState<'round-robin' | 'least-connections' | 'ip-hash' | 'weighted'>('round-robin');

  const [servers, setServers] = useState<ServerNode[]>([
    { id: 1, name: 'Web-Node-01 (us-east-1a)', weight: 1, isOnline: true },
    { id: 2, name: 'Web-Node-02 (us-east-1b)', weight: 1, isOnline: true },
    { id: 3, name: 'Web-Node-03 (us-east-1c)', weight: 1, isOnline: true },
  ]);

  const activeServers = servers.filter((s) => s.isOnline);
  const activeCount = activeServers.length;

  const handleAddServer = () => {
    if (servers.length >= 6) return;
    const nextId = servers.length + 1;
    setServers((prev) => [
      ...prev,
      {
        id: nextId,
        name: `Web-Node-0${nextId} (us-east-1${String.fromCharCode(96 + (nextId % 3 || 3))})`,
        weight: nextId % 2 === 0 ? 2 : 1,
        isOnline: true,
      },
    ]);
    markLabComplete('lab-load-balancing');
  };

  const handleRemoveServer = () => {
    if (servers.length <= 1) return;
    setServers((prev) => prev.slice(0, prev.length - 1));
  };

  const handleToggleServer = (id: number) => {
    if (activeCount <= 1 && servers.find((s) => s.id === id)?.isOnline) return; // Prevent 0 servers
    setServers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isOnline: !s.isOnline } : s))
    );
  };

  // Calculate distribution based on algorithm
  const calculateNodeMetrics = (node: ServerNode) => {
    if (!node.isOnline) {
      return { rps: 0, cpuPercent: 0, latencyMs: 0, status: 'offline' };
    }

    let share = 0;
    if (algorithm === 'round-robin') {
      share = totalRps / activeCount;
    } else if (algorithm === 'least-connections') {
      // Dynamic balancing with slight randomized variance
      const variance = (node.id % 2 === 0 ? 1.05 : 0.95);
      share = (totalRps / activeCount) * variance;
    } else if (algorithm === 'ip-hash') {
      // IP hashing maps sticky hash buckets
      const hashWeights = [0.35, 0.28, 0.37, 0.30, 0.33, 0.25];
      const normalizedRatio = hashWeights[(node.id - 1) % hashWeights.length];
      share = totalRps * (normalizedRatio / activeServers.reduce((sum, s) => sum + hashWeights[(s.id - 1) % hashWeights.length], 0));
    } else if (algorithm === 'weighted') {
      const totalWeight = activeServers.reduce((acc, s) => acc + s.weight, 0);
      share = totalRps * (node.weight / totalWeight);
    }

    const rps = Math.round(share);
    // Capacity threshold: 1,200 RPS = 100% CPU
    const cpuPercent = Math.min(100, Math.round((rps / 1200) * 100));
    // Latency grows exponentially as CPU passes 85%
    const baseLatency = 12;
    const latencyMs = cpuPercent > 85 ? Math.round(baseLatency + Math.pow((cpuPercent - 85) / 2, 2)) : baseLatency + Math.round(cpuPercent / 15);

    let status = 'healthy';
    if (cpuPercent > 90) status = 'overloaded';
    else if (cpuPercent > 75) status = 'stressed';

    return { rps, cpuPercent, latencyMs, status };
  };

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <Activity className="w-4 h-4" />
          <span>Interactive Lab D</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-white">Load Balancing &amp; Traffic Distribution Simulator</h3>
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/80 w-fit">
            Simulated Mechanics
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Simulate incoming web traffic distribution, failover resilience, and the immediate effect of adding/removing backend server instances.
        </p>
      </div>

      {/* Traffic Generator & Algorithm Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
        {/* Incoming Traffic Slider (Left 7 cols) */}
        <div className="md:col-span-7 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Incoming Traffic Workload:</span>
            <span className="text-cyan-400 font-mono font-bold text-sm">
              {totalRps.toLocaleString()} Requests / Sec
            </span>
          </div>
          <input
            type="range"
            min="500"
            max="8000"
            step="250"
            value={totalRps}
            onChange={(e) => setTotalRps(parseInt(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>500 RPS (Low Traffic)</span>
            <span>3,000 RPS (Normal)</span>
            <span>8,000 RPS (Flash Surge)</span>
          </div>
        </div>

        {/* Algorithm Dropdown (Right 5 cols) */}
        <div className="md:col-span-5 space-y-2">
          <label className="text-xs text-slate-400 font-medium">Balancing Algorithm:</label>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {[
              { id: 'round-robin', label: 'Round Robin' },
              { id: 'least-connections', label: 'Least Connections' },
              { id: 'ip-hash', label: 'IP Hash (Sticky)' },
              { id: 'weighted', label: 'Weighted RR' },
            ].map((algo) => (
              <button
                key={algo.id}
                onClick={() => setAlgorithm(algo.id as any)}
                className={`px-2.5 py-1.5 rounded-lg border text-center transition text-[11px] font-medium ${
                  algorithm === algo.id
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {algo.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fleet Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-slate-300 font-semibold">Active Backend Nodes:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono font-bold">
            {activeCount} of {servers.length} Online
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleAddServer}
            disabled={servers.length >= 6}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-medium transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Scale Out (+ Server)</span>
          </button>
          <button
            onClick={handleRemoveServer}
            disabled={servers.length <= 1}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700 font-medium transition"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>Scale In (- Server)</span>
          </button>
        </div>
      </div>

      {/* Server Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {servers.map((node) => {
          const metrics = calculateNodeMetrics(node);
          const isOverloaded = metrics.status === 'overloaded';
          const isStressed = metrics.status === 'stressed';

          return (
            <div
              key={node.id}
              className={`p-4 rounded-xl border transition-all ${
                !node.isOnline
                  ? 'bg-slate-950/40 border-slate-800/40 opacity-50'
                  : isOverloaded
                  ? 'bg-rose-950/20 border-rose-600/70 shadow-glow-cyan'
                  : isStressed
                  ? 'bg-amber-950/20 border-amber-600/60'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${node.isOnline ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-800 text-slate-400'}`}>
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-white truncate max-w-[150px]">{node.name}</h5>
                    <div className="text-[10px] text-slate-400">
                      {algorithm === 'weighted' && `Weight: ${node.weight}x • `}
                      {node.isOnline ? 'Healthy' : 'Drained / Inactive'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleServer(node.id)}
                  className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold transition ${
                    node.isOnline
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/60'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Toggle server online/offline to simulate node failure"
                >
                  {node.isOnline ? 'ONLINE' : 'OFFLINE'}
                </button>
              </div>

              {node.isOnline ? (
                <div className="space-y-2.5 text-xs">
                  {/* RPS handled */}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Handled Throughput:</span>
                    <span className="font-mono font-bold text-cyan-300">{metrics.rps.toLocaleString()} req/s</span>
                  </div>

                  {/* CPU gauge */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">CPU Core Load:</span>
                      <span className={`font-mono font-bold ${isOverloaded ? 'text-rose-400' : isStressed ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {metrics.cpuPercent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isOverloaded ? 'bg-rose-500' : isStressed ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${metrics.cpuPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Response Latency */}
                  <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-900">
                    <span className="text-slate-400">p95 Latency:</span>
                    <span className={`font-mono font-bold ${metrics.latencyMs > 40 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {metrics.latencyMs} ms
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center text-xs text-slate-400 italic">
                  Node is drained. Load balancer will route 0% traffic here.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
