import React, { useState, useEffect } from 'react';
import { VisionCamera } from '../../components/VisionCamera';
import { useSterileNav } from './useSterileNav';

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
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative">
        <VisionCamera onHandResults={processHandLandmarks} />
        
        {/* Visual Feedback Overlay */}
        {feedbackVisible && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border-2 border-blue-400">
            <span className="text-2xl">
              {lastGesture === 'SCROLL_UP' ? '⤒' : '⤓'}
            </span>
            <span className="font-bold">
              {lastGesture === 'SCROLL_UP' ? 'Scrolling Up' : 'Scrolling Down'}
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700 w-full max-w-md">
        <h3 className="text-lg font-medium text-blue-400 mb-2">Sterile Navigation Mode</h3>
        <p className="text-sm text-gray-300">
          Use hand gestures to navigate without touching the screen.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-900 p-2 rounded border border-gray-600">
            <p className="text-gray-500 uppercase font-bold">Scroll Up</p>
            <p>Point index finger up</p>
          </div>
          <div className="bg-gray-900 p-2 rounded border border-gray-600">
            <p className="text-gray-500 uppercase font-bold">Scroll Down</p>
            <p>Close hand/fist</p>
          </div>
        </div>
      </div>
    </div>
  );
};
