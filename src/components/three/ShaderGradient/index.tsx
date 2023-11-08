import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useWindowSize } from "../../../hooks";

import { useControls } from "leva";
import noiseTexture from "../../../../public/assets/Noise/grundge-noise.webp";

export const ShaderGradient = () => {
  const { width, height } = useWindowSize();

  const { uScale, uNoiseScale, uNoiseStrength } = useControls({
    uScale: { value: 1.5, min: 0, max: 10 },
    uNoiseScale: { value: 0.5, min: 0, max: 1, step: 0.01 },
    uNoiseStrength: { value: 1, min: 0, max: 1, step: 0.01 },
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScale: { value: uScale },
      uNoiseTexture: { value: new THREE.TextureLoader().load(noiseTexture) },
      uNoiseScale: { value: uNoiseScale },
      uNoiseStrength: { value: uNoiseStrength },
    }),
    []
  );

  const shaderRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (!shaderRef.current) return;
    console;
    shaderRef.current.uniforms.uTime.value = elapsedTime;
    shaderRef.current.uniforms.uScale.value = uScale;
    shaderRef.current.uniforms.uNoiseScale.value = uNoiseScale;
    shaderRef.current.uniforms.uNoiseStrength.value = uNoiseStrength;
  });

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
