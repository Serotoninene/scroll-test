import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useWindowSize } from "../../hooks";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const SKATE_SRC = "./assets/exportSk.gltf";

export const Skate = () => {
  // set up
  const skateRef = useRef();
  const { width } = useWindowSize();
  const skateScale = width ? width * 0.1 : 0;
  const model = useGLTF(SKATE_SRC);

  const controls = useControls("Position and Rotation", {
    rotation: {
      value: [-1.5, 0.35, -0.55],
      min: -180,
      max: 180,
      step: 0.01,
    },
    position: {
      value: [4, 0, 0],
      min: -180,
      max: 180,
    },
  });

  useEffect(() => {}, []);
  // // controls
  // const controls = useControls("Position and Rotation", {
  //   rotation,
  // });

  useFrame(() => {
    skateRef.current?.rotation?.set(...controls.rotation);
    skateRef.current?.position?.set(...controls.position);
  });

  return (
    <primitive
      ref={skateRef}
      object={model.scene}
      scale={[skateScale, skateScale, skateScale]}
    />
  );
};
