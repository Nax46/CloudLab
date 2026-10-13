import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, HelpCircle, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { searchContent, SearchResults } from '../../services/searchService';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useData();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({ units: [], topics: [], lessons: [], glossary: [] });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults({ units: [], topics: [], lessons: [], glossary: [] });
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await searchContent(query);
        setResults(res);
      } catch {
        // Ignore search errors
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(path);
  };

  const totalResults =
    results.units.length + results.topics.length + results.lessons.length + results.glossary.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search syllabus units, topics, lessons, or cloud terms (e.g., NIST, hypervisor, S3, CIA)..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] bg-white text-slate-500 border border-slate-200 rounded font-mono shadow-2xs">
            ESC
          </kbd>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="sm:hidden text-slate-400 hover:text-slate-700 p-1 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {isLoading && (
            <div className="py-8 text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span>Searching CloudLab syllabus database...</span>
            </div>
          )}

          {!isLoading && query.length >= 2 && totalResults === 0 && (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <div className="text-sm font-semibold text-slate-800">No syllabus matches found for "{query}"</div>
              <p className="text-xs">Try searching for keywords like "IaaS", "Docker", "S3", "Kubernetes", "IAM", or "NIST".</p>
            </div>
          )}

          {!isLoading && query.length < 2 && (
            <div className="py-4 text-xs text-slate-500 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Suggested Topics to Explore:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'NIST Characteristics',
                  'Type 1 vs Type 2 Hypervisors',
                  'Docker vs Virtual Machines',
                  'Elasticity vs Scalability',
                  'CIA Triad & DDoS',
                  'Block vs Object Storage',
                  'CAP Theorem & HDFS',
                  'Gartner 6 Rs Migration',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs border border-slate-200 transition font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Units Results */}
          {results.units.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Syllabus Units</span>
              </div>
              {results.units.map((u) => (
                <div
                  key={u.id}
                  onClick={() => handleSelect(`/units/${u.slug}`)}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50/60 border border-slate-200 cursor-pointer transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {u.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{u.shortDescription}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition ml-2 shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Topics Results */}
          {results.topics.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Syllabus Topics</span>
              </div>
              {results.topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleSelect(`/topics/${t.slug}`)}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50/60 border border-slate-200 cursor-pointer transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {t.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{t.shortDescription}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition ml-2 shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Glossary Results */}
          {results.glossary.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center space-x-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Cloud Glossary Terms</span>
              </div>
              {results.glossary.map((g) => (
                <div
                  key={g.id}
                  onClick={() => handleSelect('/glossary')}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50/60 border border-slate-200 cursor-pointer transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-blue-700 font-mono">{g.term}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{g.definition}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition ml-2 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
