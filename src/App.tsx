import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

const array = new Array(5).fill(0);

const Placeholder = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="h-[20vw] w-[20vw] bg-blue-300"></div>
    </section>
  );
};

function App() {
  const lenis = useRef<Lenis>();

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
    <main className="min-h-screen bg-slate-100">
      {array.map((_, idx) => (
        <Placeholder key={idx} />
      ))}
    </main>
  );
}

export default App;
