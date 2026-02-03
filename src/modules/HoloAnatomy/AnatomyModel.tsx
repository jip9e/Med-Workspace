import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useVision } from '../../components/VisionProvider';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

// Smoothing factors
const LERP_SPEED = 0.1;
const DEAD_ZONE_ROTATION = 0.05;

export const AnatomyModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { handResults, voiceCommand } = useVision();
  const { scene } = useGLTF('/models/anatomy.glb');

  // Use Refs for smoothed values to maintain state across frames without re-renders
  const targetRotation = useRef({ x: 0, y: 0 });
  const targetPositionZ = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;

    if (voiceCommand === 'ROTATE_LEFT') {
      groupRef.current.rotation.y -= 0.05;
    } else if (voiceCommand === 'ROTATE_RIGHT') {
      groupRef.current.rotation.y += 0.05;
    }

    if (handResults && handResults.landmarks && handResults.landmarks.length > 0) {
      // Use the first hand detected
      const landmarks = handResults.landmarks[0];
      
      const wrist = landmarks[0];
      const indexTip = landmarks[8];
      
      if (wrist && indexTip) {
        const dx = indexTip.x - wrist.x;
        const dy = indexTip.y - wrist.y;
        
        // Apply Dead Zone to raw movements
        const effectiveDx = Math.abs(dx) > DEAD_ZONE_ROTATION ? dx : 0;
        const effectiveDy = Math.abs(dy) > DEAD_ZONE_ROTATION ? dy : 0;

        // Set targets
        targetRotation.current.y = effectiveDx * Math.PI * 2;
        targetRotation.current.x = effectiveDy * Math.PI * 2;
        targetPositionZ.current = (1 - wrist.z) * 2 - 1;

        // Smoothly interpolate towards targets
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetRotation.current.y,
          LERP_SPEED
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          targetRotation.current.x,
          LERP_SPEED
        );
        
        groupRef.current.position.z = THREE.MathUtils.lerp(
          groupRef.current.position.z,
          targetPositionZ.current,
          LERP_SPEED
        );
      }
    } else {
      // Idle rotation if no hand detected
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </group>
  );
};

useGLTF.preload('/models/anatomy.glb');
