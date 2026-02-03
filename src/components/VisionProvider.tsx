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

export const useVision = () => {
  const context = useContext(VisionContext);
  if (context === undefined) {
    throw new Error('useVision must be used within a VisionProvider');
  }
  return context;
};
