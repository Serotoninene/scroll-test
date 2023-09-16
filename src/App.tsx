import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const array = new Array(3).fill(0);
const sliderArray = ["blue", "green", "red"];

const Placeholder = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="h-[20vw] w-[20vw] bg-blue-300"></div>
    </section>
  );
};

const PinnedPlaceholder = () => {
  const ref = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (!ref.current || !sliderRef.current) return;

    // gsap.to(ref.current, {
    //   scrollTrigger: {
    //     trigger: ref.current,
    //     start: "top top",
    //     end: "bottom top",
    //     pin: true,
    //     pinSpacing: false,
    //     scrub: true,
    //   },
    // });

    gsap.to(sliderRef.current, {
      xPercent: -100 * (sliderArray.length - 1),
      scrollTrigger: {
        trigger: ref.current,
        start: "top top",
        markers: true,
        end: "bottom top",
        scrub: 0.9,
        pin: true,
        pinSpacing: false,
        snap: {
          // or "labels" or function or Array
          duration: 0.5,
          directional: true,
          ease: "power3",
          // other callbacks: onStart, onInterrupt
        },
      },
    });
  }, [ref.current, sliderRef.current]);

  return (
    <section ref={ref} className="h-[300vh]">
      <div ref={sliderRef} className="flex">
        {sliderArray.map((color, idx) => (
          <div
            className="h-screen w-screen flex-none border border-red-400"
            style={{ backgroundColor: color }}
            key={idx}
          ></div>
        ))}
      </div>
    </section>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-slate-100">
      {array.map((_, idx) => (
        <Placeholder key={idx} />
      ))}
      <PinnedPlaceholder />
      {array.map((_, idx) => (
        <Placeholder key={idx} />
      ))}
    </main>
  );
}

export default App;
