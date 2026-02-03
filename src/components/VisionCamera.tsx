import React, { useRef, useEffect, useState } from 'react';
import { useVision } from './VisionProvider';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';

interface VisionCameraProps {
  onHandResults?: (result: HandLandmarkerResult) => void;
  onFaceResults?: (result: FaceLandmarkerResult) => void;
}

export const VisionCamera: React.FC<VisionCameraProps> = ({ onHandResults, onFaceResults }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { handLandmarker, faceLandmarker, isLoading } = useVision();
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsCameraActive(true);
          };
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    const predict = () => {
      if (
        videoRef.current &&
        videoRef.current.readyState >= 2 &&
        isCameraActive
      ) {
        const startTimeMs = performance.now();
        
        if (handLandmarker) {
          const results = handLandmarker.detectForVideo(videoRef.current, startTimeMs);
          if (onHandResults) {
            onHandResults(results);
          }
        }

        if (faceLandmarker) {
          const results = faceLandmarker.detectForVideo(videoRef.current, startTimeMs);
          if (onFaceResults) {
            onFaceResults(results);
          }
        }
      }
      animationFrameId = requestAnimationFrame(predict);
    };

    startCamera();
    predict();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [handLandmarker, isCameraActive, onHandResults]);

  if (isLoading) return <div>Loading Vision Models...</div>;

  return (
    <div className="relative w-full h-full bg-clinical-dark rounded-xl overflow-hidden border border-clinical-border group-hover:border-medical-blue-500/30 transition-all duration-300">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
        muted
        playsInline
      />
      {!isCameraActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-clinical-black/80">
          <p className="text-[10px] text-medical-blue-400 font-black uppercase tracking-widest animate-pulse">Initializing_Feed...</p>
        </div>
      )}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${isCameraActive ? 'bg-medical-blue-500 animate-pulse' : 'bg-gray-600'}`} />
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-tighter">Cam_Input_01</span>
      </div>
    </div>
  );
};
