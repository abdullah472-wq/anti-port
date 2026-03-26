"use client";

import { RoundedBox, Float } from "@react-three/drei";

const PhoneMockup = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group rotation={[0, -0.5, 0]}>
        {/* Phone Body */}
        <RoundedBox
          args={[2, 4, 0.2]}
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
        </RoundedBox>

        {/* Screen */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[1.8, 3.8]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={0.5}
            roughness={0}
          />
        </mesh>

        {/* Home Button/Indicator */}
        <mesh position={[0, -1.8, 0.12]}>
          <boxGeometry args={[0.5, 0.05, 0.01]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>

        {/* Camera */}
        <mesh position={[0, 1.8, 0.12]}>
          <circleGeometry args={[0.05, 32]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>
    </Float>
  );
};

export default PhoneMockup;
