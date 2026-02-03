import { useState, useCallback, useEffect } from 'react';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { detectScrollGesture, GestureCommand } from './logic';

export const useSterileNav = () => {
  const [lastGesture, setLastGesture] = useState<GestureCommand>('NONE');
  const [isScrolling, setIsScrolling] = useState(false);

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
