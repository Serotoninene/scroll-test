import { Placeholder } from "./components/atoms";
import { Experience } from "./components/three";

// const imgArray = new Array(9).fill(0);
// const sliderArray = ["lightblue", "lightgreen", "lightpink"];
// const IMAGE_URL =
//   "https://as2.ftcdn.net/v2/jpg/05/59/13/39/1000_F_559133954_0kKDwhaWzU2ltOH4ylCkP1B4f7N6XkPD.jpg";

function App() {
  return (
    <main className="min-h-[500vh] bg-slate-100  h-auto overflow-hidden">
      <div className="h-screen fixed inset-0 z-10">
        <Experience />
      </div>
      <Placeholder />

      <Placeholder />
    </main>
  );
}

export default App;
