import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Terminal,
  Layers,
  Cpu,
  ShieldCheck,
  Database,
  TrendingUp,
  Search,
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ServiceModelsLab } from '../components/labs/ServiceModelsLab';
import { DeploymentModelsLab } from '../components/labs/DeploymentModelsLab';
import { ArchitectureBuilderLab } from '../components/labs/ArchitectureBuilderLab';
import { VirtualizationLab } from '../components/labs/VirtualizationLab';
import { LoadBalancingLab } from '../components/labs/LoadBalancingLab';
import { SecurityLab } from '../components/labs/SecurityLab';
import { StorageExplorerLab } from '../components/labs/StorageExplorerLab';
import { BackupReplicationLab } from '../components/labs/BackupReplicationLab';
import { FutureCloudLab } from '../components/labs/FutureCloudLab';

export const LabsPage: React.FC = () => {
  const location = useLocation();

  const getInitialCategory = () => {
    if (location.pathname.includes('/architecture')) return 'architecture';
    if (location.pathname.includes('/virtualization')) return 'virtualization';
    if (location.pathname.includes('/security')) return 'security';
    if (location.pathname.includes('/storage')) return 'storage';
    if (location.pathname.includes('/future-cloud')) return 'future';
    return 'all';
  };

  const [activeCategory, setActiveCategory] = useState<string>(getInitialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setActiveCategory(getInitialCategory());
  }, [location.pathname]);

  const categories = [
    { id: 'all', label: 'All 9 Labs', icon: Terminal },
    { id: 'architecture', label: 'Architecture & Models (Unit 1 & 3)', icon: Layers, path: '/labs/architecture' },
    { id: 'virtualization', label: 'Virtualization & Balancer (Unit 2)', icon: Cpu, path: '/labs/virtualization' },
    { id: 'security', label: 'Cloud Security & CIA (Unit 4)', icon: ShieldCheck, path: '/labs/security' },
    { id: 'storage', label: 'Storage & Replication (Unit 5)', icon: Database, path: '/labs/storage' },
    { id: 'future', label: 'Future Cloud & Edge (Unit 6)', icon: TrendingUp, path: '/labs/future-cloud' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16 text-slate-900">
      <Breadcrumbs items={[{ label: 'Interactive Labs Directory' }]} />

      {/* Directory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive Cloud Practical Labs
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Experiment with service models, hypervisor resource overcommitment, live traffic balancers, and architectural topologies.
          </p>
        </div>

        {/* Search Filter Bar */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-blue-600 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter labs by name or topic..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                isSelected
                  ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-blue-600" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Labs Container */}
      <div className="space-y-12">
        {/* Architecture & Models Group */}
        {(activeCategory === 'all' || activeCategory === 'architecture') && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>Architecture &amp; Cloud Models Labs</span>
              </h2>
            </div>
            <div className="space-y-8">
              <ServiceModelsLab />
              <DeploymentModelsLab />
              <ArchitectureBuilderLab />
            </div>
          </div>
        )}

        {/* Virtualization & Traffic Balancing Group */}
        {(activeCategory === 'all' || activeCategory === 'virtualization') && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                <span>Virtualization &amp; Load Balancing Labs</span>
              </h2>
            </div>
            <div className="space-y-8">
              <VirtualizationLab />
              <LoadBalancingLab />
            </div>
          </div>
        )}

        {/* Cloud Security & CIA Triad Group */}
        {(activeCategory === 'all' || activeCategory === 'security') && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span>Cloud Security &amp; Threat Defense Labs</span>
              </h2>
            </div>
            <div className="space-y-8">
              <SecurityLab />
            </div>
          </div>
        )}

        {/* Cloud Storage & Replication Group */}
        {(activeCategory === 'all' || activeCategory === 'storage') && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-600" />
                <span>Cloud Storage &amp; Disaster Recovery Labs</span>
              </h2>
            </div>
            <div className="space-y-8">
              <StorageExplorerLab />
              <BackupReplicationLab />
            </div>
          </div>
        )}

        {/* Future Cloud & Edge Computing Group */}
        {(activeCategory === 'all' || activeCategory === 'future') && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Future Cloud, Edge &amp; Green Computing Labs</span>
              </h2>
            </div>
            <div className="space-y-8">
              <FutureCloudLab />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
