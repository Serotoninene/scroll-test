import { useEffect } from "react";

export const useAdventOfCode = () => {
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
        let numStartIdx = i;
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
          const currRowTest =
            line.substring(numStartIdx - 1).indexOf("*") +
            (line.length - numStartIdx);
          const key = `${curLine}-${currRowTest}`;
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
    console.log(sum);
  };

  useEffect(() => {
    // read the data inside the file adventOfCodeData.txt
    fetch(data)
      .then((response) => response.text())
      .then((data) => {
        treatingTheData(data);
      });
  }, []);
};
