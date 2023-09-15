// lenis context

import Lenis from "@studio-freight/lenis";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const LenisContext = createContext({
  lenis: null,
});

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenis = useRef<Lenis>();

  const value = useMemo(
    () => ({
      lenis,
    }),
    [lenis]
  );

  useEffect(() => {
    lenis.current = new Lenis({
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, [lenis.current]);

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
};

// export const useLoadingContext = () => {
//   const context = useContext(LoadingContext);
//   if (context === undefined) {
//     throw new Error("useLoadingContext must be used within a LoadingProvider");
//   }
//   return context;
// };
