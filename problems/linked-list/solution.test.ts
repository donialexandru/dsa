import { describe, it, expect, beforeEach } from "vitest";
import { LinkedList } from "./solution.ts";

describe("LinkedList", () => {
  let list: LinkedList;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe("initial state", () => {
    it("starts empty", () => {
      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).toBeNull();
    });

    it("get on an empty list returns undefined", () => {
      expect(list.get(0)).toBeUndefined();
    });

    it("pop on an empty list throws", () => {
      expect(() => list.pop()).toThrow();
    });
  });

  describe("push", () => {
    it("increases length by one per call", () => {
      list.push(1);
      expect(list.length).toBe(1);
      list.push(2);
      expect(list.length).toBe(2);
    });

    it("sets head and tail on the first push", () => {
      list.push(10);
      expect(list.head?.value).toBe(10);
      expect(list.tail?.value).toBe(10);
      expect(list.head).toBe(list.tail);
    });

    it("appends subsequent values after the current tail", () => {
      list.push(1);
      list.push(2);
      list.push(3);
      expect(list.head?.value).toBe(1);
      expect(list.tail?.value).toBe(3);
      expect(list.length).toBe(3);
    });

    it("stores values retrievable in order via get()", () => {
      [1, 2, 3, 4].forEach((v) => list.push(v));
      expect(list.get(0)).toBe(1);
      expect(list.get(1)).toBe(2);
      expect(list.get(2)).toBe(3);
      expect(list.get(3)).toBe(4);
    });
  });

  describe("get", () => {
    beforeEach(() => {
      [10, 20, 30].forEach((v) => list.push(v));
    });

    it("returns the value at the given index", () => {
      expect(list.get(0)).toBe(10);
      expect(list.get(1)).toBe(20);
      expect(list.get(2)).toBe(30);
    });

    it("returns undefined for an out-of-range index", () => {
      expect(list.get(3)).toBeUndefined();
      expect(list.get(99)).toBeUndefined();
      expect(list.get(-1)).toBeUndefined();
    });
  });

  describe("delete", () => {
    beforeEach(() => {
      [10, 20, 30, 40].forEach((v) => list.push(v));
    });

    it("removes and returns the head when index is 0", () => {
      const removed = list.delete(0);
      expect(removed).toBe(10);
      expect(list.length).toBe(3);
      expect(list.get(0)).toBe(20);
      expect(list.head?.value).toBe(20);
    });

    it("removes and returns a middle element", () => {
      const removed = list.delete(1);
      expect(removed).toBe(20);
      expect(list.length).toBe(3);
      expect(list.get(0)).toBe(10);
      expect(list.get(1)).toBe(30);
      expect(list.get(2)).toBe(40);
    });

    it("removes and returns the last element and updates tail", () => {
      const removed = list.delete(3);
      expect(removed).toBe(40);
      expect(list.length).toBe(3);
      expect(list.tail?.value).toBe(30);
    });

    it("returns null when deleting exactly one past the end", () => {
      expect(list.delete(4)).toBeNull();
      expect(list.length).toBe(4);
    });

    it("throws when deleting more than one past the end", () => {
      expect(() => list.delete(10)).toThrow();
    });

    it("throws when deleting a negative, non-zero index", () => {
      expect(() => list.delete(-1)).toThrow();
    });

    it("throws when deleting index 0 on an empty list", () => {
      const empty = new LinkedList();
      expect(() => empty.delete(0)).toThrow();
    });

    it("empties head but leaves tail stale when the last node is deleted", () => {
      const single = new LinkedList();
      single.push("only");
      const removed = single.delete(0);
      expect(removed).toBe("only");
      expect(single.length).toBe(0);
      expect(single.head).toBeNull();
      expect(single.tail).not.toBeNull(); // current behavior: tail is not reset
      expect(single.tail?.value).toBe("only");
    });
  });

  describe("pop", () => {
    it("removes and returns the last pushed value", () => {
      [1, 2, 3].forEach((v) => list.push(v));
      const popped = list.pop();
      expect(popped).toBe(3);
      expect(list.length).toBe(2);
      expect(list.tail?.value).toBe(2);
    });

    it("pops down to one element correctly", () => {
      [1, 2, 3].forEach((v) => list.push(v));
      expect(list.pop()).toBe(3);
      expect(list.pop()).toBe(2);
      expect(list.length).toBe(1);
      expect(list.head?.value).toBe(1);
      expect(list.tail?.value).toBe(1);
    });

    it("popping the final element leaves head null but tail stale", () => {
      list.push("only");
      expect(list.pop()).toBe("only");
      expect(list.length).toBe(0);
      expect(list.head).toBeNull();
      expect(list.tail).not.toBeNull();
    });

    it("throws when popping an already-empty list", () => {
      expect(() => list.pop()).toThrow();
    });
  });

  describe("mixed operations", () => {
    it("supports push/delete/push sequences and keeps indices consistent", () => {
      list.push("a");
      list.push("b");
      list.push("c");
      list.delete(1); // remove "b"
      list.push("d");
      expect(list.length).toBe(3);
      expect(list.get(0)).toBe("a");
      expect(list.get(1)).toBe("c");
      expect(list.get(2)).toBe("d");
      expect(list.tail?.value).toBe("d");
    });
  });
});
