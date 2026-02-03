import { FaceLandmarkerResult } from '@mediapipe/tasks-vision';

export interface BurnoutStatus {
  blinkRate: number;
  postureScore: number;
  isBlinking: boolean;
  needsAlert: boolean;
  alertReason?: 'low_blink' | 'poor_posture' | 'both';
}

export class BurnoutMonitor {
  private lastBlinkTime: number = 0;
  private blinkCount: number = 0;
  private startTime: number = Date.now();
  private leftEyeOpen: boolean = true;
  private rightEyeOpen: boolean = true;

  // Constants for EAR (Eye Aspect Ratio)
  // These are simplified for use with FaceLandmarker blendshapes if available,
  // or we can use the raw landmarks.
  // Actually, FaceLandmarkerResult provides faceBlendshapes.

  public analyze(result: FaceLandmarkerResult): BurnoutStatus {
    const isBlinking = this.checkBlinking(result);
    const postureScore = this.calculatePosture(result);
    const blinkRate = this.calculateBlinkRate();

    const needsAlert = blinkRate < 5 || postureScore < 0.7;
    let alertReason: BurnoutStatus['alertReason'];

    if (blinkRate < 5 && postureScore < 0.7) alertReason = 'both';
    else if (blinkRate < 5) alertReason = 'low_blink';
    else if (postureScore < 0.7) alertReason = 'poor_posture';

    return {
      blinkRate,
      postureScore,
      isBlinking,
      needsAlert,
      alertReason
    };
  }

  private checkBlinking(result: FaceLandmarkerResult): boolean {
    if (!result.faceBlendshapes || result.faceBlendshapes.length === 0) return false;

    // eyeBlinkLeft and eyeBlinkRight are usually indices 9 and 10
    const blendshapes = result.faceBlendshapes[0].categories;
    const leftBlink = blendshapes.find(c => c.categoryName === 'eyeBlinkLeft')?.score || 0;
    const rightBlink = blendshapes.find(c => c.categoryName === 'eyeBlinkRight')?.score || 0;

    const currentlyBlinking = leftBlink > 0.5 || rightBlink > 0.5;

    if (currentlyBlinking && (!this.leftEyeOpen || !this.rightEyeOpen)) {
        // Still blinking
    } else if (currentlyBlinking && this.leftEyeOpen && this.rightEyeOpen) {
        // New blink detected
        this.blinkCount++;
        this.lastBlinkTime = Date.now();
        this.leftEyeOpen = false;
        this.rightEyeOpen = false;
    } else if (!currentlyBlinking) {
        this.leftEyeOpen = true;
        this.rightEyeOpen = true;
    }

    return currentlyBlinking;
  }

  private calculateBlinkRate(): number {
    const elapsedMinutes = (Date.now() - this.startTime) / 60000;
    if (elapsedMinutes < 0.1) return 12; // Default normal rate for first 6 seconds
    return this.blinkCount / elapsedMinutes;
  }

  private calculatePosture(result: FaceLandmarkerResult): number {
    if (!result.faceLandmarks || result.faceLandmarks.length === 0) return 1.0;

    const landmarks = result.faceLandmarks[0];
    // Simple posture check: Is the head centered and at a reasonable height?
    // Nose tip is index 1
    const nose = landmarks[1];

    // Ideally nose.x is around 0.5 and nose.y is around 0.5
    const xDist = Math.abs(nose.x - 0.5);
    const yDist = Math.abs(nose.y - 0.5);

    // Score from 0 to 1
    const score = Math.max(0, 1 - (xDist + yDist));
    return score;
  }
}
