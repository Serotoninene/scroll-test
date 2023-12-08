import { useWindowSize } from "../../hooks/useWindowSize";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Perf } from "r3f-perf";

type Props = {
  children: React.ReactNode;
};

const CustomCamera = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const { height, width } = useWindowSize();
  const [correctFov, setCorrectFov] = useState(0);

  // useHelper(cameraRef, CameraHelper, "cyan");

  useEffect(() => {
    if (!height || !width) return;

    setCorrectFov(((Math.atan(height / 2 / 600) * 180) / Math.PI) * 2);
  }, [height, width]);

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
