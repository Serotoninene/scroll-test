import React, { useEffect, useRef } from "react";
import { Float, useGLTF, useProgress } from "@react-three/drei";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Object3D } from "three";

import { mergeTimelines, useIntroAnim, useScrollAnim } from "./animations";
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
  const scrollTl = useScrollAnim({
    skateRef: skateRef as React.RefObject<Object3D>,
  });

  // triggering the introTl only when the model is done loading
  useEffect(() => {
    if (!introTl.current || !scrollTl.current) return;
    const masterTl = mergeTimelines([introTl?.current, scrollTl?.current]);

    if (!active) {
      masterTl.play();
    }

    return () => {
      masterTl.kill();
    };
  }, [active]);

  return (
    <Float
      speed={10} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <primitive
        ref={skateRef}
        object={model.scene}
        scale={[skateScale, skateScale, skateScale]}
        rotation={[-1.5, 0.35, -0.55]}
      />
    </Float>
  );
};
