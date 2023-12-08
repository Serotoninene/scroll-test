import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Perf } from "r3f-perf";

type Props = {
  children: React.ReactNode;
};

const CustomCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={45}
      position={[0, 0, 10]}
      near={1}
      far={2000}
    />
  );
};

export const CustomCanvas = ({ children }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas flat ref={canvasRef}>
      <Perf position="top-left" />
      <CustomCamera />
      {children}
    </Canvas>
  );
};
