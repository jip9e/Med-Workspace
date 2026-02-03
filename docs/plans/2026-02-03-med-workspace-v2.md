# Med-Workspace V2 Plan

## Task 1: Anatomy Model Upgrade
- [x] Integrate a high-fidelity human skeleton/anatomy GLB model (BrainStem.glb).
- [x] Update 'src/modules/HoloAnatomy/AnatomyModel.tsx' to use 'useGLTF' from '@react-three/drei' for loading.
- [x] Ensure rotation/position syncing logic is updated for the new model.
- [x] Follow TDD/frequent commit rules.

## Task 2: Advanced Interaction
- [x] Implement a smoothing/interpolation filter (Lerp) for hand landmarks.
- [x] Refine gesture detection (e.g., improved Palm Down for scroll down).
- [x] Add a 'dead zone' to gestures to prevent accidental movements.
- [ ] Implement gesture-based scaling (pinch to zoom).
- [ ] Add anatomical labels to the 3D model.
- [x] Follow TDD/frequent commit rules.
