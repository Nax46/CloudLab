import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Lock, Key, Server, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface SecurityScenario {
  id: string;
  title: string;
  pillar: 'Availability' | 'Confidentiality' | 'Integrity';
  incident: string;
  threatActor: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const SecurityLab: React.FC = () => {
  const { markLabComplete } = useData();

  const scenarios: SecurityScenario[] = [
    {
      id: 'ddos',
      title: 'Scenario 1: Volumetric DDoS Attack on Web Ingress',
      pillar: 'Availability',
      threatActor: 'External Botnet',
      incident: 'Your public web application is being flooded with 150 Gbps of SYN flood and UDP amplification traffic. The single virtual machine web server has exhausted its network bandwidth and is completely inaccessible to legitimate students.',
      options: [
        {
          text: 'Scale vertically by upgrading the single VM to a 64-core instance.',
          isCorrect: false,
          explanation: 'Vertical scaling cannot absorb a 150 Gbps volumetric network flood; the physical NIC and data center gateway will still saturate immediately.',
        },
        {
          text: 'Deploy an Edge CDN (AWS CloudFront / Cloudflare) and AWS Shield with managed DDoS scrubbing.',
          isCorrect: true,
          explanation: 'Correct! Anycast edge networks absorb volumetric attacks at globally distributed Points of Presence (PoPs), filtering illegitimate UDP/SYN packets before they ever reach origin compute servers.',
        },
        {
          text: 'Encrypt the database with AES-256.',
          isCorrect: false,
          explanation: 'AES-256 protects data confidentiality at rest, but does nothing to defend against network bandwidth exhaustion targeting Availability.',
        },
      ],
    },
    {
      id: 'iam',
      title: 'Scenario 2: Privilege Creep & Root Account Compromise',
      pillar: 'Confidentiality',
      threatActor: 'Insider / Phished Developer',
      incident: 'A junior intern committed AWS root account credentials into a public GitHub repository. Within 12 minutes, automated scrapers spun up 80 high-performance GPU mining instances, costing $14,000.',
      options: [
        {
          text: 'Delete the GitHub repository and keep using the root account.',
          isCorrect: false,
          explanation: 'Public git commit history is cached by scrapers within seconds. Deleting the repo leaves active credentials fully compromised.',
        },
        {
          text: 'Lock root account with hardware MFA; issue IAM roles with Principle of Least Privilege and temporary STS tokens.',
          isCorrect: true,
          explanation: 'Correct! Root accounts must never have active programmatic access keys. Developers should assume scoped IAM roles with temporary credentials that expire automatically.',
        },
        {
          text: 'Place the virtual machines behind a private subnet without NAT.',
          isCorrect: false,
          explanation: 'Subnet routing does not restrict compromised cloud API management keys from spinning up resources in other regions.',
        },
      ],
    },
    {
      id: 'encryption',
      title: 'Scenario 3: Unencrypted S3 Database Dumps Exposed',
      pillar: 'Confidentiality',
      threatActor: 'Malicious Public Scanner',
      incident: 'A night-shift engineer dumped unencrypted customer PII databases into an Amazon S3 bucket with default public READ permissions. Shodan indexing engines detected the bucket.',
      options: [
        {
          text: 'Enable S3 Block Public Access, enforce default KMS SSE-KMS encryption, and audit via AWS Config.',
          isCorrect: true,
          explanation: 'Correct! Enabling organization-wide S3 Block Public Access prevents accidental exposure, while envelope encryption with KMS ensures data cannot be read without specific decryption key permissions.',
        },
        {
          text: 'Compress the database into a password-protected ZIP file.',
          isCorrect: false,
          explanation: 'ZIP passwords are weak, easily brute-forced, and fail to provide auditable key rotation, IAM integration, or compliance with GDPR/HIPAA.',
        },
        {
          text: 'Increase VM RAM to 128 GB.',
          isCorrect: false,
          explanation: 'Host server memory has zero effect on bucket storage permissions.',
        },
      ],
    },
    {
      id: 'integrity',
      title: 'Scenario 4: Man-in-the-Middle on Microservice Communications',
      pillar: 'Integrity',
      threatActor: 'Compromised Internal Pod',
      incident: 'Microservice A communicates with Microservice B across an internal VPC using plaintext HTTP. A compromised sidecar proxy is intercepting API payloads and modifying bank transfer recipient accounts.',
      options: [
        {
          text: 'Enforce Mutual TLS (mTLS) with cryptographic certificate rotation via a Service Mesh (Istio / Linkerd).',
          isCorrect: true,
          explanation: 'Correct! Mutual TLS (mTLS) cryptographically authenticates both client and server microservices, encrypting the channel and verifying message integrity with cryptographic hash digests.',
        },
        {
          text: 'Rely on standard IP whitelisting inside the security group.',
          isCorrect: false,
          explanation: 'IP whitelisting only controls node routing; it does not encrypt data in flight or protect against packet inspection/tampering on shared network hops.',
        },
      ],
    },
  ];

  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const scenario = scenarios[activeScenarioIndex];

  const handleSelectScenario = (idx: number) => {
    setActiveScenarioIndex(idx);
    setSelectedOption(null);
  };

  const handleChoose = (idx: number) => {
    setSelectedOption(idx);
    markLabComplete('lab-cloud-security');
  };

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Interactive Lab F</span>
        </div>
        <h3 className="text-xl font-bold text-white">Cloud Security, CIA Triad &amp; Threat Response Lab</h3>
        <p className="text-xs text-slate-400 mt-1">
          Evaluate real-world cloud threat vectors and select the proper defensive countermeasures under the CIA Triad framework.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {scenarios.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => handleSelectScenario(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeScenarioIndex === idx
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {sc.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Scenario Briefing */}
      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-white">{scenario.title}</h4>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-950/60 text-rose-300 border border-rose-800">
              Pillar: {scenario.pillar}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
              Threat: {scenario.threatActor}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <span className="font-semibold text-amber-300">Incident Telemetry: </span>
          {scenario.incident}
        </p>
      </div>

      {/* Countermeasure Decisions */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Select Your Architectural Countermeasure:
        </div>

        <div className="space-y-2.5">
          {scenario.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let btnStyle = 'border-slate-800 bg-slate-950 hover:bg-slate-850 text-slate-200';

            if (selectedOption !== null) {
              if (opt.isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-medium';
              } else if (isSelected) {
                btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
              } else {
                btnStyle = 'border-slate-850 bg-slate-950/40 text-slate-400 opacity-60';
              }
            }

            return (
              <div key={idx} className="space-y-2">
                <button
                  onClick={() => handleChoose(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {selectedOption !== null && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {selectedOption !== null && isSelected && !opt.isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>

                {selectedOption !== null && (isSelected || opt.isCorrect) && (
                  <div
                    className={`p-3 rounded-lg text-xs leading-relaxed border ${
                      opt.isCorrect
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                        : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
                    }`}
                  >
                    <span className="font-semibold">{opt.isCorrect ? '✓ Why this succeeds: ' : '✗ Why this fails: '}</span>
                    {opt.explanation}
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
