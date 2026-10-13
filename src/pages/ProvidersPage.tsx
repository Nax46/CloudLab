import React, { useEffect, useState } from 'react';
import { ExternalLink, Layers, GraduationCap } from 'lucide-react';
import { getProviders } from '../services/providersService';
import { CloudProvider } from '../types/database';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CardSkeleton } from '../components/common/LoadingSkeleton';

export const ProvidersPage: React.FC = () => {
  const [providers, setProviders] = useState<CloudProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getProviders()
      .then((data) => {
        if (mounted) setProviders(data);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-16 text-slate-900">
      <Breadcrumbs items={[{ label: 'Cloud Providers Comparison' }]} />

      <div className="border-b border-slate-200 pb-4">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-1">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Industry Ecosystem Mapping</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cloud Providers Comparison: AWS vs Azure vs GCP
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Architectural breakdown and equivalent service mapping across the major cloud service providers for BCA FCC students.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 shadow-xs hover:border-blue-400 hover:shadow-md transition"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-bold text-slate-900">{provider.name}</h2>
                  <a
                    href={provider.official_website}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-blue-600 transition"
                    title="Visit official portal"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {provider.description}
                </p>

                {/* Service Categories */}
                <div className="space-y-4 pt-2 border-t border-slate-150">
                  {(provider.service_categories || []).map((cat, idx) => (
                    <div key={idx} className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                        {cat.category} Services
                      </span>
                      <div className="space-y-2">
                        {cat.services.map((srv, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                          >
                            <div className="font-bold text-slate-900">{srv.name}</div>
                            <div className="text-[11px] text-slate-600">{srv.description}</div>
                            <div className="text-[10px] text-blue-700 font-medium italic pt-0.5">
                              Use Case: {srv.use_case}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-150 text-[11px] text-slate-500">
                Official documentation available at{' '}
                <a
                  href={provider.official_website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {provider.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cross-Provider Concept Matrix Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-slate-900">Cross-Provider Service Mapping Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Capability / Layer</th>
                <th className="py-3 px-4 text-blue-700 font-bold">Amazon Web Services (AWS)</th>
                <th className="py-3 px-4 text-sky-700 font-bold">Microsoft Azure</th>
                <th className="py-3 px-4 text-indigo-700 font-bold">Google Cloud (GCP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Virtual Machines (IaaS)</td>
                <td className="py-3 px-4 font-mono">Amazon EC2</td>
                <td className="py-3 px-4 font-mono">Azure Virtual Machines</td>
                <td className="py-3 px-4 font-mono">Google Compute Engine (GCE)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Serverless FaaS</td>
                <td className="py-3 px-4 font-mono">AWS Lambda</td>
                <td className="py-3 px-4 font-mono">Azure Functions</td>
                <td className="py-3 px-4 font-mono">Google Cloud Functions</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Managed Kubernetes (CaaS)</td>
                <td className="py-3 px-4 font-mono">Amazon EKS</td>
                <td className="py-3 px-4 font-mono">Azure Kubernetes Service (AKS)</td>
                <td className="py-3 px-4 font-mono">Google Kubernetes Engine (GKE)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Object Storage</td>
                <td className="py-3 px-4 font-mono">Amazon S3</td>
                <td className="py-3 px-4 font-mono">Azure Blob Storage</td>
                <td className="py-3 px-4 font-mono">Google Cloud Storage (GCS)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Block Storage</td>
                <td className="py-3 px-4 font-mono">Amazon EBS</td>
                <td className="py-3 px-4 font-mono">Azure Managed Disks</td>
                <td className="py-3 px-4 font-mono">GCP Persistent Disk</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Global NoSQL Database</td>
                <td className="py-3 px-4 font-mono">Amazon DynamoDB</td>
                <td className="py-3 px-4 font-mono">Azure Cosmos DB</td>
                <td className="py-3 px-4 font-mono">Cloud Bigtable / Firestore</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">Content Delivery Network</td>
                <td className="py-3 px-4 font-mono">Amazon CloudFront</td>
                <td className="py-3 px-4 font-mono">Azure Front Door / CDN</td>
                <td className="py-3 px-4 font-mono">Google Cloud CDN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
