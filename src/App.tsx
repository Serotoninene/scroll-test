import { useEffect, useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

const sliderArray = ["lightblue", "lightgreen", "lightpink"];

gsap.registerPlugin(Flip);
gsap.registerPlugin(ScrollTrigger);

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
          className="panel "
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
      gsap.from(panel, {
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
  "https://as2.ftcdn.net/v2/jpg/05/59/13/39/1000_F_559133954_0kKDwhaWzU2ltOH4ylCkP1B4f7N6XkPD.jpg";

const FlipPlaceholder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerImagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    galleryRef.current?.classList.add("gallery--switch");
    const flipState = Flip.getState([
      ...imagesRef.current,
      ...innerImagesRef.current,
      galleryRef.current,
    ]);
    galleryRef.current?.classList.remove("gallery--switch");
    Flip.to(flipState, {
      absolute: false,
      scale: true,
      simple: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        markers: true,
        end: "bottom 25%",
        scrub: 1,
      },
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
    });
  }, []);

  return (
    <div ref={containerRef} className="gallery--wrap">
      <div
        ref={galleryRef}
        className="gallery gallery--grid gallery--switch"
        data-flip-id="gallery"
      >
        {imgArray.map((_, idx) => (
          <div
            key={idx}
            ref={(e) => (imagesRef.current[idx] = e)}
            data-flip-id={"gallery__item-" + idx}
            className="gallery__item-cut"
          >
            <div
              ref={(e) => (innerImagesRef.current[idx] = e)}
              className="gallery__item-inner"
              data-flip-id={"gallery__item-inner-" + idx}
              style={{
                backgroundImage: `url(${IMAGE_URL})`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-slate-100 h-auto overflow-hidden">
      <Placeholder />
      <FlipPlaceholder />
      <Placeholder />
      {/* <OneSidePinned />
      <Placeholder />
      <PinnedPlaceholder />
      <Placeholder /> */}
    </main>
  );
}

export default App;
