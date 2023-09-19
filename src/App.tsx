import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sliderArray = ["lightblue", "lightgreen", "lightpink"];

const Placeholder = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="h-[20vw] w-[20vw] bg-blue-300"></div>
    </section>
  );
};

const PinnedPlaceholder = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      xPercent: -100 * (sliderArray.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        scrub: 0.8,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        snap: 1 / (sliderArray.length - 1),
      },
    });
  }, [ref.current]);

  return (
    <section
      ref={ref}
      className="flex flex-nowrap opacity-80"
      style={{
        height: sliderArray.length * 100 + "vh",
      }}
    >
      {sliderArray.map((color, idx) => (
        <div
          className="panel"
          style={{ backgroundColor: color }}
          key={idx}
        ></div>
      ))}
    </section>
  );
};

const OneSidePinned = () => {
  const ref = useRef<HTMLDivElement>(null);
  const leftSide = useRef<HTMLDivElement>(null);
  const rightSide = useRef<any>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftSide.current,
      snap: 1 / (sliderArray.length - 1),
    });

    rightSide.current.forEach((panel: HTMLDivElement, idx: number) => {
      gsap.to(panel, {
        scrollTrigger: {
          trigger: panel,
          markers: true,
        },
      });
    });
  }, [leftSide.current, rightSide.current]);
  return (
    <div
      ref={ref}
      className="bg-blue-200 flex"
      style={{
        height: sliderArray.length * 100 + "vh",
      }}
    >
      <div
        ref={leftSide}
        className="bg-red-300 h-screen w-1/2 flex justify-center items-center"
      >
        STICKY PART
      </div>
      <div className="w-1/2">
        {sliderArray.map((color, idx) => (
          <div
            key={color}
            ref={(e) => (rightSide.current[idx] = e)}
            className="h-screen border border-red-400 w-full"
            style={{
              background: color,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-slate-100 h-auto overflow-hidden">
      <Placeholder />
      <OneSidePinned />
      <Placeholder />
      <PinnedPlaceholder />
      <Placeholder />
    </main>
  );
}

export default App;
