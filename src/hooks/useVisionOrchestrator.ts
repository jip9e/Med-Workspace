import { useEffect, useState, useRef } from 'react';
import {
  HandLandmarker,
  FaceLandmarker,
  FilesetResolver,
  HandLandmarkerResult,
  FaceLandmarkerResult
} from '@mediapipe/tasks-vision';

export interface VisionState {
  handLandmarker: HandLandmarker | null;
  faceLandmarker: FaceLandmarker | null;
  isLoading: boolean;
  error: string | null;
}

export const useVisionOrchestrator = () => {
  const [state, setState] = useState<VisionState>({
    handLandmarker: null,
    faceLandmarker: null,
    isLoading: true,
    error: null,
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initModels = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 2
        });

        const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          outputFaceBlendshapes: true
        });

        setState({
          handLandmarker,
          faceLandmarker,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        console.error("Failed to initialize Vision models:", err);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        }));
      }
    };

    initModels();
  }, []);

  return state;
};
