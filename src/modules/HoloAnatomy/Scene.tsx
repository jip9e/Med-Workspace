import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { AnatomyModel } from './AnatomyModel';

export const HoloAnatomyScene: React.FC = () => {
  return (
    <div className="w-full h-full bg-clinical-black overflow-hidden relative">
      <div className="absolute top-6 left-6 z-10 text-white bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-medical-blue-400">HoloAnatomy_Render</h2>
        <p className="text-[10px] font-mono opacity-50 uppercase mt-1">Status: Operational</p>
      </div>
      
      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
        <color attach="background" args={['#000000']} />
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
