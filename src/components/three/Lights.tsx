import { useRef } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Environment, useHelper } from "@react-three/drei";
import { useControls } from "leva";

export const Lights = () => {
  const pointLight = useRef<THREE.PointLight>(null);
  useHelper(
    pointLight.current && pointLight.current,
    THREE.PointLightHelper,
    "red"
  );

  const { position } = useControls("Lights", {
    position: {
      value: [-80, -160, 0],
      min: -1080,
      max: 1080,
    },
  });

  useFrame(() => {
    pointLight.current?.position?.set(...position);
  });

  return (
    <>
      <Environment preset="warehouse" />
      <pointLight
        position={[-80, -160, 0]}
        intensity={10000}
        scale={[-80, -160, 0]}
      />
      <pointLight
        ref={pointLight}
        position={[120, 180, 0]}
        intensity={5000}
        scale={[-80, 200, 40]}
      />
    </>
  );
};
