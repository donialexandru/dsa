import { describe, test, expect } from "vitest";
import { solution } from "./solution";

describe("factorial", () => {
  test("should compute the factorial of a positive number", () => {
    expect(solution(5)).toEqual(120);
  });

  test("should return 1 for the factorial of 0", () => {
    expect(solution(0)).toEqual(1);
  });

  test("should return 1 for the factorial of 1", () => {
    expect(solution(1)).toEqual(1);
  });

  test("should handle small values", () => {
    expect(solution(3)).toEqual(6);
    expect(solution(4)).toEqual(24);
  });
