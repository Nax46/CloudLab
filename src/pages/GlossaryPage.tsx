import React, { useEffect, useState } from 'react';
import { Search, GraduationCap } from 'lucide-react';
import { getGlossary } from '../services/glossaryService';
import { GlossaryTerm } from '../types/database';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const GlossaryPage: React.FC = () => {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getGlossary(searchQuery)
      .then((data) => {
        if (mounted) setTerms(data);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [searchQuery]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredTerms = terms.filter((term) => {
    if (selectedLetter === 'ALL') return true;
    return term.term.toUpperCase().startsWith(selectedLetter);
  });

  return (
    <div className="space-y-8 animate-fade-in pb-16 text-slate-900">
      <Breadcrumbs items={[{ label: 'Cloud Terms Glossary' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Reference &amp; Viva Voce Terms</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cloud Computing A-Z Glossary
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Authoritative definitions of fundamental cloud concepts, protocols, standards, and architecture terms for BCA students.
          </p>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-blue-600 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cloud definitions..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Alphabet Filter Bar */}
      <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <button
          onClick={() => setSelectedLetter('ALL')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
            selectedLetter === 'ALL'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          ALL
        </button>
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center ${
              selectedLetter === letter
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Glossary Terms Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-xs text-slate-500">Loading definitions...</div>
      ) : filteredTerms.length === 0 ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          No glossary definitions match "{searchQuery || selectedLetter}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-mono tracking-tight">
                  {item.term}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
