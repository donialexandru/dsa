import { describe, test, expect } from "vitest";
import { solution } from "./solution";

describe("bubble-sort", () => {
  test("should sort an array of numbers in ascending order", () => {
    const arr = [9, 3, 7, 4, 69, 420, 42];

    solution(arr);
    expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
  });
});
