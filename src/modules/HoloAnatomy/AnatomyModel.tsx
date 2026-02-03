import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useVision } from '../../components/VisionProvider';
import * as THREE from 'three';

export const AnatomyModel: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { handResults, voiceCommand } = useVision();

  useFrame(() => {
    if (!meshRef.current) return;

    if (voiceCommand === 'ROTATE_LEFT') {
      meshRef.current.rotation.y -= 0.05;
    } else if (voiceCommand === 'ROTATE_RIGHT') {
      meshRef.current.rotation.y += 0.05;
    }

    if (handResults && handResults.landmarks && handResults.landmarks.length > 0) {
      // Use the first hand detected
      const landmarks = handResults.landmarks[0];
      
      // Calculate rotation based on hand orientation (simplified)
      // We can use landmarks to get hand tilt/roll
      // For now, let's use the index finger tip (landmark 8) and wrist (landmark 0) 
      // to map some rotation
      const wrist = landmarks[0];
      const indexTip = landmarks[8];
      
      const dx = indexTip.x - wrist.x;
      const dy = indexTip.y - wrist.y;
      
      // Map hand movement to rotation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        dx * Math.PI * 2,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        dy * Math.PI * 2,
        0.1
      );
      
      // Map hand position (z is depth)
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        (1 - wrist.z) * 2 - 1,
        0.1
      );
    } else {
      // Idle rotation if no hand detected
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {/* Placeholder for "Anatomy Model" - A Torso-like shape */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <capsuleGeometry args={[0.5, 1, 4, 16]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} wireframe />
      </mesh>
      
      {/* Visual indicators for limbs (primitive) */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
    </group>
  );
};
