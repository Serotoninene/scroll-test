import { gsap, Power3 } from "gsap";
import { useEffect, useRef } from "react";
import { useWindowSize } from "../../../hooks";
import { Object3D } from "three";

type Props = {
  skateRef: React.RefObject<Object3D>;
};

export const useIntroAnim = ({ skateRef }: Props) => {
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!skateRef?.current) return;
    const skateSCALE = window?.innerWidth * 0.1;

    tl.current = gsap.timeline({
      // paused: true,
    });

    tl.current?.fromTo(
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
        duration: 1,
        ease: Power3.easeOut,
      }
    );

    tl.current?.to(
      skateRef.current.scale,
      {
        duration: 1,
        x: skateSCALE,
        y: skateSCALE,
        z: skateSCALE,
      },
      "<"
    );

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};

export const useScrollAnim = ({ skateRef }: Props) => {
  const tl = useRef<gsap.core.Timeline>();

  useEffect(() => {
    tl.current = gsap.timeline({
      paused: false,
    });

    return () => {
      tl.current?.kill();
    };
  }, []);

  return tl;
};
