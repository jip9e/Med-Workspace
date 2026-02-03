# Med-Workspace Plan

## Task 1: Environment Setup
- [x] Create project structure
- [x] Configure Tailwind CSS

## Task 2: MediaPipe Integration
- [x] Install MediaPipe vision tasks (@mediapipe/tasks-vision)
- [x] Create 'src/hooks/useVisionOrchestrator.ts' to load HandLandmarker and FaceLandmarker models
- [x] Create 'src/components/VisionProvider.tsx' as a context provider for the vision state
- [x] Follow TDD/frequent commit rules

## Task 4: HoloAnatomy 3D View
- [x] Install Three.js and React Three Fiber
- [x] Create 'src/modules/HoloAnatomy/Scene.tsx'
- [x] Create 'src/modules/HoloAnatomy/AnatomyModel.tsx'
- [x] Link 3D model rotation to hand tracking data
- [x] Integrate HoloAnatomy into Main UI
- [x] Follow TDD/frequent commit rules

## Task 5: Burnout Monitor & Health Alerts
- [x] Create 'src/modules/BurnoutMonitor/Monitor.ts' for blink/posture tracking
- [x] Create 'src/components/AlertOverlay.tsx' (integrated into VisionProvider as BurnoutMonitorOverlay)
- [x] Implement logic for blink rate and posture alerts
- [x] Follow TDD/frequent commit rules
