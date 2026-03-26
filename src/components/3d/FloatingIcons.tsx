"use client";

import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useMemo } from "react";

const FloatingIcon = ({ position, color, speed, distort }: { position: [number, number, number], color: string, speed: number, distort: number }) => {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
      <Sphere position={position} args={[0.3, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const FloatingIcons = () => {
  const icons = useMemo(() => [
    { position: [2, 1, 0] as [number, number, number], color: "#6366f1", speed: 2, distort: 0.4 },
    { position: [-2, 2, -1] as [number, number, number], color: "#8b5cf6", speed: 1.5, distort: 0.5 },
    { position: [1.5, -2, 1] as [number, number, number], color: "#06b6d4", speed: 2.5, distort: 0.3 },
    { position: [-1.5, -1.5, 0] as [number, number, number], color: "#00ff88", speed: 1.8, distort: 0.6 },
    { position: [0, 3, -2] as [number, number, number], color: "#f43f5e", speed: 2.2, distort: 0.4 },
  ], []);

  return (
    <group>
      {icons.map((icon, i) => (
        <FloatingIcon key={i} {...icon} />
      ))}
    </group>
  );
};

export default FloatingIcons;
