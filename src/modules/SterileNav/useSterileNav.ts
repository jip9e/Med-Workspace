import { useState, useCallback, useEffect } from 'react';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { detectScrollGesture, GestureCommand } from './logic';
import { useVision } from '../../components/VisionProvider';

export const useSterileNav = () => {
  const { voiceCommand } = useVision();
  const [lastGesture, setLastGesture] = useState<GestureCommand>('NONE');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (voiceCommand === 'SCROLL_UP') {
      setLastGesture('SCROLL_UP');
      setIsScrolling(true);
      window.scrollBy({ top: -200, behavior: 'smooth' });
      setTimeout(() => setIsScrolling(false), 500);
    } else if (voiceCommand === 'SCROLL_DOWN') {
      setLastGesture('SCROLL_DOWN');
      setIsScrolling(true);
      window.scrollBy({ top: 200, behavior: 'smooth' });
      setTimeout(() => setIsScrolling(false), 500);
    }
  }, [voiceCommand]);

  const processHandLandmarks = useCallback((result: HandLandmarkerResult) => {
    const gesture = detectScrollGesture(result);
    
    if (gesture !== 'NONE') {
      setLastGesture(gesture);
      setIsScrolling(true);
      
      const scrollAmount = gesture === 'SCROLL_UP' ? -30 : 30;
      window.scrollBy({ top: scrollAmount, behavior: 'auto' });
    } else {
      setIsScrolling(false);
    }
  }, []);

  return {
    processHandLandmarks,
    lastGesture,
    isScrolling
  };
};
