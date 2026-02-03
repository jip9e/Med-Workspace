import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { AnatomyModel } from './AnatomyModel';

export const HoloAnatomyScene: React.FC = () => {
  return (
    <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl relative">
      <div className="absolute top-4 left-4 z-10 text-white bg-black/50 p-2 rounded">
        <h2 className="text-lg font-bold">HoloAnatomy 3D View</h2>
        <p className="text-xs opacity-75">Tracking active</p>
      </div>
      
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} contactShadow={{ opacity: 0.7, blur: 2 }}>
            <AnatomyModel />
          </Stage>
        </Suspense>
        
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default HoloAnatomyScene;
