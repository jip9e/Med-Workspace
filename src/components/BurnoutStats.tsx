import { useEffect, useRef, useState } from 'react';
import { BurnoutMonitor, BurnoutStatus } from '../modules/BurnoutMonitor/Monitor';
import { useVision } from './VisionProvider';
import { Activity, AlertTriangle, User } from 'lucide-react';

export const BurnoutStats: React.FC = () => {
  const { faceResults } = useVision();
  const monitorRef = useRef<BurnoutMonitor>(new BurnoutMonitor());
  const [status, setStatus] = useState<BurnoutStatus | null>(null);
  const [mockBlink, setMockBlink] = useState(12);

  useEffect(() => {
    if (faceResults) {
      const newStatus = monitorRef.current.analyze(faceResults);
      setStatus(newStatus);
      // Simulate slight variation in blink rate
      setMockBlink(prev => Math.max(8, Math.min(22, prev + (Math.random() > 0.5 ? 1 : -1))));
    }
  }, [faceResults]);

  return (
    <div className="p-5 h-full flex flex-col justify-between group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-medical-blue-400 group-hover:text-medical-blue-300 transition-colors" />
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-300 transition-colors">Biometric Stats</h4>
        </div>
        {status?.needsAlert && (
          <AlertTriangle className="w-4 h-4 text-orange-500 animate-pulse" />
        )}
      </div>

      <div className="space-y-5">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-tight mb-1 opacity-60">Blink Rate</p>
            <p className="text-3xl font-light text-white tracking-tighter tabular-nums">{mockBlink} <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">bpm</span></p>
          </div>
          <div className="w-20 h-10 bg-clinical-black/50 border border-white/5 rounded-lg flex items-end p-1.5 gap-1 group-hover:border-medical-blue-500/20 transition-all">
            {[4, 7, 5, 8, 6, 9, 4].map((h, i) => (
              <div key={i} className="flex-1 bg-medical-blue-500/30 rounded-t-[1px] group-hover:bg-medical-blue-500/50 transition-all duration-700" style={{ height: `${h*10}%`, transitionDelay: `${i*50}ms` }} />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] text-gray-500 uppercase font-black tracking-tight opacity-60">Posture Score</span>
            <span className={`text-[10px] font-black tracking-widest ${status?.alertReason?.includes('posture') ? 'text-orange-500' : 'text-medical-blue-400'}`}>
                {status?.alertReason?.includes('posture') ? 'POOR' : 'OPTIMAL'}
            </span>
          </div>
          <div className="w-full bg-clinical-black/80 h-1.5 rounded-full overflow-hidden border border-white/5">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${status?.alertReason?.includes('posture') ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 'bg-medical-blue-500 shadow-[0_0_10px_rgba(93,165,165,0.4)]'}`} 
              style={{ width: status?.alertReason?.includes('posture') ? '40%' : '92%' }} 
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 bg-clinical-black/60 p-3 rounded-xl border border-white/5 group-hover:border-medical-blue-500/20 transition-all">
         <div className="w-10 h-10 rounded-full bg-medical-blue-500/10 flex items-center justify-center border border-medical-blue-500/10 group-hover:bg-medical-blue-500/20 transition-all">
            <User className="w-5 h-5 text-medical-blue-400" />
         </div>
         <div>
            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest opacity-60">Observer</p>
            <p className="text-sm text-white font-bold tracking-tight">Dr. Sterling</p>
         </div>
      </div>
    </div>
  );
};
