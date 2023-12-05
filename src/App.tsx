import { Suspense, useEffect } from "react";

import { Experience } from "./components/three";
import { useProgress } from "@react-three/drei";

import data from "./adventOfCodeData.txt";
import { log } from "console";

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
  const hasSymbol = (str: string, lineIdx: number) => {
    if (str?.length && str.split("").find((x: string) => x === "*"))
      return lineIdx;
    return false;
  };

  const treatingTheData = (data: string) => {
    const lines = data.split("\n");

    const founds: { [key: string]: number[] } = {};
    const multipliedFounds: number[] = [];

    lines.forEach((line, lineIdx) => {
      for (let i = 0; i < line.length; i++) {
        const n = "" + line[i];
        if (isNaN(parseInt(n))) continue;

        let num = n;
        while (i++ < line.length) {
          if (Number.isInteger(parseInt(line[i]))) {
            num += line[i];
          } else break;
        }

        const top =
          lineIdx === 0
            ? ""
            : lines[lineIdx - 1].substring(i - num.length - 1, i + 1);

        const btm =
          lineIdx === lines.length - 1
            ? ""
            : lines[lineIdx + 1].substring(i - num.length - 1, i + 1);

        const lft = i - num.length === 0 ? "" : line[i - num.length - 1];
        const rgt = i === line.length ? "" : line[i];

        if (
          hasSymbol(top, lineIdx - 1) ||
          hasSymbol(btm, lineIdx + 1) ||
          hasSymbol(lft, lineIdx) ||
          hasSymbol(rgt, lineIdx)
        ) {
          const topIdx = hasSymbol(top, lineIdx - 1);
          const btmIdx = hasSymbol(btm, lineIdx + 1);
          const lftIdx = hasSymbol(lft, lineIdx);
          const rgtIdx = hasSymbol(rgt, lineIdx);

          let currentLineIdx = null;
          if (topIdx) currentLineIdx = topIdx;
          if (btmIdx) currentLineIdx = btmIdx;
          if (lftIdx) currentLineIdx = lftIdx;
          if (rgtIdx) currentLineIdx = rgtIdx;

          const curLine = currentLineIdx;
          const curRow = lines[currentLineIdx!].indexOf("*");
          const key = `${curLine}-${curRow}`;
          if (!founds[key]) {
            founds[key] = [];
          }
          founds[key].push(parseInt(num));
        }
      }
    });

    const filteredFounds = Object.values(founds).filter(
      (found) => found.length > 1
    );

    const multiFounds = filteredFounds.map((el) =>
      el.reduce((prev, curr) => prev * curr, 1)
    );

    const sum = multiFounds.reduce((prev, curr) => prev + curr, 0);
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
    <main id="main--container" className="overflow-hidden">
      <Suspense fallback={<Loader />}>
        <div className="h-screen fixed bg-slate-50 inset-0 z-10">
          <Experience />
        </div>
      </Suspense>
    </main>
  );
}

export default App;
