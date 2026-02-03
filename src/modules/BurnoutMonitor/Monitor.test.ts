import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BurnoutMonitor } from './Monitor';
import { FaceLandmarkerResult } from '@mediapipe/tasks-vision';

describe('BurnoutMonitor', () => {
  let monitor: BurnoutMonitor;

  beforeEach(() => {
    monitor = new BurnoutMonitor();
    vi.useFakeTimers();
  });

  it('should detect blinking from blendshapes', () => {
    const blinkingResult: FaceLandmarkerResult = {
      faceLandmarks: [],
      faceBlendshapes: [
        {
          categories: [
            { categoryName: 'eyeBlinkLeft', score: 0.9, index: 9, displayName: '' },
            { categoryName: 'eyeBlinkRight', score: 0.9, index: 10, displayName: '' }
          ]
        }
      ],
      facialTransformationMatrixes: []
    };

    const status = monitor.analyze(blinkingResult);
    expect(status.isBlinking).toBe(true);
  });

  it('should calculate posture score from landmarks', () => {
    const normalResult: FaceLandmarkerResult = {
      faceLandmarks: [[
        { x: 0.5, y: 0.5, z: 0 }, // Landmark 0
        { x: 0.5, y: 0.5, z: 0 }, // Nose tip (Index 1)
      ]],
      faceBlendshapes: [],
      facialTransformationMatrixes: []
    };

    const status = monitor.analyze(normalResult);
    expect(status.postureScore).toBe(1.0);

    const poorPostureResult: FaceLandmarkerResult = {
      faceLandmarks: [[
        { x: 0.5, y: 0.5, z: 0 },
        { x: 0.2, y: 0.2, z: 0 }, // Leaning away
      ]],
      faceBlendshapes: [],
      facialTransformationMatrixes: []
    };

    const poorStatus = monitor.analyze(poorPostureResult);
    expect(poorStatus.postureScore).toBeLessThan(0.7);
    expect(poorStatus.needsAlert).toBe(true);
  });

  it('should trigger alert for low blink rate', () => {
    // Initial state
    const normalResult: FaceLandmarkerResult = {
      faceLandmarks: [[{ x: 0.5, y: 0.5, z: 0 }, { x: 0.5, y: 0.5, z: 0 }]],
      faceBlendshapes: [{ categories: [{ categoryName: 'eyeBlinkLeft', score: 0.1, index: 9, displayName: '' }] }],
      facialTransformationMatrixes: []
    };

    // Fast forward 1 minute with no blinks
    vi.advanceTimersByTime(60000);
    
    const status = monitor.analyze(normalResult);
    expect(status.blinkRate).toBe(0);
    expect(status.needsAlert).toBe(true);
    expect(status.alertReason).toBe('low_blink');
  });
});
