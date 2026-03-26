"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const SceneContent = () => {
  const starsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    // Rotate stars slowly
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
      starsRef.current.rotation.x += 0.00005;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
      
      <Stars 
        ref={starsRef}
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      <Environment preset="city" />
    </>
  );
};

const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0f172a]">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
