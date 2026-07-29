import { describe, test, expect } from "vitest";
import { solution } from "./solution";

describe("quick-sort", () => {
  test("should sort an array of numbers in ascending order", () => {
    const arr = [9, 3, 7, 4, 69, 420, 42];

    const result = solution(arr);
    expect(result).toEqual([3, 4, 7, 9, 42, 69, 420]);
  });

  test("should handle an already sorted array", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = solution(arr);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle a reverse-sorted array", () => {
    const arr = [5, 4, 3, 2, 1];

    const result = solution(arr);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle an empty array", () => {
    const arr: number[] = [];

    const result = solution(arr);
    expect(result).toEqual([]);
  });

  test("should handle a single-element array", () => {
    const arr = [42];

    const result = solution(arr);
    expect(result).toEqual([42]);
  });

  test("should handle duplicate values", () => {
    const arr = [3, 1, 2, 3, 1];

    const result = solution(arr);
    expect(result).toEqual([1, 1, 2, 3, 3]);
  });
});
