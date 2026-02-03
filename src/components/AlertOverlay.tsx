import React from 'react';

import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

interface AlertOverlayProps {
  show: boolean;
  message: string;
  type?: 'warning' | 'error' | 'info';
}

export const AlertOverlay: React.FC<AlertOverlayProps> = ({ show, message, type = 'warning' }) => {
  if (!show) return null;

  const config = {
    warning: {
      bg: 'bg-amber-500/90',
      border: 'border-amber-400/50',
      icon: <AlertTriangle className="w-6 h-6" />,
      shadow: 'shadow-amber-900/40'
    },
    error: {
      bg: 'bg-rose-600/90',
      border: 'border-rose-400/50',
      icon: <AlertCircle className="w-6 h-6" />,
      shadow: 'shadow-rose-900/40'
    },
    info: {
      bg: 'bg-sky-500/90',
      border: 'border-sky-400/50',
      icon: <Info className="w-6 h-6" />,
      shadow: 'shadow-sky-900/40'
    }
  };

  const { bg, border, icon, shadow } = config[type];

  return (
    <div className={`fixed top-8 right-8 left-8 md:left-auto md:w-[400px] p-5 rounded-2xl border ${border} ${bg} backdrop-blur-xl shadow-2xl ${shadow} text-white transition-all duration-500 animate-in fade-in slide-in-from-top-4 z-[100] flex items-center gap-4`}>
      <div className="flex-shrink-0 bg-white/20 p-2.5 rounded-xl">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-0.5">{type}_Notification</p>
        <p className="font-bold leading-tight">{message}</p>
      </div>
    </div>
  );
};
