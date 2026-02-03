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
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full group">
        <div className="hidden">
          <VisionCamera onHandResults={processHandLandmarks} />
        </div>
        
        {/* Visual Feedback Overlay - Repositioned as a floating badge */}
        {feedbackVisible && (
          <div className="fixed bottom-24 right-8 bg-medical-blue-600/90 backdrop-blur-md text-white px-8 py-5 rounded-2xl shadow-[0_0_40px_rgba(14,140,233,0.4)] flex items-center gap-4 border border-white/20 z-[60] animate-in fade-in zoom-in duration-200">
            <div className="bg-white/20 p-2 rounded-xl">
              {lastGesture === 'SCROLL_UP' ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Gesture_Detected</span>
              <span className="font-bold tracking-tight text-lg">
                {lastGesture === 'SCROLL_UP' ? 'SCROLLING_UP' : 'SCROLLING_DOWN'}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-clinical-black/40 backdrop-blur-xl border border-clinical-border p-8 rounded-2xl w-full group hover:border-medical-blue-500/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-medical-blue-500/10 rounded-xl group-hover:bg-medical-blue-500/20 transition-colors">
              <MousePointer2 className="w-6 h-6 text-medical-blue-400" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/90">Sterile Nav</h3>
          </div>
          <Sparkles className="w-5 h-5 text-medical-blue-500/40 group-hover:text-medical-blue-500 transition-colors" />
        </div>
        
        <p className="text-sm text-gray-500 leading-relaxed font-medical mb-8">
          Advanced touchless navigation protocol active. Precise hand tracking enables hands-free viewport control.
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex items-center gap-4">
            <div className="bg-medical-blue-500/20 p-2.5 rounded-xl">
              <ChevronUp className="w-5 h-5 text-medical-blue-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Scroll Up</p>
              <p className="text-xs text-gray-500 leading-tight">Extend index finger vertically</p>
            </div>
          </div>
          <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex items-center gap-4">
            <div className="bg-medical-blue-500/20 p-2.5 rounded-xl">
              <ChevronDown className="w-5 h-5 text-medical-blue-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Scroll Down</p>
              <p className="text-xs text-gray-500 leading-tight">Clench hand into a secure fist</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hand className="w-4 h-4 text-gray-700" />
            <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Tracking_Mode</span>
          </div>
          <span className="text-[10px] text-medical-blue-500 font-mono font-black bg-medical-blue-500/10 px-3 py-1 rounded-full border border-medical-blue-500/20">LATENCY: 12ms</span>
        </div>
      </div>
    </div>
  );
};
