import { HandLandmarkerResult } from '@mediapipe/tasks-vision';

export type GestureCommand = 'SCROLL_UP' | 'SCROLL_DOWN' | 'NONE';

/**
 * Recognizes gestures from hand landmarks.
 * 
 * Simple logic:
 * - If the index finger tip is significantly above the palm center, it might be an 'up' gesture.
 * - If it's significantly below, it might be 'down'.
 * 
 * However, for scrolling, it's often better to look at the vertical position of the hand.
 * We'll use the Y coordinate of the hand's centroid or a specific landmark.
 */
export function detectScrollGesture(result: HandLandmarkerResult): GestureCommand {
  if (!result.landmarks || result.landmarks.length === 0) {
    return 'NONE';
  }

  // Get the first detected hand
  const landmarks = result.landmarks[0];
  
  // Landmark 8 is Index Finger Tip
  // Landmark 0 is Wrist
  const indexFingerTip = landmarks[8];
  const wrist = landmarks[0];

  if (!indexFingerTip || !wrist) return 'NONE';

  // In MediaPipe, Y increases downwards (0 is top, 1 is bottom)
  const yDiff = wrist.y - indexFingerTip.y;

  // DEAD ZONE: Prevent small movements from triggering actions
  const DEAD_ZONE = 0.1;

  // If index finger is much higher than wrist, it's an UP gesture
  if (yDiff > DEAD_ZONE) {
    return 'SCROLL_UP';
  } 
  
  // Refined DOWN gesture: "Palm Down" or simply fingers pointing down
  // If wrist is significantly above the index tip (yDiff is negative)
  if (yDiff < -DEAD_ZONE) {
    return 'SCROLL_DOWN';
  }

  return 'NONE';
}
