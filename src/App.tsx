import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const array = new Array(2).fill(0);
const sliderArray = ["blue", "green", "salmon", "lightblue", "lightgreen"];

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
    if (!ref.current) return;

    const refWidth = ref.current.getBoundingClientRect().width;
    console.log(refWidth);

    gsap.to(ref.current, {
      xPercent: -100 * (sliderArray.length - 1),
      scrollTrigger: {
        trigger: ref.current,
        scrub: 1,
        start: "top top",
        end: "bottom top",
        pin: true,
        snap: 1 / (sliderArray.length - 1),
        onUpdate: (e) => {
          console.log("SCROLL : ", e.progress);
        },
      },
    });
  }, [ref.current, sliderRef.current]);

  return (
    <section ref={ref} className="flex flex-nowrap h-[500vw]">
      {sliderArray.map((color, idx) => (
        <div
          //  okay i can't get this to work, the snap is off
          //  for the first panels probably because of the pin or something
          className="panel"
          style={{ backgroundColor: color }}
          key={idx}
        ></div>
      ))}
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
