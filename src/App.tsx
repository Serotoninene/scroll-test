import { Suspense } from "react";

import { Experience } from "./components/three";
import { useProgress } from "@react-three/drei";
import { Placeholder } from "./components/atoms";

// const imgArray = new Array(9).fill(0);
// // const sliderArray = ["lightblue", "lightgreen", "lightpink"];
// const IMAGE_URL =
//   "https://as2.ftcdn.net/v2/jpg/05/59/13/39/1000_F_559133954_0kKDwhaWzU2ltOH4ylCkP1B4f7N6XkPD.jpg";

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
    <main id="main--container" className="bg-slate-100 overflow-hidden">
      <Suspense fallback={<Loader />}>
        <Placeholder />
        <div className="h-screen fixed inset-0 z-10">
          <Experience />
        </div>
        <Placeholder />
      </Suspense>
    </main>
  );
}

export default App;
