import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-6 gap-6 h-[calc(100vh-14rem)] min-h-[900px] ipad-landscape:h-[calc(100vh-12rem)]">
      {children}
    </div>
  );
};

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const BentoItem: React.FC<BentoItemProps> = ({ 
  children, 
  className = '', 
  title, 
  subtitle 
}) => {
  return (
    <div className={`clinical-card flex flex-col overflow-hidden group/bento ${className}`}>
      {(title || subtitle) && (
        <div className="p-4 border-b border-clinical-border flex justify-between items-center bg-clinical-black/40 group-hover/bento:bg-clinical-black/60 transition-colors duration-300">
          <div>
            {title && <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] group-hover/bento:text-gray-400 transition-colors">{title}</h3>}
            {subtitle && <p className="text-xs text-medical-blue-400 font-bold tracking-tight">{subtitle}</p>}
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-medical-blue-500 animate-pulse shadow-[0_0_10px_rgba(93,165,165,0.8)]" />
        </div>
      )}
      <div className="flex-1 relative min-h-0">
        {children}
      </div>
    </div>
  );
};
