import { describe, test, expect } from "vitest";
import { solution } from "./solution";

describe("fibonacci", () => {
  test("should return the nth number in the fibonacci sequence", () => {
    expect(solution(8)).toEqual(21);
  });

  test("should return 0 for the 0th number", () => {
    expect(solution(0)).toEqual(0);
  });

  test("should return 1 for the 1st number", () => {
    expect(solution(1)).toEqual(1);
  });

  test("should return 1 for the 2nd number", () => {
    expect(solution(2)).toEqual(1);
  });

  test("should handle small values", () => {
    expect(solution(5)).toEqual(5);
  });

  test("should handle larger values", () => {
    expect(solution(10)).toEqual(55);
    expect(solution(15)).toEqual(610);
  });
});
