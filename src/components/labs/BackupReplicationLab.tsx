import React, { useState } from 'react';
import { Database, RefreshCw, ArrowRight, CheckCircle2, Play, ShieldCheck, AlertCircle, HardDrive } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const BackupReplicationLab: React.FC = () => {
  const { markLabComplete } = useData();

  const [operationType, setOperationType] = useState<'replication' | 'snapshot' | 'restore'>('replication');
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [simulationComplete, setSimulationComplete] = useState(false);

  const operations = {
    replication: {
      name: 'Cross-Region S3 Object Replication (CRR)',
      source: 'Amazon S3 (us-east-1, N. Virginia)',
      destination: 'Amazon S3 (ap-south-1, Mumbai)',
      rpo: '~ 15 Minutes SLA (99.99%)',
      rto: 'Near-Instantaneous (Active-Active read replica)',
      steps: [
        'Step 1: Client puts 250 MB video asset into primary us-east-1 S3 bucket.',
        'Step 2: Amazon S3 event notification triggers Cross-Region Replication service.',
        'Step 3: Object payload is encrypted with TLS 1.3 and transferred across AWS global fiber backbone.',
        'Step 4: Destination bucket in ap-south-1 writes object across 3 local Availability Zones.',
        'Step 5: Cryptographic MD5 checksum (ETag) validated on destination object.',
      ],
    },
    snapshot: {
      name: 'Block Storage Point-In-Time Snapshot',
      source: 'Amazon EBS gp3 Volume (vol-0941bc4)',
      destination: 'S3 Distributed Snapshot Store (Regional)',
      rpo: '1 Hour (Scheduled snapshot frequency)',
      rto: '4 - 8 Minutes (New volume creation time)',
      steps: [
        'Step 1: Hypervisor quiesces filesystem I/O locks on host VM.',
        'Step 2: Changed 4KB data blocks since previous snapshot are identified via incremental tracking.',
        'Step 3: Delta blocks are streamed to redundant S3 internal backing store.',
        'Step 4: Snapshot metadata record and snapshot ID created.',
        'Step 5: I/O locks released on guest operating system.',
      ],
    },
    restore: {
      name: 'Disaster Recovery: Regional Failover & Database Restore',
      source: 'S3 Automated Archive (us-east-1, crashed)',
      destination: 'Standby Compute Cluster (eu-west-1, Frankfurt)',
      rpo: '5 Minutes (Last continuous WAL sync)',
      rto: '12 Minutes (Cluster provisioning & replay)',
      steps: [
        'Step 1: Health-check probes detect 100% loss of primary us-east-1 Availability Zone.',
        'Step 2: Route 53 DNS failover triggers health-check redirect to secondary Frankfurt region.',
        'Step 3: Standby database cluster claims latest consistent WAL transaction log.',
        'Step 4: Database engine recovers consistent state and mounts volume.',
        'Step 5: Traffic shifts to secondary region; full production service restored.',
      ],
    },
  };

  const currentOp = operations[operationType];

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);
    setCurrentStep(0);

    const totalSteps = currentOp.steps.length;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);

      if (step >= totalSteps) {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationComplete(true);
        markLabComplete('lab-backup-replication');
      }
    }, 700);
  };

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <Database className="w-4 h-4" />
          <span>Interactive Lab H</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-white">Backup, Replication &amp; Disaster Recovery Simulator</h3>
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/80 w-fit">
            Simulated Sandbox
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Trigger and trace simulated multi-region replication and point-in-time recovery events with realistic RTO and RPO metrics.
        </p>
      </div>

      {/* Operation Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {[
          { id: 'replication', label: 'Cross-Region Replication' },
          { id: 'snapshot', label: 'Incremental EBS Snapshot' },
          { id: 'restore', label: 'DR Regional Failover Restore' },
        ].map((op) => (
          <button
            key={op.id}
            onClick={() => {
              if (!isSimulating) {
                setOperationType(op.id as any);
                setCurrentStep(0);
                setSimulationComplete(false);
              }
            }}
            disabled={isSimulating}
            className={`p-3 rounded-xl border text-center text-xs font-medium transition ${
              operationType === op.id
                ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-glow-cyan'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {op.label}
          </button>
        ))}
      </div>

      {/* Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Source &amp; Destination Mapping
          </div>
          <div className="flex items-center space-x-2 text-slate-200">
            <span className="font-semibold text-rose-300">Origin:</span>
            <span className="font-mono text-[11px] truncate">{currentOp.source}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-200">
            <span className="font-semibold text-emerald-300">Target:</span>
            <span className="font-mono text-[11px] truncate">{currentOp.destination}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Disaster Recovery Metrics
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">RPO (Recovery Point Objective):</span>
            <span className="font-mono font-bold text-cyan-300">{currentOp.rpo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">RTO (Recovery Time Objective):</span>
            <span className="font-mono font-bold text-sky-300">{currentOp.rto}</span>
          </div>
        </div>
      </div>

      {/* Stepper Pipeline Visualization */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-300">Simulated Execution Pipeline</span>
          {simulationComplete && (
            <span className="text-emerald-400 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Operation Succeeded</span>
            </span>
          )}
        </div>

        <div className="space-y-2">
          {currentOp.steps.map((stepDesc, idx) => {
            const isDone = currentStep > idx;
            const isCurrent = currentStep === idx && isSimulating;

            return (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-xs flex items-center space-x-3 transition-colors ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200'
                    : isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 shadow-glow-cyan'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-cyan-500 text-slate-950 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </div>
                <span className="flex-1 font-medium">{stepDesc}</span>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleStartSimulation}
            disabled={isSimulating}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white text-xs font-semibold shadow transition"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Simulating Cloud Event...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Trigger Simulation Event</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
