import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useVision } from '../../components/VisionProvider';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

export const AnatomyModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { handResults, voiceCommand } = useVision();
  const { scene } = useGLTF('/models/anatomy.glb');

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
      
      const dx = indexTip.x - wrist.x;
      const dy = indexTip.y - wrist.y;
      
      // Map hand movement to rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        dx * Math.PI * 2,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        dy * Math.PI * 2,
        0.1
      );
      
      // Map hand position (z is depth)
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        (1 - wrist.z) * 2 - 1,
        0.1
      );
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
