import React, { useState } from 'react';
import { Server, Layers, Globe, Shield, Check, X, HelpCircle } from 'lucide-react';

export const ServiceModelsLab: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<'iaas' | 'paas' | 'saas'>('iaas');

  const stackLayers = [
    { id: 'app', name: 'Applications', desc: 'Custom code, UI, microservices' },
    { id: 'data', name: 'Data & Databases', desc: 'Customer records, persistent state' },
    { id: 'runtime', name: 'Runtime', desc: 'Node.js, Python, Java, .NET engines' },
    { id: 'middleware', name: 'Middleware', desc: 'Message queues, web servers (Nginx/Apache)' },
    { id: 'os', name: 'Operating System', desc: 'Ubuntu, Red Hat, Windows Server' },
    { id: 'virt', name: 'Virtualization', desc: 'Hypervisor (KVM, ESXi, Nitro)' },
    { id: 'servers', name: 'Physical Servers', desc: 'Motherboards, CPUs, RAM sticks' },
    { id: 'storage', name: 'Physical Storage', desc: 'NVMe SSDs, HDDs, SAN arrays' },
    { id: 'network', name: 'Physical Network', desc: 'Cabling, routers, data center switches' },
  ];

  // Who manages what: 'user' | 'provider'
  const managementMatrix: Record<'iaas' | 'paas' | 'saas', Record<string, 'user' | 'provider'>> = {
    iaas: {
      app: 'user',
      data: 'user',
      runtime: 'user',
      middleware: 'user',
      os: 'user',
      virt: 'provider',
      servers: 'provider',
      storage: 'provider',
      network: 'provider',
    },
    paas: {
      app: 'user',
      data: 'user',
      runtime: 'provider',
      middleware: 'provider',
      os: 'provider',
      virt: 'provider',
      servers: 'provider',
      storage: 'provider',
      network: 'provider',
    },
    saas: {
      app: 'provider',
      data: 'provider',
      runtime: 'provider',
      middleware: 'provider',
      os: 'provider',
      virt: 'provider',
      servers: 'provider',
      storage: 'provider',
      network: 'provider',
    },
  };

  const details = {
    iaas: {
      name: 'Infrastructure as a Service (IaaS)',
      tagline: 'Raw virtual hardware; highest control and responsibility.',
      examples: 'Amazon EC2, Google Compute Engine, Azure VMs, Linode',
      useCase: 'Deploying custom OS kernels, legacy software migrations, granular network configurations.',
      pros: ['Total administrative freedom', 'Hardware-level sizing options', 'Complete OS choice'],
      cons: ['Responsible for OS security patches', 'Highest maintenance overhead', 'Manual disaster recovery'],
    },
    paas: {
      name: 'Platform as a Service (PaaS)',
      tagline: 'Developer-focused execution environment; rapid time to market.',
      examples: 'Vercel, AWS Elastic Beanstalk, Heroku, Google App Engine',
      useCase: 'Web apps, microservice APIs, startups prioritizing rapid shipping over server configuration.',
      pros: ['Zero OS patching', 'Automatic auto-scaling and SSL', 'Rapid git-push deployments'],
      cons: ['Framework and language constraints', 'Less control over network routing', 'Potential cost premium at scale'],
    },
    saas: {
      name: 'Software as a Service (SaaS)',
      tagline: 'Complete turnkey end-user applications hosted in the cloud.',
      examples: 'Google Workspace (Gmail, Docs), Microsoft 365, Salesforce, Zoom',
      useCase: 'General business software where building custom internal software is unnecessary.',
      pros: ['Immediate usability in browser', 'No installation or upgrades needed', 'Multi-device sync'],
      cons: ['Zero underlying customization', 'Dependent on third-party uptime', 'Recurring user subscription fee'],
    },
  };

  const currentDetail = details[selectedModel];
  const currentMatrix = managementMatrix[selectedModel];

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Interactive Lab A</span>
        </div>
        <h3 className="text-xl font-bold text-white">Cloud Service Model Explorer (SPI Framework)</h3>
        <p className="text-xs text-slate-400 mt-1">
          Explore the shared responsibility boundaries between the customer and cloud provider across IaaS, PaaS, and SaaS.
        </p>
      </div>

      {/* Model Selector Buttons */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { id: 'iaas', label: 'IaaS', sub: 'Infrastructure' },
          { id: 'paas', label: 'PaaS', sub: 'Platform' },
          { id: 'saas', label: 'SaaS', sub: 'Software' },
        ].map((m) => {
          const isSelected = selectedModel === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m.id as any)}
              className={`p-3.5 rounded-xl border text-center transition ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-glow-cyan'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className="text-base font-bold">{m.label}</div>
              <div className="text-[10px] text-cyan-300/80 uppercase tracking-wider">{m.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Interactive Stack Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stack Layers (Left) */}
        <div className="lg:col-span-6 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400 px-1">
            <span>Architectural Layer</span>
            <span>Managed By</span>
          </div>

          <div className="space-y-1.5">
            {stackLayers.map((layer) => {
              const managedBy = currentMatrix[layer.id];
              const isUser = managedBy === 'user';
              return (
                <div
                  key={layer.id}
                  className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors duration-200 ${
                    isUser
                      ? 'bg-amber-950/30 border-amber-800/60 text-amber-100'
                      : 'bg-cyan-950/30 border-cyan-800/60 text-cyan-100'
                  }`}
                >
                  <div>
                    <span className="font-semibold">{layer.name}</span>
                    <span className="text-[10px] text-slate-400 ml-2 hidden sm:inline">
                      ({layer.desc})
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isUser
                        ? 'bg-amber-900/60 text-amber-300 border border-amber-700/80'
                        : 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/80'
                    }`}
                  >
                    {isUser ? 'Customer' : 'Provider'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center space-x-4 pt-2 text-[11px] text-slate-400">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-amber-900/60 border border-amber-700/80" />
              <span>You Manage (Customer)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-cyan-900/60 border border-cyan-700/80" />
              <span>Cloud Provider Manages</span>
            </div>
          </div>
        </div>

        {/* Model Breakdown Details (Right) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-base font-bold text-white flex items-center space-x-2">
              <span>{currentDetail.name}</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{currentDetail.tagline}</p>

            <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Real-World Examples:</span>
                <p className="text-cyan-300 font-mono text-[11px] mt-0.5">{currentDetail.examples}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Ideal Use Case:</span>
                <p className="text-slate-300 mt-0.5">{currentDetail.useCase}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-200 space-y-2">
              <div className="font-semibold text-emerald-400 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>Key Advantages</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {currentDetail.pros.map((p, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-rose-200 space-y-2">
              <div className="font-semibold text-rose-400 flex items-center space-x-1">
                <X className="w-3.5 h-3.5" />
                <span>Trade-offs &amp; Limits</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {currentDetail.cons.map((c, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-rose-400">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
