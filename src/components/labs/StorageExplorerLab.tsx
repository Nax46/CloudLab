import React, { useState } from 'react';
import { Database, HardDrive, FolderTree, Check, X, Server, Layers, Cpu } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StorageExplorerLab: React.FC = () => {
  const { markLabComplete } = useData();
  const [selectedStorage, setSelectedStorage] = useState<'block' | 'file' | 'object'>('object');

  const storages = {
    block: {
      id: 'block',
      name: 'Block Storage',
      icon: Database,
      tagline: 'Raw unformatted 512B/4KB sectors mounted directly via high-speed SAN or NVMe protocols.',
      protocol: 'iSCSI, Fibre Channel, NVMe-oF (Non-Volatile Memory Express over Fabrics)',
      latencyRating: 'Ultra-Low (< 1 ms)',
      latencyScore: 98,
      scalabilityRating: 'Fixed / Pre-provisioned volume sizes (1 GB - 64 TB)',
      scalabilityScore: 45,
      costPerGb: '$0.08 - $0.12 / GB-month (gp3)',
      costScore: 50,
      providers: 'Amazon EBS (Elastic Block Store), Google Persistent Disk, Azure Managed Disks',
      typicalUseCases: 'High-throughput transactional relational databases (PostgreSQL, MySQL, Oracle), virtual machine OS root volumes.',
      pros: [
        'Sub-millisecond read/write latency',
        'Direct raw byte-level random file access and modification',
        'Guaranteed IOPS (Provisioned IOPS up to 256,000)',
      ],
      cons: [
        'Cannot be concurrently shared across multiple VMs (typically single-instance attached)',
        'Highest cost per Gigabyte',
        'Must be formatted with an OS filesystem (ext4, NTFS, XFS)',
      ],
    },
    file: {
      id: 'file',
      name: 'File Storage (Hierarchical NAS)',
      icon: FolderTree,
      tagline: 'Shared hierarchical folder tree with standard POSIX directories, filenames, and permissions.',
      protocol: 'NFS (Network File System) v4, SMB/CIFS (Server Message Block)',
      latencyRating: 'Moderate (3 - 10 ms)',
      latencyScore: 75,
      scalabilityRating: 'Elastic auto-growing filesystem (Petabyte scale)',
      scalabilityScore: 78,
      costPerGb: '$0.30 / GB-month (Standard) or $0.03 / GB (Infrequent)',
      costScore: 35,
      providers: 'Amazon EFS (Elastic File System), Azure Files, Google Cloud Filestore',
      typicalUseCases: 'Shared content repositories (WordPress media, Magento), developer home directories, machine learning training clusters.',
      pros: [
        'Simultaneous read/write mount across hundreds of virtual machines',
        'Standard POSIX file operations (`mkdir`, `chmod`, `ls`)',
        'Automatic storage elasticity without pre-provisioning',
      ],
      cons: [
        'Higher latency than local block storage',
        'Most expensive storage type for frequent access',
        'Locks and metadata latency under extreme concurrent writes',
      ],
    },
    object: {
      id: 'object',
      name: 'Object Storage (Flat REST)',
      icon: HardDrive,
      tagline: 'Flat global namespace storing discrete immutable objects with custom metadata tags via HTTP/S REST APIs.',
      protocol: 'HTTP/HTTPS REST (GET, PUT, DELETE, HEAD) with JSON/XML payloads',
      latencyRating: 'High initial-byte latency (50 - 100 ms)',
      latencyScore: 30,
      scalabilityRating: 'Virtually Infinite (Exabytes with 99.999999999% durability)',
      scalabilityScore: 100,
      costPerGb: '$0.023 / GB-month (Standard) down to $0.00099 / GB (Glacier)',
      costScore: 95,
      providers: 'Amazon S3, Google Cloud Storage, Azure Blob Storage, Cloudflare R2',
      typicalUseCases: 'Video streaming media, static website hosting, big data analytical lakes, machine learning training sets, backups.',
      pros: [
        'Massive horizontal scale without storage ceilings',
        '11 Nines of data durability with automatic multi-AZ redundancy',
        'Lowest cost tiering (Archive down to $0.001/GB)',
        'Direct web browser delivery via signed URLs',
      ],
      cons: [
        'Cannot modify partial file bytes (must rewrite entire object)',
        'Higher latency for single file read/write operations',
        'Not mountable as a standard operating system boot drive',
      ],
    },
  };

  const current = storages[selectedStorage];

  const handleSelect = (id: 'block' | 'file' | 'object') => {
    setSelectedStorage(id);
    markLabComplete('lab-storage-explorer');
  };

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <HardDrive className="w-4 h-4" />
          <span>Interactive Lab G</span>
        </div>
        <h3 className="text-xl font-bold text-white">Cloud Storage Explorer &amp; Benchmarks</h3>
        <p className="text-xs text-slate-400 mt-1">
          Compare Block, File, and Object storage architectures across latency, throughput, cost economics, and access protocols.
        </p>
      </div>

      {/* Storage Category Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(Object.keys(storages) as Array<'block' | 'file' | 'object'>).map((key) => {
          const item = storages[key];
          const Icon = item.icon;
          const isSelected = selectedStorage === key;
          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`p-4 rounded-xl border text-left transition ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-glow-cyan'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center space-x-2.5 mb-1.5">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm">{item.name}</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1">{item.protocol.split(',')[0]}</p>
            </button>
          );
        })}
      </div>

      {/* Deep Benchmark Comparison Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Core Profile (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white">{current.name} Deep Profile</h4>
            <p className="text-slate-300 leading-relaxed">{current.tagline}</p>

            <div className="pt-2 border-t border-slate-850 space-y-2">
              <div>
                <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Access Protocol:</span>
                <p className="text-cyan-300 font-mono mt-0.5">{current.protocol}</p>
              </div>

              <div>
                <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Cloud Implementations:</span>
                <p className="text-slate-200 mt-0.5">{current.providers}</p>
              </div>

              <div>
                <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Primary Production Workload:</span>
                <p className="text-slate-200 mt-0.5">{current.typicalUseCases}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-200 space-y-2">
              <div className="font-semibold text-emerald-400 flex items-center space-x-1.5">
                <Check className="w-4 h-4" />
                <span>Architectural Strengths</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {current.pros.map((p, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-emerald-400">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 text-rose-200 space-y-2">
              <div className="font-semibold text-rose-400 flex items-center space-x-1.5">
                <X className="w-4 h-4" />
                <span>Limits &amp; Trade-offs</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {current.cons.map((c, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-rose-400">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Radar Performance Benchmark Gauges (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3.5 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-300 text-[11px]">
              Comparative Performance Profile
            </h4>

            {/* Read/Write Latency */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Random I/O Latency Speed:</span>
                <span className="text-cyan-400 font-mono font-semibold">{current.latencyRating}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${current.latencyScore}%` }}
                />
              </div>
            </div>

            {/* Scalability Capacity */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Horizontal Scalability Ceiling:</span>
                <span className="text-sky-400 font-mono font-semibold">{current.scalabilityScore}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${current.scalabilityScore}%` }}
                />
              </div>
            </div>

            {/* Cost Efficiency */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Cost Economics per GB:</span>
                <span className="text-emerald-400 font-mono font-semibold">{current.costPerGb}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${current.costScore}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-white">Rule of Thumb: </span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              If your code needs to seek to a specific byte address (databases, OS filesystems), choose <strong className="text-cyan-300">Block Storage</strong>.
              If multiple servers must edit files concurrently in a folder, choose <strong className="text-cyan-300">File Storage</strong>.
              If you store media, backups, or web assets, always choose <strong className="text-cyan-300">Object Storage</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
