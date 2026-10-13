import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'An error occurred',
  message,
  onRetry,
}) => {
  return (
    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start space-x-3 my-4">
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-semibold text-red-900">{title}</h4>
        <p className="text-xs text-red-800 leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-white hover:bg-red-100 border border-red-300 text-xs font-semibold text-red-800 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};
