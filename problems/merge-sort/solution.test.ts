import { describe, test, expect } from "vitest";
import { solution } from "./solution";

describe("merge-sort", () => {
  test("should sort an array of numbers in ascending order", () => {
    const arr = [9, 3, 7, 4, 69, 420, 42];

    expect(solution(arr)).toEqual([3, 4, 7, 9, 42, 69, 420]);
  });

  test("should handle an already sorted array", () => {
    const arr = [1, 2, 3, 4, 5];

    expect(solution(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle a reverse-sorted array", () => {
    const arr = [5, 4, 3, 2, 1];

    expect(solution(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle an empty array", () => {
    const arr: number[] = [];

    expect(solution(arr)).toEqual([]);
  });

  test("should handle a single-element array", () => {
    const arr = [42];

    expect(solution(arr)).toEqual([42]);
  });

  test("should handle duplicate values", () => {
    const arr = [3, 1, 2, 3, 1];

    expect(solution(arr)).toEqual([1, 1, 2, 3, 3]);
  });

  test("should handle negative numbers", () => {
    const arr = [-5, 3, -1, 0, -10, 7];

    expect(solution(arr)).toEqual([-10, -5, -1, 0, 3, 7]);
  });
});
