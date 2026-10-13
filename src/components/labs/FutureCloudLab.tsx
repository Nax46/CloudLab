import React, { useState } from 'react';
import { TrendingUp, Zap, Globe, Leaf, GitPullRequest, Calculator, HelpCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const FutureCloudLab: React.FC = () => {
  const { markLabComplete } = useData();

  const [activeTab, setActiveTab] = useState<'serverless' | 'edge' | 'green' | 'migration'>('serverless');

  // Serverless Economics Calculator State
  const [invocationsPerMonth, setInvocationsPerMonth] = useState<number>(3000000); // 3 million
  const [executionDurationMs, setExecutionDurationMs] = useState<number>(200); // 200 ms
  const [allocatedMemoryMb, setAllocatedMemoryMb] = useState<number>(512); // 512 MB

  // Serverless pricing: $0.20 per 1M requests + $0.0000166667 per GB-second
  const requestCost = (invocationsPerMonth / 1000000) * 0.20;
  const gbSeconds = (invocationsPerMonth * (executionDurationMs / 1000) * (allocatedMemoryMb / 1024));
  const computeCost = gbSeconds * 0.0000166667;
  const totalServerlessCost = parseFloat((requestCost + computeCost).toFixed(2));
  // Compare to a dedicated t3.medium instance running 24/7 = $30.37/mo + EBS storage $8 = $38.37
  const dedicatedEc2Cost = 38.37;
  const serverlessSavings = parseFloat((dedicatedEc2Cost - totalServerlessCost).toFixed(2));

  // Edge Computing Simulator State
  const [userLocation, setUserLocation] = useState<'tokyo' | 'mumbai' | 'london' | 'saopaulo'>('mumbai');
  const edgeLatencies: Record<string, { originMs: number; edgeMs: number; deviceEdgeMs: number }> = {
    mumbai: { originMs: 195, edgeMs: 14, deviceEdgeMs: 1.8 },
    tokyo: { originMs: 165, edgeMs: 11, deviceEdgeMs: 1.5 },
    london: { originMs: 95, edgeMs: 8, deviceEdgeMs: 1.2 },
    saopaulo: { originMs: 240, edgeMs: 18, deviceEdgeMs: 2.1 },
  };
  const currentLatency = edgeLatencies[userLocation];

  // Green Cloud PUE State
  const [pueValue, setPueValue] = useState<number>(1.15);
  const itLoadKw = 10000; // 10 MW IT equipment load
  const totalFacilityPowerKw = Math.round(itLoadKw * pueValue);
  const overheadKw = totalFacilityPowerKw - itLoadKw;

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <TrendingUp className="w-4 h-4" />
          <span>Interactive Lab I</span>
        </div>
        <h3 className="text-xl font-bold text-white">Future Cloud Explorer: Serverless, Edge &amp; Green Cloud</h3>
        <p className="text-xs text-slate-400 mt-1">
          Interactive simulations demonstrating next-generation cloud paradigms: FaaS serverless economics, edge latency, and data center PUE sustainability.
        </p>
      </div>

      {/* Sub-Lab Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { id: 'serverless', label: '1. Serverless Economics', icon: Zap },
          { id: 'edge', label: '2. Edge vs Origin Latency', icon: Globe },
          { id: 'green', label: '3. Green Cloud (PUE)', icon: Leaf },
          { id: 'migration', label: '4. Gartner 6 Rs Matrix', icon: GitPullRequest },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                markLabComplete('lab-future-cloud');
              }}
              className={`p-3 rounded-xl border text-center transition flex items-center justify-center space-x-2 text-xs font-semibold ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-glow-cyan'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Serverless Cost Calculator */}
      {activeTab === 'serverless' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                FaaS (Serverless) Consumption Parameters
              </h4>

              {/* Monthly Invocations */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Monthly Invocations:</span>
                  <span className="text-cyan-400 font-mono font-bold">
                    {(invocationsPerMonth / 1000000).toFixed(1)} Million Invocations
                  </span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="500000"
                  value={invocationsPerMonth}
                  onChange={(e) => setInvocationsPerMonth(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Duration ms */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Execution Duration per Call:</span>
                  <span className="text-cyan-400 font-mono font-bold">{executionDurationMs} ms</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={executionDurationMs}
                  onChange={(e) => setExecutionDurationMs(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Memory Allocation */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Allocated Function Memory:</span>
                  <span className="text-cyan-400 font-mono font-bold">{allocatedMemoryMb} MB</span>
                </div>
                <input
                  type="range"
                  min="128"
                  max="2048"
                  step="128"
                  value={allocatedMemoryMb}
                  onChange={(e) => setAllocatedMemoryMb(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Financial Comparison Result */}
            <div className="md:col-span-5 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Monthly Financial Comparison
              </h5>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Serverless (FaaS) Cost:</div>
                <div className="text-2xl font-extrabold text-cyan-400 font-mono">
                  ${totalServerlessCost} <span className="text-xs font-normal text-slate-400">/ month</span>
                </div>
                <div className="text-[10px] text-slate-400">Scale-to-zero when idle (0 requests = $0.00)</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Dedicated Always-On VM (EC2 t3.medium):</div>
                <div className="text-lg font-bold text-slate-200 font-mono">
                  ${dedicatedEc2Cost} <span className="text-xs font-normal text-slate-400">/ month</span>
                </div>
                <div className="text-[10px] text-slate-400">Fixed cost regardless of whether anyone visits</div>
              </div>

              <div className={`p-2.5 rounded-lg text-xs font-medium ${serverlessSavings > 0 ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/60' : 'bg-amber-950/40 text-amber-300 border border-amber-800/60'}`}>
                {serverlessSavings > 0
                  ? `Serverless saves ~$${serverlessSavings}/month for this traffic profile!`
                  : `At sustained high volume, a dedicated VM cluster becomes more cost effective.`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Edge vs Origin Latency */}
      {activeTab === 'edge' && (
        <div className="space-y-4 animate-fade-in bg-slate-950 p-5 rounded-xl border border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Select Client Geographic Location:
            </h4>
            <div className="flex space-x-1.5 text-xs">
              {[
                { id: 'mumbai', label: 'Mumbai, India' },
                { id: 'tokyo', label: 'Tokyo, Japan' },
                { id: 'london', label: 'London, UK' },
                { id: 'saopaulo', label: 'São Paulo, Brazil' },
              ].map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setUserLocation(loc.id as any)}
                  className={`px-2.5 py-1 rounded-md text-xs transition ${
                    userLocation === loc.id
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Central Cloud */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
              <div className="text-[11px] font-bold uppercase text-slate-400">Centralized Cloud (US-East)</div>
              <div className="text-3xl font-extrabold text-rose-400 font-mono">{currentLatency.originMs} ms</div>
              <p className="text-[11px] text-slate-400">Cross-ocean undersea fiber round-trip latency</p>
            </div>

            {/* Edge PoP */}
            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-800/80 text-center space-y-2 shadow-glow-cyan">
              <div className="text-[11px] font-bold uppercase text-cyan-300">Edge CDN / Cloudflare Worker</div>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">{currentLatency.edgeMs} ms</div>
              <p className="text-[11px] text-slate-400">Cached and processed at local metro ISP edge</p>
            </div>

            {/* Device Edge */}
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-800/80 text-center space-y-2">
              <div className="text-[11px] font-bold uppercase text-emerald-300">On-Device Edge (IoT / Car)</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">{currentLatency.deviceEdgeMs} ms</div>
              <p className="text-[11px] text-slate-400">Local inference; zero network traversal</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Green Cloud (PUE) */}
      {activeTab === 'green' && (
        <div className="space-y-4 animate-fade-in bg-slate-950 p-5 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Data Center Power Usage Effectiveness (PUE):</span>
            <span className="text-emerald-400 font-mono font-bold text-base">PUE = {pueValue.toFixed(2)}</span>
          </div>

          <input
            type="range"
            min="1.05"
            max="2.00"
            step="0.05"
            value={pueValue}
            onChange={(e) => setPueValue(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-slate-400">
            <span>1.05 (Ideal Hyperscale)</span>
            <span>1.20 (Modern Cloud)</span>
            <span>1.80 (Legacy Enterprise Data Center)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-slate-400">Total Facility Power for 10 MW Servers:</div>
              <div className="text-xl font-bold text-white font-mono">{totalFacilityPowerKw.toLocaleString()} kW</div>
              <div className="text-[11px] text-amber-300 font-mono">Overhead Energy Waste: +{overheadKw.toLocaleString()} kW</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-slate-400">Sustainability Evaluation:</div>
              <div className={`font-bold text-sm ${pueValue <= 1.2 ? 'text-emerald-400' : pueValue <= 1.5 ? 'text-amber-400' : 'text-rose-400'}`}>
                {pueValue <= 1.2 ? 'World-Class Hyperscale Green Efficiency' : pueValue <= 1.5 ? 'Average Modern Cloud Facility' : 'Inefficient Legacy Infrastructure (Heavy Carbon Waste)'}
              </div>
              <div className="text-[10px] text-slate-400">PUE Formula: Total Facility Energy / IT Equipment Energy</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Gartner 6 Rs Matrix */}
      {activeTab === 'migration' && (
        <div className="space-y-3 animate-fade-in">
          <div className="text-xs text-slate-400">
            Gartner's 6 Rs framework guides enterprise cloud migration pathways:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              { r: 'Rehost', alt: 'Lift & Shift', desc: 'Moving VMs directly to cloud without code changes. Fastest, lowest immediate risk.' },
              { r: 'Replatform', alt: 'Lift, Tinker & Shift', desc: 'Adopting managed cloud databases (RDS) without rewriting core application logic.' },
              { r: 'Repurchase', alt: 'Drop & Shop', desc: 'Discarding legacy software in favor of SaaS subscriptions (e.g. migrating to Salesforce).' },
              { r: 'Refactor', alt: 'Re-Architect', desc: 'Redesigning as cloud-native microservices and serverless functions for maximum elasticity.' },
              { r: 'Retire', alt: 'Decommission', desc: 'Shutting down unneeded or obsolete applications, cutting 10-20% of enterprise IT bloat.' },
              { r: 'Retain', alt: 'Keep On-Premise', desc: 'Keeping sensitive or legacy mainframe workloads on-premise due to compliance.' },
            ].map((item) => (
              <div key={item.r} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{item.r}</span>
                  <span className="text-[10px] font-mono text-cyan-400">{item.alt}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
