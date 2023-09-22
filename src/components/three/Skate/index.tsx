import { useEffect, useRef } from "react";
import { useGLTF, useProgress } from "@react-three/drei";
import { useWindowSize } from "../../../hooks";
import { useFrame } from "@react-three/fiber";

import { Power3, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useControls } from "leva";
import { Object3D } from "three";

import { controls } from "./controls";

const SKATE_SRC = "./assets/exportSk.gltf";
gsap.registerPlugin(ScrollTrigger);

export const Skate = () => {
  const skateRef = useRef<Object3D>();
  const { width } = useWindowSize();
  const { active } = useProgress();
  const introTl = useRef<gsap.core.Timeline>();
  const skateScale = width ? width * 0.1 : 0;
  const model = useGLTF(SKATE_SRC);

  useEffect(() => {
    if (!skateRef.current) return;

    //  intro animation
    introTl.current = gsap.timeline({
      paused: true,
    });

    introTl.current.fromTo(
      skateRef.current.rotation,
      {
        x: 1.5,
        y: -0.35,
        z: 0.55,
      },
      {
        x: -1.5,
        y: 0.35,
        z: -0.55,
        duration: 2,
        ease: Power3.easeOut,
      }
    );

    introTl.current.to(
      skateRef.current.scale,
      {
        duration: 1,
        x: skateScale,
        y: skateScale,
        z: skateScale,
      },
      "<"
    );

    !active && introTl.current.play();
  }, [skateScale, active]);

  // useFrame(() => {
  //   skateRef.current?.rotation?.set(...skateControls.rotation);
  //   skateRef.current?.position?.set(...skateControls.position);
  // });

  return <primitive ref={skateRef} object={model.scene} />;
};
