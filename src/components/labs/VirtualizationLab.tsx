import React, { useState } from 'react';
import { Cpu, HardDrive, AlertTriangle, CheckCircle, RefreshCw, Info, Layers } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const VirtualizationLab: React.FC = () => {
  const { markLabComplete } = useData();

  // Physical Host Hardware Specs
  const hostPhysicalCores = 16;
  const hostPhysicalThreads = 32;
  const hostPhysicalRamGb = 64;
  const hostHypervisorOverheadRam = 4; // GB reserved for hypervisor kernel
  const usableHostRam = hostPhysicalRamGb - hostHypervisorOverheadRam; // 60 GB

  // Student Configurable VM Pool
  const [vmCount, setVmCount] = useState<number>(6);
  const [vCpuPerVm, setVCpuPerVm] = useState<number>(4);
  const [ramPerVmGb, setRamPerVmGb] = useState<number>(8);
  const [vmWorkloadFactor, setVmWorkloadFactor] = useState<number>(65); // 0 - 100% active load

  // Calculations
  const totalAllocatedVCpu = vmCount * vCpuPerVm;
  const totalAllocatedRamGb = vmCount * ramPerVmGb;

  const cpuOvercommitRatio = parseFloat((totalAllocatedVCpu / hostPhysicalThreads).toFixed(2));
  const ramUtilizationPercent = Math.round((totalAllocatedRamGb / usableHostRam) * 100);

  // Active resource usage accounting for workload factor
  const activeRamUsageGb = Math.round(totalAllocatedRamGb * (vmWorkloadFactor / 100));
  const activeCpuThreadsUsed = parseFloat((totalAllocatedVCpu * (vmWorkloadFactor / 100)).toFixed(1));

  // Threshold flags
  const isRamOverallocated = totalAllocatedRamGb > usableHostRam;
  const isCpuHighOvercommit = cpuOvercommitRatio > 3.0;
  const isCpuCriticalOvercommit = cpuOvercommitRatio > 4.5;

  const handleApplyPreset = (vms: number, vcpus: number, ram: number, load: number) => {
    setVmCount(vms);
    setVCpuPerVm(vcpus);
    setRamPerVmGb(ram);
    setVmWorkloadFactor(load);
    markLabComplete('lab-virtualization-simulator');
  };

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <Cpu className="w-4 h-4" />
          <span>Interactive Lab C</span>
        </div>
        <h3 className="text-xl font-bold text-white">Virtualization Resource Allocation Simulator</h3>
        <p className="text-xs text-slate-400 mt-1">
          Simulate Type-1 Hypervisor CPU scheduling, memory overcommitment, and memory ballooning limits on a physical server node.
        </p>
      </div>

      {/* Preset Quick Actions */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium">Workload Presets:</span>
        <button
          onClick={() => handleApplyPreset(4, 4, 8, 40)}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
        >
          Conservative Production
        </button>
        <button
          onClick={() => handleApplyPreset(8, 4, 8, 70)}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition"
        >
          High Density Cloud Pool
        </button>
        <button
          onClick={() => handleApplyPreset(16, 4, 8, 85)}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 transition"
        >
          Over-Allocated Stress Test
        </button>
      </div>

      {/* Interactive Controls & Gauges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (Left 6 cols) */}
        <div className="lg:col-span-6 space-y-5 bg-slate-950 p-5 rounded-xl border border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Virtual Machine Pool Parameters
          </h4>

          {/* VM Count */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Number of Virtual Machines (VMs):</span>
              <span className="text-cyan-400 font-mono font-bold text-sm">{vmCount} VMs</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              value={vmCount}
              onChange={(e) => setVmCount(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 VM</span>
              <span>12 VMs</span>
              <span>24 VMs</span>
            </div>
          </div>

          {/* vCPUs per VM */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">vCPUs Allocated per VM:</span>
              <span className="text-cyan-400 font-mono font-bold text-sm">{vCpuPerVm} vCPUs</span>
            </div>
            <input
              type="range"
              min="1"
              max="16"
              step="1"
              value={vCpuPerVm}
              onChange={(e) => setVCpuPerVm(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 Core</span>
              <span>8 Cores</span>
              <span>16 Cores</span>
            </div>
          </div>

          {/* RAM per VM */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">RAM Allocated per VM:</span>
              <span className="text-cyan-400 font-mono font-bold text-sm">{ramPerVmGb} GB</span>
            </div>
            <input
              type="range"
              min="2"
              max="32"
              step="2"
              value={ramPerVmGb}
              onChange={(e) => setRamPerVmGb(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>2 GB</span>
              <span>16 GB</span>
              <span>32 GB</span>
            </div>
          </div>

          {/* Average VM Active Workload */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Average Active Workload:</span>
              <span className="text-cyan-400 font-mono font-bold text-sm">{vmWorkloadFactor}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={vmWorkloadFactor}
              onChange={(e) => setVmWorkloadFactor(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10% (Idle/Dev)</span>
              <span>50% (Steady)</span>
              <span>100% (Peak Stress)</span>
            </div>
          </div>
        </div>

        {/* Real-time Utilization Dashboard (Right 6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Host Hardware Baseline Info */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex justify-between items-center">
            <div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider">Physical Server Node</div>
              <div className="font-semibold text-white mt-0.5">
                {hostPhysicalCores} Physical Cores ({hostPhysicalThreads} Threads) • {hostPhysicalRamGb} GB DDR5 RAM
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-cyan-300 border border-slate-700">
              4 GB Hypervisor OS
            </span>
          </div>

          {/* RAM Meter */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                <span>Total RAM Allocation:</span>
              </span>
              <span className={`font-mono font-bold ${isRamOverallocated ? 'text-rose-400' : 'text-cyan-300'}`}>
                {totalAllocatedRamGb} GB / {usableHostRam} GB ({ramUtilizationPercent}%)
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  isRamOverallocated
                    ? 'bg-rose-500'
                    : ramUtilizationPercent > 80
                    ? 'bg-amber-500'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                }`}
                style={{ width: `${Math.min(100, ramUtilizationPercent)}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Estimated Active Usage: ~{activeRamUsageGb} GB</span>
              <span>
                {isRamOverallocated
                  ? `Over-committed by +${totalAllocatedRamGb - usableHostRam} GB`
                  : `Available Headroom: ${usableHostRam - totalAllocatedRamGb} GB`}
              </span>
            </div>
          </div>

          {/* CPU Overcommitment Meter */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>vCPU Scheduling Ratio:</span>
              </span>
              <span
                className={`font-mono font-bold ${
                  isCpuCriticalOvercommit
                    ? 'text-rose-400'
                    : isCpuHighOvercommit
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {cpuOvercommitRatio}:1 ({totalAllocatedVCpu} vCPUs on {hostPhysicalThreads} Threads)
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  isCpuCriticalOvercommit
                    ? 'bg-rose-500'
                    : isCpuHighOvercommit
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (cpuOvercommitRatio / 4.0) * 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Active Physical Load: ~{activeCpuThreadsUsed} Threads</span>
              <span>Recommended Ceiling: 3.0:1</span>
            </div>
          </div>

          {/* Dynamic Warnings & Educational Alerts */}
          {isRamOverallocated && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Severe RAM Over-Allocation Warning!</span>
                <p className="text-[11px] text-rose-300/80 mt-0.5">
                  Total allocated memory ({totalAllocatedRamGb} GB) exceeds usable host RAM ({usableHostRam} GB).
                  If all guest VMs spike simultaneously, memory ballooning will fail and the hypervisor will trigger disk swap thrashing, causing extreme I/O degradation or kernel Out-Of-Memory (OOM) VM terminations.
                </p>
              </div>
            </div>
          )}

          {isCpuHighOvercommit && !isRamOverallocated && (
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/80 text-amber-200 text-xs flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">High CPU Overcommitment ({cpuOvercommitRatio}:1)</span>
                <p className="text-[11px] text-amber-300/80 mt-0.5">
                  Overcommitting CPU beyond 3:1 is standard in low-utilization web hosting, but will induce CPU Steal Time latency spikes if multiple VMs experience high traffic spikes simultaneously.
                </p>
              </div>
            </div>
          )}

          {!isRamOverallocated && !isCpuHighOvercommit && (
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-emerald-200 text-xs flex items-start space-x-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Optimal Virtualization Density</span>
                <p className="text-[11px] text-emerald-300/80 mt-0.5">
                  Safe allocation ratio. The hypervisor can comfortably schedule threads with minimal context-switch latency and ample memory headroom for live migration buffer pools.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
