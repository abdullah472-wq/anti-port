"use client";

import { Float, RoundedBox } from "@react-three/drei";

const Avatar3D = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={[0, -1, 0]}>
        {/* Head */}
        <mesh position={[0, 2.8, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.3} />
        </mesh>

        {/* Body */}
        <RoundedBox
          args={[0.8, 1.2, 0.4]}
          radius={0.1}
          smoothness={4}
          position={[0, 1.9, 0]}
        >
          <meshStandardMaterial color="#6366f1" roughness={0.4} />
        </RoundedBox>

        {/* Laptop */}
        <group position={[0, 1.5, 0.6]} rotation={[-0.2, 0, 0]}>
          {/* Base */}
          <RoundedBox args={[1.2, 0.1, 0.8]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.1} />
          </RoundedBox>
          {/* Screen */}
          <group position={[0, 0.4, -0.4]} rotation={[-1.2, 0, 0]}>
             <RoundedBox args={[1.2, 0.8, 0.05]} radius={0.05} smoothness={4}>
                <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.1} />
             </RoundedBox>
             <mesh position={[0, 0, 0.03]}>
                <planeGeometry args={[1.1, 0.7]} />
                <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
             </mesh>
          </group>
        </group>

        {/* Desk (Simple plane) */}
        <mesh position={[0, 1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

export default Avatar3D;
