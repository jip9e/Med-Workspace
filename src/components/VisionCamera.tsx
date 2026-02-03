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
    <div className="relative w-full max-w-md mx-auto aspect-video bg-black rounded-lg overflow-hidden border-2 border-blue-500 shadow-xl">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
      />
      {!isCameraActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <p className="text-white">Starting Camera...</p>
        </div>
      )}
    </div>
  );
};
