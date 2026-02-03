import { useState, useCallback, useEffect, useRef } from 'react';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { detectScrollGesture, GestureCommand } from './logic';
import { useVision } from '../../components/VisionProvider';

// Smoothing factor (0.1 means 10% new value, 90% old value)
const SMOOTHING_FACTOR = 0.15;

export const useSterileNav = () => {
  const { voiceCommand } = useVision();
  const [lastGesture, setLastGesture] = useState<GestureCommand>('NONE');
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Ref to store smoothed landmarks for internal logic if needed
  // For now, we'll focus on smoothing the gesture trigger or providing smoothed data
  const smoothedYDiff = useRef<number>(0);

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
    if (!result.landmarks || result.landmarks.length === 0) {
      setIsScrolling(false);
      setLastGesture('NONE');
      return;
    }

    const landmarks = result.landmarks[0];
    const wrist = landmarks[0];
    const indexTip = landmarks[8];

    if (wrist && indexTip) {
      const currentYDiff = wrist.y - indexTip.y;
      
      // Apply Lerp for smoothing the raw diff value
      smoothedYDiff.current = smoothedYDiff.current + (currentYDiff - smoothedYDiff.current) * SMOOTHING_FACTOR;
      
      // Create a "smoothed" result for detection to reduce jitter
      const smoothedResult: HandLandmarkerResult = {
        ...result,
        landmarks: [[
          { ...wrist },
          ...new Array(7).fill({}),
          { ...indexTip, y: wrist.y - smoothedYDiff.current }
        ] as any]
      };

      const gesture = detectScrollGesture(smoothedResult);
      
      if (gesture !== 'NONE') {
        setLastGesture(gesture);
        setIsScrolling(true);
        
        // Use smoothed diff to influence scroll speed if desired, 
        // but for now stick to constant auto scroll for stability
        const scrollAmount = gesture === 'SCROLL_UP' ? -30 : 30;
        window.scrollBy({ top: scrollAmount, behavior: 'auto' });
      } else {
        setIsScrolling(false);
        setLastGesture('NONE');
      }
    }
  }, []);

  return {
    processHandLandmarks,
    lastGesture,
    isScrolling
  };
};
