import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Zap,
  Flame,
  HelpCircle,
} from 'lucide-react';

interface ExamQuestion {
  question: string;
  marks: number;
  answer: string;
}

interface TopicEngagementHubProps {
  unitNumber: number;
  topicTitle: string;
  keyPoints: string[];
}

export const TopicEngagementHub: React.FC<TopicEngagementHubProps> = ({
  unitNumber,
  topicTitle,
  keyPoints,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [hasClaimedXp, setHasClaimedXp] = useState(false);
  const [xp, setXp] = useState(150);

  const examQuestionsByUnit: Record<number, ExamQuestion[]> = {
    1: [
      {
        question: 'Explain the 5 Essential Characteristics of Cloud Computing as defined by NIST.',
        marks: 5,
        answer:
          '1. On-Demand Self-Service: Users provision compute resources automatically without human interaction with service providers.\n2. Broad Network Access: Capabilities accessible over standard network protocols using heterogeneous client devices (laptops, phones, thin clients).\n3. Resource Pooling: Provider resources pooled to serve multiple consumers using multi-tenant models with dynamic resource assignment.\n4. Rapid Elasticity: Capabilities scaled out and in elastically according to demand spikes.\n5. Measured Service: Resource usage automatically metered and reported for transparent billing.',
      },
      {
        question: 'Differentiate between IaaS, PaaS, and SaaS with suitable real-world examples.',
        marks: 5,
        answer:
          '• IaaS (Infrastructure as a Service): Provides virtual servers, storage, and networking (e.g., AWS EC2, Google Compute Engine). Customer manages OS, runtime, and applications.\n• PaaS (Platform as a Service): Provides runtime environment and development framework (e.g., AWS Elastic Beanstalk, Heroku). Customer manages code and application data only.\n• SaaS (Software as a Service): Fully managed application hosted by provider (e.g., Google Workspace, Microsoft 365). Customer manages user access and configuration.',
      },
    ],
    2: [
      {
        question: 'Compare Type 1 (Bare-Metal) vs Type 2 (Hosted) Hypervisors with architectural differences.',
        marks: 5,
        answer:
          '• Type 1 (Bare-Metal): Installs directly on physical server hardware without a host OS. Delivers near-zero virtualization overhead, higher throughput, and enterprise reliability (Examples: VMware ESXi, KVM, Microsoft Hyper-V).\n• Type 2 (Hosted): Runs as an application atop an existing host OS (Windows/Linux). Has host OS scheduling overhead and lower I/O throughput, but is easier to set up for desktop/laboratory work (Examples: Oracle VirtualBox, VMware Workstation).',
      },
      {
        question: 'Explain Virtual Machine Live Migration and its significance in cloud data centers.',
        marks: 5,
        answer:
          'Live Migration transfers an active running VM from one physical host to another with zero perceived downtime and no dropped network connections. Pre-copy iterative memory syncing transfers RAM pages while the VM executes, enabling zero-downtime server hardware maintenance and automated dynamic load balancing.',
      },
    ],
    3: [
      {
        question: 'What is Multi-Tenancy in cloud computing? How does it differ from Multi-Instance?',
        marks: 5,
        answer:
          'In Multi-Tenancy, a single shared software execution instance and database serves multiple customer organizations (tenants), strictly partitioned via tenant-ID authorization filters. In Multi-Instance, each customer runs an independent, physically isolated software instance.',
      },
      {
        question: 'Contrast Monolithic vs Microservices architecture in cloud-native applications.',
        marks: 5,
        answer:
          'Monoliths package the entire system in a single codebase with tight coupling, making independent scaling and continuous deployment difficult. Microservices decompose functionality into independently deployable, loosely coupled services communicating via lightweight REST/gRPC APIs, allowing independent autoscaling and localized fault tolerance.',
      },
    ],
    4: [
      {
        question: 'Explain the CIA Triad in cloud computing and how cloud providers safeguard each pillar.',
        marks: 5,
        answer:
          '• Confidentiality: Ensuring unauthorized entities cannot access data (enforced via AES-256 encryption at rest, TLS 1.3 in transit, and least-privilege IAM roles).\n• Integrity: Preventing unauthorized tampering or corruption (enforced via cryptographic hashes, digital signatures, and audit trails).\n• Availability: Ensuring authorized users have reliable access (enforced via multi-zone redundancy, health checks, and automatic failover).',
      },
      {
        question: 'Differentiate between RTO (Recovery Time Objective) and RPO (Recovery Point Objective).',
        marks: 5,
        answer:
          '• RTO is the maximum acceptable duration of system downtime after a disaster before service is fully restored.\n• RPO is the maximum acceptable age of transactions/data that can be lost (measured in time, e.g., max 15 minutes of data loss).',
      },
    ],
    5: [
      {
        question: 'Compare Block, File, and Object Storage on latency, scalability, and typical use cases.',
        marks: 5,
        answer:
          '• Block Storage: Low latency, high IOPS, mounts as raw volumes (e.g., AWS EBS). Best for transactional databases (MySQL, PostgreSQL) and OS boot drives.\n• File Storage: Hierarchical directory tree, supports multi-server shared mounting via NFS/SMB (e.g., AWS EFS). Best for content repositories and shared home folders.\n• Object Storage: Flat namespace with metadata & unique ID, highly scalable via HTTP REST (e.g., AWS S3). Best for media files, big data lakes, and static backups.',
      },
    ],
    6: [
      {
        question: 'What is Serverless (FaaS) Computing? List its advantages and cold-start challenges.',
        marks: 5,
        answer:
          'Serverless allows developers to execute code in response to events without provisioning or managing virtual machines (e.g., AWS Lambda). Billing is strictly per-millisecond of execution time, with automatic scaling down to zero. Cold-start latency occurs when an event arrives at an idle container that must be initialized from scratch.',
      },
    ],
  };

  const questions = examQuestionsByUnit[unitNumber] || examQuestionsByUnit[1];

  const handleClaimXp = () => {
    if (hasClaimedXp) return;
    setHasClaimedXp(true);
    setXp((prev) => prev + 50);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#3b82f6', '#059669', '#0284c7'],
    });
  };

  const handleCopyNotes = () => {
    const text = `CloudLab Revision Notes - ${topicTitle}\n\n` + keyPoints.map((k) => `• ${k}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 my-8">
      {/* Student Study & Gamification Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span>BCA Semester V University Exam Preparation</span>
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                FCC Syllabus
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              Curated university exam questions, model answers, and quick revision notes
            </p>
          </div>
        </div>

        {/* Study Points & Action Button */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-bold">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>{xp} Study Points</span>
          </div>

          <button
            onClick={handleClaimXp}
            disabled={hasClaimedXp}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              hasClaimedXp
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 cursor-default'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{hasClaimedXp ? 'Completed! (+50 Points)' : 'Mark Topic Learned (+50 Points)'}</span>
          </button>
        </div>
      </div>

      {/* University Exam Practice Questions Section */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-150 pb-3">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>Frequent University Examination Questions</span>
          </div>

          <button
            onClick={handleCopyNotes}
            className="flex items-center space-x-1.5 text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg border border-slate-200 transition"
            title="Copy Revision Notes"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Quick Notes'}</span>
          </button>
        </div>

        {/* Collapsible Accordion of Exam Questions */}
        <div className="space-y-3">
          {questions.map((q, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-blue-200">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">
                      {q.question}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {q.marks} Marks
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 pt-1 border-t border-slate-200 bg-white text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line animate-fade-in">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                      <span className="font-bold text-blue-700 block mb-1">
                        Model Answer / Key Points:
                      </span>
                      {q.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
