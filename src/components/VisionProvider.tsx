import React, { createContext, useContext, ReactNode } from 'react';
import { useVisionOrchestrator, VisionState } from '../hooks/useVisionOrchestrator';

const VisionContext = createContext<VisionState | undefined>(undefined);

export const VisionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const visionState = useVisionOrchestrator();

  return (
    <VisionContext.Provider value={visionState}>
      {children}
    </VisionContext.Provider>
  );
};

import { useEffect, useRef, useState } from 'react';
import { BurnoutMonitor, BurnoutStatus } from '../modules/BurnoutMonitor/Monitor';
import { useVision } from './VisionProvider';

export const BurnoutMonitorOverlay: React.FC = () => {
  const { faceResults } = useVision();
  const monitorRef = useRef<BurnoutMonitor>(new BurnoutMonitor());
  const [status, setStatus] = useState<BurnoutStatus | null>(null);

  useEffect(() => {
    if (faceResults) {
      const newStatus = monitorRef.current.analyze(faceResults);
      setStatus(newStatus);
    }
  }, [faceResults]);

  if (!status || !status.needsAlert) return null;

  let message = "Take a break!";
  if (status.alertReason === 'low_blink') message = "Remember to blink more often.";
  else if (status.alertReason === 'poor_posture') message = "Check your posture.";
  else if (status.alertReason === 'both') message = "Blink more and sit up straight.";

  return (
    <div className="fixed bottom-4 left-4 p-4 bg-orange-600/90 text-white rounded-lg shadow-xl z-50 animate-pulse border-2 border-orange-400">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="font-bold">Health Alert</p>
          <p className="text-sm opacity-90">{message}</p>
        </div>
      </div>
    </div>
  );
};

