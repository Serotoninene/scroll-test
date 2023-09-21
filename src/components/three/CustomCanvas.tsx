import { useWindowSize } from "../../hooks/useWindowSize";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";

type Props = {
  children: React.ReactNode;
};

export const CustomCanvas = ({ children }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { height, width } = useWindowSize();
  const [correctFov, setCorrectFov] = useState(0);

  useEffect(() => {
    if (!height || !width) return;

    setCorrectFov(((Math.atan(height / 2 / 600) * 180) / Math.PI) * 2);
  }, [height, width]);

  return (
    <Canvas flat ref={canvasRef}>
      <PerspectiveCamera
        makeDefault
        fov={correctFov}
        position={[0, 0, 600]}
        near={10}
        far={1000}
      />
      {children}
    </Canvas>
  );
};
