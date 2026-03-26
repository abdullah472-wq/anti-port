"use client";

import { Sphere, MeshDistortMaterial, Float, Text } from "@react-three/drei";
import { useMemo } from "react";

const SkillBubble = ({ position, color, label, speed, distort }: { position: [number, number, number], color: string, label: string, speed: number, distort: number }) => {
  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={1.5}>
      <group position={position}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            speed={speed}
            distort={distort}
            radius={1}
            emissive={color}
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
        <Text
          position={[0, 0, 1.1]}
          fontSize={0.2}
          color="white"
          font="/fonts/inter-bold.woff" // Optional, fallback to default
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

const SkillBubbles = () => {
  const skills = useMemo(() => [
    { position: [-2.5, 0, 0] as [number, number, number], color: "#6366f1", label: "Frontend", speed: 2, distort: 0.4 },
    { position: [0, 2, -1] as [number, number, number], color: "#8b5cf6", label: "Mobile", speed: 1.5, distort: 0.5 },
    { position: [2.5, 0, 1] as [number, number, number], color: "#06b6d4", label: "Backend", speed: 2.5, distort: 0.3 },
  ], []);

  return (
    <group>
      {skills.map((skill, i) => (
        <SkillBubble key={i} {...skill} />
      ))}
    </group>
  );
};

export default SkillBubbles;
