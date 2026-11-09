import { describe, expect, test } from "vitest";
import { solution } from "./solution";

type Point = {
  x: number;
  y: number;
};

function drawPath(data: string[], path: Point[]): string[] {
  const result = data.map((row) => row.split(""));

  path.forEach(({ x, y }) => {
    if (result[y]?.[x] !== undefined) {
      result[y][x] = "*";
    }
  });

  return result.map((row) => row.join(""));
}

describe("maze solver", () => {
  test("finds the path through the maze", () => {
    const maze = [
      "xxxxxxxxxx x",
      "x        x x",
      "x        x x",
      "x xxxxxxxx x",
      "x          x",
      "x xxxxxxxxxx",
    ];

    const mazeResult: Point[] = [
      { x: 10, y: 0 },
      { x: 10, y: 1 },
      { x: 10, y: 2 },
      { x: 10, y: 3 },
      { x: 10, y: 4 },
      { x: 9, y: 4 },
      { x: 8, y: 4 },
      { x: 7, y: 4 },
      { x: 6, y: 4 },
      { x: 5, y: 4 },
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 2, y: 4 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
    ];

    const result = solution(maze, "x", { x: 10, y: 0 }, { x: 1, y: 5 });

    expect(drawPath(maze, result)).toEqual(drawPath(maze, mazeResult));
  });
});
