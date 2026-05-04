import { describe, test, expect } from "vitest";
import { solution } from "./solution";

describe("Two Crystal Balls", () => {
  test("should return the index where it first breaks", () => {
    let idx = Math.floor(Math.random() * 10000);
    const data = new Array(10000).fill(false);

    for (let i = idx; i < 10000; ++i) {
      data[i] = true;
    }

    expect(solution(data)).toEqual(idx);
  });

  test("should return -1 if it never breaks", () => {
    expect(solution(new Array(821).fill(false))).toEqual(-1);
  });
});
