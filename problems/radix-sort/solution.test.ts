import { describe, test, expect } from "vitest";
import { solution } from "./solution";

describe("radix-sort", () => {
  test("should sort an array of numbers in ascending order", () => {
    const arr = [9, 3, 7, 4, 69, 420, 42];

    solution(arr);
    expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
  });

  test("should handle an already sorted array", () => {
    const arr = [1, 2, 3, 4, 5];

    solution(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle a reverse-sorted array", () => {
    const arr = [5, 4, 3, 2, 1];

    solution(arr);
    expect(arr).toEqual([1, 2, 3, 4, 5]);
  });

  test("should handle numbers with varying digit counts", () => {
    const arr = [1, 100, 10, 1000, 10000];

    solution(arr);
    expect(arr).toEqual([1, 10, 100, 1000, 10000]);
  });

  test("should handle an empty array", () => {
    const arr: number[] = [];

    solution(arr);
    expect(arr).toEqual([]);
  });

  test("should handle a single-element array", () => {
    const arr = [42];

    solution(arr);
    expect(arr).toEqual([42]);
  });

  test("should handle duplicate values", () => {
    const arr = [3, 1, 2, 3, 1];

    solution(arr);
    expect(arr).toEqual([1, 1, 2, 3, 3]);
  });

  test("should handle numbers with zeros", () => {
    const arr = [0, 50, 5, 500, 0];

    solution(arr);
    expect(arr).toEqual([0, 0, 5, 50, 500]);
  });
});
