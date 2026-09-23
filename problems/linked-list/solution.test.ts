import { beforeEach, describe, expect, test } from "vitest";
import SinglyLinkedList from "./solution";

/**
 * Materializes the list using only the public API so tests never touch
 * internals (head/tail/next). If `get` is broken these will fail loudly,
 * which is exactly what you want.
 */
function toArray<T>(list: SinglyLinkedList<T>): (T | undefined)[] {
  const out: (T | undefined)[] = [];
  for (let i = 0; i < list.length; i++) {
    out.push(list.get(i));
  }
  return out;
}

function listOf<T>(...items: T[]): SinglyLinkedList<T> {
  const list = new SinglyLinkedList<T>();
  for (const item of items) list.append(item);
  return list;
}

describe("SinglyLinkedList", () => {
  let list: SinglyLinkedList<number>;

  beforeEach(() => {
    list = new SinglyLinkedList<number>();
  });

  describe("construction", () => {
    test("starts empty", () => {
      expect(list.length).toBe(0);
    });

    test("get on an empty list returns undefined", () => {
      expect(list.get(0)).toBeUndefined();
    });

    test("removeAt on an empty list returns undefined", () => {
      expect(list.removeAt(0)).toBeUndefined();
      expect(list.length).toBe(0);
    });

    test("remove on an empty list returns undefined", () => {
      expect(list.remove(42)).toBeUndefined();
      expect(list.length).toBe(0);
    });
  });

  describe("append", () => {
    test("appends a single item", () => {
      list.append(1);
      expect(list.length).toBe(1);
      expect(list.get(0)).toBe(1);
    });

    test("appends to the end, preserving order", () => {
      list.append(1);
      list.append(2);
      list.append(3);
      expect(list.length).toBe(3);
      expect(toArray(list)).toEqual([1, 2, 3]);
    });

    test("appending many items keeps O(1)-friendly correctness", () => {
      const expected = Array.from({ length: 1_000 }, (_, i) => i);
      for (const n of expected) list.append(n);
      expect(list.length).toBe(1_000);
      expect(list.get(0)).toBe(0);
      expect(list.get(999)).toBe(999);
      expect(toArray(list)).toEqual(expected);
    });
  });

  describe("prepend", () => {
    test("prepends a single item", () => {
      list.prepend(1);
      expect(list.length).toBe(1);
      expect(list.get(0)).toBe(1);
    });

    test("prepends to the front, reversing insertion order", () => {
      list.prepend(1);
      list.prepend(2);
      list.prepend(3);
      expect(list.length).toBe(3);
      expect(toArray(list)).toEqual([3, 2, 1]);
    });

    test("interleaves correctly with append", () => {
      list.append(2);
      list.prepend(1);
      list.append(3);
      list.prepend(0);
      expect(toArray(list)).toEqual([0, 1, 2, 3]);
      expect(list.length).toBe(4);
    });
  });

  describe("get", () => {
    beforeEach(() => {
      list = listOf(10, 20, 30);
    });

    test("returns the item at each valid index", () => {
      expect(list.get(0)).toBe(10);
      expect(list.get(1)).toBe(20);
      expect(list.get(2)).toBe(30);
    });

    test("returns undefined for an index past the end", () => {
      expect(list.get(3)).toBeUndefined();
      expect(list.get(100)).toBeUndefined();
    });

    test("returns undefined for a negative index", () => {
      expect(list.get(-1)).toBeUndefined();
    });

    test("does not mutate the list", () => {
      list.get(1);
      expect(list.length).toBe(3);
      expect(toArray(list)).toEqual([10, 20, 30]);
    });
  });

  describe("insertAt", () => {
    test("inserts at index 0 of an empty list", () => {
      list.insertAt(1, 0);
      expect(list.length).toBe(1);
      expect(toArray(list)).toEqual([1]);
    });

    test("inserts at the head", () => {
      list = listOf(2, 3);
      list.insertAt(1, 0);
      expect(list.length).toBe(3);
      expect(toArray(list)).toEqual([1, 2, 3]);
    });

    test("inserts in the middle", () => {
      list = listOf(1, 3);
      list.insertAt(2, 1);
      expect(list.length).toBe(3);
      expect(toArray(list)).toEqual([1, 2, 3]);
    });

    test("inserting at idx === length appends", () => {
      list = listOf(1, 2);
      list.insertAt(3, 2);
      expect(list.length).toBe(3);
      expect(toArray(list)).toEqual([1, 2, 3]);
    });

    test("keeps the tail usable after inserting at the end", () => {
      list = listOf(1, 2);
      list.insertAt(3, 2);
      list.append(4); // would break if `tail` wasn't updated
      expect(toArray(list)).toEqual([1, 2, 3, 4]);
      expect(list.length).toBe(4);
    });

    test("keeps the tail usable after inserting into an empty list", () => {
      list.insertAt(1, 0);
      list.append(2);
      expect(toArray(list)).toEqual([1, 2]);
    });

    // ⚠️ Swap this block for the no-op version below if you prefer
    // out-of-bounds inserts to be silently ignored.
    test("throws when idx > length", () => {
      list = listOf(1, 2);
      expect(() => list.insertAt(99, 3)).toThrow();
      expect(list.length).toBe(2);
    });

    test("throws when idx is negative", () => {
      list = listOf(1, 2);
      expect(() => list.insertAt(99, -1)).toThrow();
      expect(list.length).toBe(2);
    });
  });

  describe("removeAt", () => {
    test("removes the only item", () => {
      list = listOf(1);
      expect(list.removeAt(0)).toBe(1);
      expect(list.length).toBe(0);
      expect(list.get(0)).toBeUndefined();
    });

    test("removes the head", () => {
      list = listOf(1, 2, 3);
      expect(list.removeAt(0)).toBe(1);
      expect(list.length).toBe(2);
      expect(toArray(list)).toEqual([2, 3]);
    });

    test("removes from the middle", () => {
      list = listOf(1, 2, 3);
      expect(list.removeAt(1)).toBe(2);
      expect(list.length).toBe(2);
      expect(toArray(list)).toEqual([1, 3]);
    });

    test("removes the tail", () => {
      list = listOf(1, 2, 3);
      expect(list.removeAt(2)).toBe(3);
      expect(list.length).toBe(2);
      expect(toArray(list)).toEqual([1, 2]);
    });

    test("leaves the list appendable after removing the tail", () => {
      list = listOf(1, 2, 3);
      list.removeAt(2);
      list.append(4); // would break if `tail` wasn't moved back
      expect(toArray(list)).toEqual([1, 2, 4]);
      expect(list.length).toBe(3);
    });

    test("leaves the list usable after emptying it", () => {
      list = listOf(1);
      list.removeAt(0);
      list.append(2);
      list.prepend(1);
      expect(toArray(list)).toEqual([1, 2]);
      expect(list.length).toBe(2);
    });

    test("returns undefined for out-of-range indices without mutating", () => {
      list = listOf(1, 2, 3);
      expect(list.removeAt(3)).toBeUndefined();
      expect(list.removeAt(-1)).toBeUndefined();
      expect(list.length).toBe(3);
      expect(toArray(list)).toEqual([1, 2, 3]);
    });

    test("can drain the whole list", () => {
      list = listOf(1, 2, 3);
      expect(list.removeAt(0)).toBe(1);
      expect(list.removeAt(0)).toBe(2);
      expect(list.removeAt(0)).toBe(3);
      expect(list.removeAt(0)).toBeUndefined();
      expect(list.length).toBe(0);
    });
  });

  describe("remove", () => {
    test("removes the only item", () => {
      list = listOf(1);
      expect(list.remove(1)).toBe(1);
      expect(list.length).toBe(0);
    });

    test("removes a head value", () => {
      list = listOf(1, 2, 3);
      expect(list.remove(1)).toBe(1);
      expect(toArray(list)).toEqual([2, 3]);
      expect(list.length).toBe(2);
    });

    test("removes a middle value", () => {
      list = listOf(1, 2, 3);
      expect(list.remove(2)).toBe(2);
      expect(toArray(list)).toEqual([1, 3]);
      expect(list.length).toBe(2);
    });

    test("removes a tail value and keeps the list appendable", () => {
      list = listOf(1, 2, 3);
      expect(list.remove(3)).toBe(3);
      list.append(4);
      expect(toArray(list)).toEqual([1, 2, 4]);
      expect(list.length).toBe(3);
    });

    test("returns undefined when the value is absent", () => {
      list = listOf(1, 2, 3);
      expect(list.remove(99)).toBeUndefined();
      expect(list.length).toBe(3);
      expect(toArray(list)).toEqual([1, 2, 3]);
    });

    test("removes only the first occurrence of a duplicate", () => {
      list = listOf(1, 2, 1, 3);
      expect(list.remove(1)).toBe(1);
      expect(toArray(list)).toEqual([2, 1, 3]);
      expect(list.length).toBe(3);

      expect(list.remove(1)).toBe(1);
      expect(toArray(list)).toEqual([2, 3]);
      expect(list.length).toBe(2);
    });
  });

  describe("generics and reference types", () => {
    test("works with strings", () => {
      const strings = new SinglyLinkedList<string>();
      strings.append("a");
      strings.prepend("b");
      strings.insertAt("c", 1);
      expect(toArray(strings)).toEqual(["b", "c", "a"]);
      expect(strings.remove("c")).toBe("c");
      expect(strings.length).toBe(2);
    });

    test("compares objects by reference, not structure", () => {
      const a = { id: 1 };
      const b = { id: 1 }; // structurally equal, different reference
      const objects = new SinglyLinkedList<{ id: number }>();
      objects.append(a);

      expect(objects.remove(b)).toBeUndefined();
      expect(objects.length).toBe(1);

      expect(objects.remove(a)).toBe(a);
      expect(objects.length).toBe(0);
    });

    test("can store falsy values", () => {
      const falsy = new SinglyLinkedList<number>();
      falsy.append(0);
      falsy.append(0);
      expect(falsy.length).toBe(2);
      expect(falsy.get(0)).toBe(0);
      expect(falsy.remove(0)).toBe(0);
      expect(falsy.length).toBe(1);
    });
  });

  // A single end-to-end run mixing every operation — great canary for
  // pointer/length bugs that per-method tests can miss.
  test("integration: mixed operations", () => {
    const l = new SinglyLinkedList<number>();

    l.append(5);
    l.append(7);
    l.append(9);
    expect(l.get(2)).toBe(9);
    expect(l.length).toBe(3);

    expect(l.removeAt(1)).toBe(7);
    expect(l.length).toBe(2);

    l.append(11);
    expect(l.removeAt(1)).toBe(9);
    expect(l.remove(9)).toBeUndefined();
    expect(l.removeAt(0)).toBe(5);
    expect(l.removeAt(0)).toBe(11);
    expect(l.length).toBe(0);

    l.prepend(5);
    l.prepend(7);
    l.prepend(9);
    expect(l.get(0)).toBe(9);
    expect(l.get(2)).toBe(5);
    expect(l.remove(9)).toBe(9);
    expect(l.length).toBe(2);
    expect(l.get(0)).toBe(7);

    l.insertAt(100, 1);
    expect(toArray(l)).toEqual([7, 100, 5]);
    l.insertAt(200, 3);
    expect(toArray(l)).toEqual([7, 100, 5, 200]);
    l.append(300);
    expect(toArray(l)).toEqual([7, 100, 5, 200, 300]);
    expect(l.length).toBe(5);
  });
});
