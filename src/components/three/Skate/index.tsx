import React, { useEffect, useRef } from "react";
import { useGLTF, useProgress } from "@react-three/drei";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Object3D } from "three";

import { useIntroAnim } from "./animations";
import { useWindowSize } from "../../../hooks";

const SKATE_SRC = "./assets/exportSk.gltf";
gsap.registerPlugin(ScrollTrigger);

export const Skate = () => {
  // set up
  const model = useGLTF(SKATE_SRC);
  const { active } = useProgress();
  const skateRef = useRef<Object3D>();
  const { width } = useWindowSize();

  const skateScale = width ? width * 0.1 : 0;

  // anims
  const introTl = useIntroAnim({
    skateRef: skateRef as React.RefObject<Object3D>,
  });

  // triggering the introTl only when the model is done loading
  useEffect(() => {
    if (!active) {
      introTl.current?.play();
    }
  }, [active, introTl.current]);

  return (
    <primitive
      ref={skateRef}
      object={model.scene}
      scale={[skateScale, skateScale, skateScale]}
    />
  );
};
