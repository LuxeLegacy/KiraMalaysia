import { useState } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
      >
        {children || <Info className="w-4 h-4" />}
      </button>

      {isVisible && (
        <div className="absolute z-50 w-64 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-6 transform -translate-y-full">
          <div className="relative">
            {content}
            <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-4"></div>
          </div>
        </div>
      )}
    </div>
  );
}
