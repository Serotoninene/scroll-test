import { Suspense } from "react";

import { Experience } from "./components/three";
import { useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex justify-center items-center text-black">
        {progress.toFixed(2)}%
      </div>
    </div>
  );
};

function App() {
  return (
    <main id="main--container" className="overflow-hidden">
      <Suspense fallback={<Loader />}>
        <div className="h-screen fixed bg-slate-900 inset-0 z-10">
          <Experience />
        </div>
      </Suspense>
    </main>
  );
}

export default App;
