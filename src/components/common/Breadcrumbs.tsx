import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs text-slate-500 py-2.5 mb-4 overflow-x-auto whitespace-nowrap">
      <Link to="/" className="flex items-center hover:text-blue-600 font-medium transition">
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          {item.path ? (
            <Link to={item.path} className="hover:text-blue-600 font-medium transition truncate max-w-[200px]">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 font-semibold truncate max-w-[250px]">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
