import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

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
  const rightSide = useRef<(HTMLDivElement | null)[]>([]);

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

    rightSide.current.forEach((panel: HTMLDivElement | null) => {
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

const imgArray = new Array(9).fill(0);
const IMAGE_URL =
  "https://cdn.carredartistes.com/fr-fr/content_images/paul%20cezanne3.jpg";

const FlipPlaceholder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    gsap.registerPlugin(ScrollTrigger);

    // set the ending state just to capture the flip state
    containerRef.current?.classList.add("gallery_row");
    const flipState = Flip.getState([
      containerRef.current,
      ...imagesRef.current,
    ]);
    containerRef.current?.classList.remove("gallery_row");

    // Create the Flip animation timeline
    Flip.from(flipState, {
      absolute: false,
      scale: true,
      simple: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "bottom top",
        pin: true,
        scrub: true,
      },
      stagger: 0,
    });
  }, [containerRef.current, imagesRef.current]);

  return (
    <div ref={containerRef} className="gallery_container gallery_grid">
      {imgArray.map((_, idx) => (
        <div
          key={idx}
          ref={(e) => (imagesRef.current[idx] = e)}
          className="gallery_item overflow-hidden rounded flex-none "
        >
          <div
            className="gallery_item_inner"
            style={{
              backgroundImage: `url(${IMAGE_URL})`,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-slate-100 h-auto overflow-hidden">
      <Placeholder />
      <FlipPlaceholder />
      <Placeholder />
      <OneSidePinned />
      <Placeholder />
      <PinnedPlaceholder />
      <Placeholder />
    </main>
  );
}

export default App;
