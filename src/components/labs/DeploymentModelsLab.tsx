import React, { useState } from 'react';
import { Globe, Lock, GitMerge, Users, ShieldAlert, DollarSign, CheckCircle2 } from 'lucide-react';

export const DeploymentModelsLab: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'public' | 'private' | 'hybrid' | 'community'>('public');

  const models = [
    {
      id: 'public',
      name: 'Public Cloud',
      icon: Globe,
      ownership: 'Third-party hyperscale provider (AWS, Microsoft Azure, Google Cloud)',
      access: 'Public Internet / Direct Connect VPN',
      multiTenancy: 'Multi-Tenant with logical virtualization isolation',
      costProfile: '100% OpEx (Pay-as-you-go). Zero upfront CapEx on physical servers.',
      elasticityScore: 100,
      controlScore: 40,
      securityPerception: 75,
      costScore: 90,
      bestFor: 'Startups, mobile apps, e-commerce, big data analytics with fluctuating seasonal traffic.',
      tradeoffs: 'Maximum elasticity and lowest cost, but limited control over physical hardware placement.',
    },
    {
      id: 'private',
      name: 'Private Cloud',
      icon: Lock,
      ownership: 'Single enterprise organization (on-premise or dedicated colocation)',
      access: 'Restricted corporate intranet / leased physical fiber',
      multiTenancy: 'Single-Tenant dedicated hardware (zero noisy neighbor interference)',
      costProfile: 'High upfront CapEx for physical hardware racks, cooling, power, plus ongoing IT staff.',
      elasticityScore: 35,
      controlScore: 100,
      securityPerception: 98,
      costScore: 30,
      bestFor: 'National defense systems, sovereign citizen identity registries, banking ledger mainframes.',
      tradeoffs: 'Maximum data sovereignty and physical control, but high capital cost and finite capacity.',
    },
    {
      id: 'hybrid',
      name: 'Hybrid Cloud',
      icon: GitMerge,
      ownership: 'Shared between private on-premise infrastructure and public hyperscale cloud',
      access: 'Encrypted VPN tunnels and dedicated Direct Connect / ExpressRoute links',
      multiTenancy: 'Single-tenant private tier for core data + Multi-tenant public tier for elasticity',
      costProfile: 'Balanced: Fixed CapEx for steady-state databases + Variable OpEx for burst traffic.',
      elasticityScore: 90,
      controlScore: 85,
      securityPerception: 90,
      costScore: 70,
      bestFor: 'Commercial banks, healthcare providers, seasonal retail bursting during peak holidays.',
      tradeoffs: 'Highest architectural flexibility and compliance, but highest network orchestration complexity.',
    },
    {
      id: 'community',
      name: 'Community Cloud',
      icon: Users,
      ownership: 'Consortium of organizations sharing common mission, compliance, or regulatory goals',
      access: 'Restricted community federation members',
      multiTenancy: 'Community Multi-Tenant (shared exclusively among trusted peer organizations)',
      costProfile: 'Pooled CapEx and OpEx distributed among member institutions.',
      elasticityScore: 60,
      controlScore: 75,
      securityPerception: 88,
      costScore: 65,
      bestFor: 'Government agency clouds (AWS GovCloud), university research networks, hospital clearinghouses.',
      tradeoffs: 'Tailored compliance and pooled costs, but requires multi-party governance consensus.',
    },
  ];

  const current = models.find((m) => m.id === activeModel)!;

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <Globe className="w-4 h-4" />
          <span>Interactive Lab B</span>
        </div>
        <h3 className="text-xl font-bold text-white">Cloud Deployment Model Explorer</h3>
        <p className="text-xs text-slate-400 mt-1">
          Compare Public, Private, Hybrid, and Community cloud deployments across ownership, tenancy, and operational trade-offs.
        </p>
      </div>

      {/* Deployment Model Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {models.map((m) => {
          const Icon = m.icon;
          const isSelected = activeModel === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModel(m.id as any)}
              className={`p-3.5 rounded-xl border text-left transition flex items-center space-x-3 ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-glow-cyan'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">{m.name}</div>
                <div className="text-[10px] text-slate-400 capitalize">{m.id} model</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Model Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Core Attributes */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div>
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Ownership &amp; Hosting:</span>
              <p className="text-slate-200 font-medium mt-0.5">{current.ownership}</p>
            </div>

            <div className="border-t border-slate-850 pt-2">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Access Network:</span>
              <p className="text-slate-200 mt-0.5">{current.access}</p>
            </div>

            <div className="border-t border-slate-850 pt-2">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Tenancy Isolation:</span>
              <p className="text-slate-200 mt-0.5">{current.multiTenancy}</p>
            </div>

            <div className="border-t border-slate-850 pt-2">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Financial Cost Structure:</span>
              <p className="text-cyan-300 mt-0.5">{current.costProfile}</p>
            </div>

            <div className="border-t border-slate-850 pt-2">
              <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Best Suited For:</span>
              <p className="text-slate-300 mt-0.5">{current.bestFor}</p>
            </div>
          </div>
        </div>

        {/* Trade-off Radar / Metrics Bar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Comparative Metrics Benchmark
            </h4>

            {/* Elasticity */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Rapid Elasticity:</span>
                <span className="text-cyan-400 font-mono font-semibold">{current.elasticityScore}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${current.elasticityScore}%` }}
                />
              </div>
            </div>

            {/* Control */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Hardware &amp; Physical Control:</span>
                <span className="text-sky-400 font-mono font-semibold">{current.controlScore}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${current.controlScore}%` }}
                />
              </div>
            </div>

            {/* Security Control */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Sovereign Data Isolation:</span>
                <span className="text-emerald-400 font-mono font-semibold">{current.securityPerception}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${current.securityPerception}%` }}
                />
              </div>
            </div>

            {/* Cost Efficiency */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Upfront Capital Efficiency:</span>
                <span className="text-amber-400 font-mono font-semibold">{current.costScore}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${current.costScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-white">Summary Trade-Off: </span>
            {current.tradeoffs}
          </div>
        </div>
      </div>
    </div>
  );
};
