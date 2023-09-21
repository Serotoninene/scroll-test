import React from "react";
import { useGLTF } from "@react-three/drei";
import { useWindowSize } from "../../hooks";

const SKATE_SRC = "./assets/exportSk.gltf";

export const Skate = () => {
  const { width } = useWindowSize();
  const skateScale = width ? width * 0.1 : 0;
  const model = useGLTF(SKATE_SRC);
  console.log(model);

  return (
    <primitive
      object={model.scene}
      scale={[skateScale, skateScale, skateScale]}
    />
  );
};
