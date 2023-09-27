import { useRef, useMemo } from "react";

import { useFrame } from "@react-three/fiber";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

export const Fluids = () => {
  const shaderRef = useRef<any>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: { x: 0.0, y: 0.0 } },
      uRadius: { value: 0.07 },
      uIntensity: { value: 0.02 },
      uIntro: { value: 0 },
    }),
    []
  );

  useFrame((props, delta) => {
    const { mouse } = props;

    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value += delta;
    shaderRef.current.uniforms.uMouse.value = { x: mouse.x, y: mouse.y };
  });

  return (
    <mesh>
      <boxGeometry args={[500, 500, 1]} />
      {/* <meshBasicMaterial color="red" /> */}
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};
