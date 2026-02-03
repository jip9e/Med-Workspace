import React, { createContext, useContext, ReactNode, useEffect, useRef, useState } from 'react';
import { useVisionOrchestrator, VisionState } from '../hooks/useVisionOrchestrator';
import { useVoiceCommands } from '../hooks/useVoiceCommands';
import { BurnoutMonitor, BurnoutStatus } from '../modules/BurnoutMonitor/Monitor';

interface ExtendedVisionState extends VisionState {
  voiceCommand: string | null;
  isListening: boolean;
}

const VisionContext = createContext<ExtendedVisionState | undefined>(undefined);

export const useVision = () => {
  const context = useContext(VisionContext);
  if (context === undefined) {
    throw new Error('useVision must be used within a VisionProvider');
  }
  return context;
};

export const VisionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const visionState = useVisionOrchestrator();
  const { isListening, lastCommand } = useVoiceCommands();

  const value: ExtendedVisionState = {
    ...visionState,
    voiceCommand: lastCommand,
    isListening
  };

  return (
    <VisionContext.Provider value={value}>
      {children}
      <VoiceStatusIndicator />
      <BurnoutMonitorOverlay />
    </VisionContext.Provider>
  );
};

const VoiceStatusIndicator: React.FC = () => {
  const { isListening, voiceCommand } = useVision();
  if (!isListening) return null;

  return (
    <div className="fixed top-24 right-4 flex flex-col items-end gap-2 z-[60]">
      <div className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-500/50 shadow-lg">
        <span className="flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Listening</span>
      </div>
      {voiceCommand && (
        <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg animate-bounce">
          {voiceCommand.replace('_', ' ')}
        </div>
      )}
    </div>
  );
};

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
