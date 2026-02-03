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

  // In MediaPipe, Y increases downwards (0 is top, 1 is bottom)
  const yDiff = wrist.y - indexFingerTip.y;

  // If index finger is much higher than wrist, let's say it's an UP gesture
  // If index finger is much lower than wrist (folded), let's say it's DOWN? 
  // Actually, let's use the absolute position in the frame for a simple "virtual scrollbar" logic
  // or use the delta if we have previous state.
  
  // For now, let's use a simple threshold based on relative position.
  if (yDiff > 0.2) {
    return 'SCROLL_UP';
  } else if (yDiff < -0.05) {
    // If the index tip is below the wrist, it's definitely down/closed
    return 'SCROLL_DOWN';
  }

  return 'NONE';
}
