import { Suspense, useEffect } from "react";

import { Experience } from "./components/three";
import { useProgress } from "@react-three/drei";

import data from "./adventOfCodeData.txt";

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
  const treatingTheData = (data: string) => {
    const lines = data.split("\n");
    return lines;
  };

  useEffect(() => {
    // read the data inside the file adventOfCodeData.txt
    fetch(data)
      .then((response) => response.text())
      .then((data) => {
        treatingTheData(data);
      });
  }, []);

  return (
    <main id="main--container" className="bg-slate-100 overflow-hidden">
      <Suspense fallback={<Loader />}>
        <div className="h-screen fixed inset-0 z-10">
          <Experience />
        </div>
      </Suspense>
    </main>
  );
}

export default App;
