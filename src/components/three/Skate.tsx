import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useWindowSize } from "../../hooks";
import { useFrame } from "@react-three/fiber";

const SKATE_SRC = "./assets/exportSk.gltf";

export const Skate = () => {
  const skateRef = useRef();
  const { width } = useWindowSize();
  const skateScale = width ? width * 0.1 : 0;
  const model = useGLTF(SKATE_SRC);

  useFrame(() => {
    console.log(skateRef.current.position);
  });

  return (
    <primitive
      ref={skateRef}
      object={model.scene}
      scale={[skateScale, skateScale, skateScale]}
    />
  );
};
