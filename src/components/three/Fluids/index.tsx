import { useRef, useMemo } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import TouchTexture from "../TouchTexture";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useControls } from "leva";

export const Fluids = () => {
  const shaderRef = useRef<any>(null);

  const fluidControls = useControls("Fluids", {
    size: {
      value: 128,
      min: 32,
      max: 512,
      step: 1,
    },
    maxAge: {
      value: 120,
      min: 10,
      max: 1000,
      step: 1,
    },
    radius: {
      value: 0.2,
      min: 0.01,
      max: 3.0,
      step: 0.01,
    },
  });

  const touchTexture = useMemo<any>(
    () =>
      new TouchTexture(
        true,
        fluidControls.size,
        fluidControls.maxAge,
        fluidControls.radius
      ),
    [fluidControls]
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTouchTexture: { value: touchTexture },
      uMouse: { value: { x: 0.0, y: 0.0 } },
      uRadius: { value: 0.07 },
      uIntensity: { value: 0.02 },
      uIntro: { value: 0 },
    }),
    []
  );

  const handleMouseMove = (e: THREE.Vector2) => {
    touchTexture.addTouch(e);
  };

  useFrame((props, delta) => {
    const { mouse } = props;
    const mappedMouse = new THREE.Vector2(
      THREE.MathUtils.mapLinear(mouse.x, -1, 1, 0, 1),
      THREE.MathUtils.mapLinear(mouse.y, -1, 1, 0, 1)
    );

    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value += delta;
    shaderRef.current.uniforms.uMouse.value = { x: mouse.x, y: mouse.y };

    handleMouseMove(mappedMouse);
    touchTexture.update();
  });

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
