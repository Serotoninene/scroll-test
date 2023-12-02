import { useMemo, useRef } from "react";
import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useFrame } from "@react-three/fiber";

const PARTICLES: number = 500000;

export default function Particles() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const particlesPosition = new Float32Array(PARTICLES * 3);
    const radius = 500;
    for (let i = 0; i < PARTICLES; i++) {
      const distance = Math.sqrt(Math.random()) * radius;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      particlesPosition.set([x, y, z], i * 3);
    }
    return particlesPosition;
  }, [PARTICLES]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value = elapsedTime;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach={"attributes-position"}
          count={PARTICLES}
          array={particlesPosition}
          itemSize={3}
          normalized={false}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </points>
  );
}
