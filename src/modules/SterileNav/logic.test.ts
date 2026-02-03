// Mock HandLandmarkerResult for testing
// In a real TDD scenario, we would use vitest/jest

import { detectScrollGesture } from './logic';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';

function testDetectScrollGesture() {
  console.log('Running tests for detectScrollGesture...');

  // Mock result for UP gesture (index finger high)
  const mockUpResult: HandLandmarkerResult = {
    landmarks: [[
      { x: 0.5, y: 0.8, z: 0 }, // Wrist (0)
      { x: 0.5, y: 0.7, z: 0 },
      { x: 0.5, y: 0.6, z: 0 },
      { x: 0.5, y: 0.5, z: 0 },
      { x: 0.5, y: 0.4, z: 0 },
      { x: 0.5, y: 0.3, z: 0 },
      { x: 0.5, y: 0.2, z: 0 },
      { x: 0.5, y: 0.1, z: 0 },
      { x: 0.5, y: 0.0, z: 0 }, // Index Tip (8)
    ] as any],
    worldLandmarks: [],
    handedness: []
  };

  const upResult = detectScrollGesture(mockUpResult);
  console.log('UP Gesture Test:', upResult === 'SCROLL_UP' ? 'PASSED' : 'FAILED');

  // Mock result for DOWN gesture (fist/index tip low)
  const mockDownResult: HandLandmarkerResult = {
    landmarks: [[
      { x: 0.5, y: 0.5, z: 0 }, // Wrist (0)
      { x: 0.5, y: 0.6, z: 0 },
      { x: 0.5, y: 0.7, z: 0 },
      { x: 0.5, y: 0.8, z: 0 },
      { x: 0.5, y: 0.9, z: 0 },
      { x: 0.5, y: 1.0, z: 0 },
      { x: 0.5, y: 1.1, z: 0 },
      { x: 0.5, y: 1.2, z: 0 },
      { x: 0.5, y: 1.3, z: 0 }, // Index Tip (8)
    ] as any],
    worldLandmarks: [],
    handedness: []
  };

  const downResult = detectScrollGesture(mockDownResult);
  console.log('DOWN Gesture Test:', downResult === 'SCROLL_DOWN' ? 'PASSED' : 'FAILED');
}

// testDetectScrollGesture();
