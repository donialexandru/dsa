import { describe, it, expect } from "vitest";
import { solution } from "./solution";

describe("binarySearch", () => {
  // ✅ Happy path - found cases
  describe("when target is found", () => {
    it("should return the index of the target in the middle", () => {
      expect(solution([1, 3, 5, 7, 9], 5)).toBe(2);
    });

    it("should return the index of the target at the beginning", () => {
      expect(solution([1, 3, 5, 7, 9], 1)).toBe(0);
    });

    it("should return the index of the target at the end", () => {
      expect(solution([1, 3, 5, 7, 9], 9)).toBe(4);
    });

    it("should return 0 for a single-element array when target matches", () => {
      expect(solution([42], 42)).toBe(0);
    });

    it("should find the target in a large sorted array", () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i * 2); // [0, 2, 4, ..., 1998]
      expect(solution(arr, 500)).toBe(250);
    });

    it("should find a negative number", () => {
      expect(solution([-10, -5, 0, 5, 10], -5)).toBe(1);
    });

    it("should find target in a two-element array (left)", () => {
      expect(solution([3, 7], 3)).toBe(0);
    });

    it("should find target in a two-element array (right)", () => {
      expect(solution([3, 7], 7)).toBe(1);
    });
  });

  // ❌ Not found cases
  describe("when target is NOT found", () => {
    it("should return -1 when target is not in the array", () => {
      expect(solution([1, 3, 5, 7, 9], 4)).toBe(-1);
    });

    it("should return -1 when target is less than all elements", () => {
      expect(solution([1, 3, 5, 7, 9], -1)).toBe(-1);
    });

    it("should return -1 when target is greater than all elements", () => {
      expect(solution([1, 3, 5, 7, 9], 100)).toBe(-1);
    });

    it("should return -1 for an empty array", () => {
      expect(solution([], 5)).toBe(-1);
    });

    it("should return -1 for a single-element array when target does not match", () => {
      expect(solution([42], 99)).toBe(-1);
    });
  });

  // 🔢 Edge cases
  describe("edge cases", () => {
    it("should handle an array with all identical elements (target matches)", () => {
      expect(solution([5, 5, 5, 5, 5], 5)).toBeGreaterThanOrEqual(0);
    });

    it("should handle an array with all identical elements (target not found)", () => {
      expect(solution([5, 5, 5, 5, 5], 3)).toBe(-1);
    });

    it("should handle negative numbers only", () => {
      expect(solution([-9, -7, -5, -3, -1], -3)).toBe(3);
    });

    it("should handle an array with two elements where target is not present", () => {
      expect(solution([1, 3], 2)).toBe(-1);
    });

    it("should return a valid index (not -1) for any element in the array", () => {
      const arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
      arr.forEach((value, index) => {
        expect(solution(arr, value)).toBe(index);
      });
    });
  });
});
