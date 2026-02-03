import React, { useState, useEffect } from 'react';
import { VisionCamera } from '../../components/VisionCamera';
import { useSterileNav } from './useSterileNav';
import { MousePointer2, ChevronUp, ChevronDown, Hand, Sparkles } from 'lucide-react';

export const SterileNav: React.FC = () => {
  const { processHandLandmarks, lastGesture, isScrolling } = useSterileNav();
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  useEffect(() => {
    if (isScrolling) {
      setFeedbackVisible(true);
    } else {
      const timer = setTimeout(() => {
        setFeedbackVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isScrolling]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full group">
        <div className="hidden">
          <VisionCamera onHandResults={processHandLandmarks} />
        </div>
        
        {/* Visual Feedback Overlay - Repositioned as a floating badge */}
        {feedbackVisible && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-medical-blue-600/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-[0_0_30px_rgba(14,140,233,0.3)] flex items-center gap-3 border border-white/20 z-[60] animate-in fade-in zoom-in duration-200">
            <div className="bg-white/20 p-1 rounded-full">
              {lastGesture === 'SCROLL_UP' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
            <span className="font-bold tracking-tight">
              {lastGesture === 'SCROLL_UP' ? 'SCROLLING_UP' : 'SCROLLING_DOWN'}
            </span>
          </div>
        )}
      </div>
      
      <div className="clinical-card p-6 w-full group hover:border-medical-blue-500/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-medical-blue-500/10 rounded-lg group-hover:bg-medical-blue-500/20 transition-colors">
              <MousePointer2 className="w-4 h-4 text-medical-blue-400" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">Sterile Nav</h3>
          </div>
          <Sparkles className="w-4 h-4 text-medical-blue-500/40 group-hover:text-medical-blue-500 transition-colors" />
        </div>
        
        <p className="text-xs text-gray-500 leading-relaxed font-medical mb-6">
          Advanced touchless navigation protocol active. Precise hand tracking enables hands-free viewport control.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-1.5">
              <ChevronUp className="w-3 h-3 text-medical-blue-500" />
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Scroll Up</p>
            </div>
            <p className="text-[11px] text-gray-600 leading-tight">Extend index finger vertically</p>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-center gap-2 mb-1.5">
              <ChevronDown className="w-3 h-3 text-medical-blue-500" />
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Scroll Down</p>
            </div>
            <p className="text-[11px] text-gray-600 leading-tight">Clench hand into a secure fist</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hand className="w-3 h-3 text-gray-700" />
            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Tracking_Mode</span>
          </div>
          <span className="text-[9px] text-medical-blue-500 font-mono font-bold">LATENCY: 12ms</span>
        </div>
      </div>
    </div>
  );
};
