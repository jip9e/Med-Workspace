import { useEffect, useRef, useState } from 'react';
import { BurnoutMonitor, BurnoutStatus } from '../modules/BurnoutMonitor/Monitor';
import { useVision } from './VisionProvider';
import { Activity, AlertTriangle, User } from 'lucide-react';

export const BurnoutStats: React.FC = () => {
  const { faceResults } = useVision();
  const monitorRef = useRef<BurnoutMonitor>(new BurnoutMonitor());
  const [status, setStatus] = useState<BurnoutStatus | null>(null);

  useEffect(() => {
    if (faceResults) {
      const newStatus = monitorRef.current.analyze(faceResults);
      setStatus(newStatus);
    }
  }, [faceResults]);

  const blinkCount = faceResults?.[0]?.keypoints ? Math.floor(Math.random() * 12) + 8 : 0; // Mocking some stats if face detected

  return (
    <div className="p-4 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-medical-blue-500" />
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Biometric Stats</h4>
        </div>
        {status?.needsAlert && (
          <AlertTriangle className="w-4 h-4 text-orange-500 animate-pulse" />
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold">Blink Rate</p>
            <p className="text-2xl font-light text-white">{blinkCount} <span className="text-xs text-gray-500">bpm</span></p>
          </div>
          <div className="w-16 h-8 bg-medical-blue-500/10 rounded flex items-end p-1 gap-0.5">
            {[4, 7, 5, 8, 6].map((h, i) => (
              <div key={i} className="flex-1 bg-medical-blue-500/40 rounded-t-sm" style={{ height: `${h*10}%` }} />
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-clinical-border">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold">Posture Score</span>
            <span className={`text-[10px] font-bold ${status?.alertReason?.includes('posture') ? 'text-orange-500' : 'text-green-500'}`}>
                {status?.alertReason?.includes('posture') ? 'POOR' : 'OPTIMAL'}
            </span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${status?.alertReason?.includes('posture') ? 'bg-orange-500' : 'bg-green-500'}`} 
              style={{ width: status?.alertReason?.includes('posture') ? '40%' : '92%' }} 
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 bg-clinical-black/40 p-2 rounded-lg border border-clinical-border">
         <div className="w-8 h-8 rounded-full bg-medical-blue-500/20 flex items-center justify-center">
            <User className="w-4 h-4 text-medical-blue-400" />
         </div>
         <div>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Current Observer</p>
            <p className="text-xs text-white font-medium">Dr. Sterling</p>
         </div>
      </div>
    </div>
  );
};
