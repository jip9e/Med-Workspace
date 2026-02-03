import { describe, it, expect } from 'vitest';
import { detectScrollGesture } from './logic';
import { HandLandmarkerResult } from '@mediapipe/tasks-vision';

describe('detectScrollGesture', () => {
  it('detects SCROLL_UP when index tip is significantly above wrist', () => {
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

    expect(detectScrollGesture(mockUpResult)).toBe('SCROLL_UP');
  });

  it('detects SCROLL_DOWN when palm is down (Palm Down gesture)', () => {
    // Palm Down: Wrist Y < Middle Finger Tip Y (since Y increases downwards, this is inverse of normal hand)
    // Actually, "Palm Down" usually means the back of the hand is visible.
    // In MediaPipe, if the hand is horizontal and palm is facing camera, wrist and finger tips are at similar Y.
    // If "Palm Down" means pointing fingers down:
    const mockDownResult: HandLandmarkerResult = {
      landmarks: [[
        { x: 0.5, y: 0.2, z: 0 }, // Wrist (0)
        { x: 0.5, y: 0.3, z: 0 },
        { x: 0.5, y: 0.4, z: 0 },
        { x: 0.5, y: 0.5, z: 0 },
        { x: 0.5, y: 0.6, z: 0 },
        { x: 0.5, y: 0.7, z: 0 },
        { x: 0.5, y: 0.8, z: 0 },
        { x: 0.5, y: 0.9, z: 0 },
        { x: 0.5, y: 1.0, z: 0 }, // Index Tip (8)
      ] as any],
      worldLandmarks: [],
      handedness: []
    };

    expect(detectScrollGesture(mockDownResult)).toBe('SCROLL_DOWN');
  });

  it('returns NONE when movement is within the dead zone', () => {
    const mockDeadZoneResult: HandLandmarkerResult = {
      landmarks: [[
        { x: 0.5, y: 0.5, z: 0 }, // Wrist (0)
        {}, {}, {}, {}, {}, {}, {}, // landmarks 1-7
        { x: 0.5, y: 0.48, z: 0 }, // Index Tip (8) slightly above wrist
      ] as any],
      worldLandmarks: [],
      handedness: []
    };
    expect(detectScrollGesture(mockDeadZoneResult)).toBe('NONE');
  });

  it('detects SCROLL_DOWN when palm is down (Palm Down gesture - Wrist above fingers)', () => {
    // MediaPipe Y increases downwards. Palm Down = Wrist Y < Fingers Y
    const mockDownResult: HandLandmarkerResult = {
      landmarks: [[
        { x: 0.5, y: 0.2, z: 0 }, // Wrist (0)
        {}, {}, {}, {}, {}, {}, {},
        { x: 0.5, y: 0.5, z: 0 }, // Index Tip (8)
      ] as any],
      worldLandmarks: [],
      handedness: []
    };
    expect(detectScrollGesture(mockDownResult)).toBe('SCROLL_DOWN');
  });

  it('returns NONE when no hands are detected', () => {
    const mockEmptyResult: HandLandmarkerResult = {
      landmarks: [],
      worldLandmarks: [],
      handedness: []
    };
    expect(detectScrollGesture(mockEmptyResult)).toBe('NONE');
  });
});
