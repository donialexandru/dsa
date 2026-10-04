import { describe, it, expect, beforeEach } from "vitest";
import { Node, SinglyLinkedList } from "./solution.ts";

/** Test helper: read every item through the public API (length + get). */
function toArray<T>(list: SinglyLinkedList<T>): T[] {
  const result: T[] = [];
  for (let i = 0; i < list.length; i++) {
    result.push(list.get(i) as T);
  }
  return result;
}

describe("Node", () => {
  it("stores a value and starts with next set to null", () => {
    const node = new Node(5);

    expect(node.value).toBe(5);
    expect(node.next).toBeNull();
  });
});

describe("SinglyLinkedList", () => {
  let list: SinglyLinkedList<number>;

  beforeEach(() => {
    list = new SinglyLinkedList<number>();
  });

  describe("empty list", () => {
    it("has length 0 and no items", () => {
      expect(list.length).toBe(0);
      expect(toArray(list)).toEqual([]);
      expect(list.get(0)).toBeUndefined();
    });

    it("returns undefined when removing", () => {
      expect(list.remove(1)).toBeUndefined();
      expect(list.removeAt(0)).toBeUndefined();
    });
  });

  describe("append", () => {
    it("adds items to the end", () => {
      list.append(1);
      list.append(2);
      list.append(3);

      expect(toArray(list)).toEqual([1, 2, 3]);
      expect(list.length).toBe(3);
    });
  });

  describe("prepend", () => {
    it("adds items to the front", () => {
      list.prepend(1);
      list.prepend(2);
      list.prepend(3);

      expect(toArray(list)).toEqual([3, 2, 1]);
      expect(list.length).toBe(3);
    });

    it("works together with append", () => {
      list.append(2);
      list.prepend(1);
      list.append(3);

      expect(toArray(list)).toEqual([1, 2, 3]);
    });
  });

  describe("insertAt", () => {
    beforeEach(() => {
      list.append(1);
      list.append(3);
    });

    it("inserts in the middle", () => {
      list.insertAt(2, 1);

      expect(toArray(list)).toEqual([1, 2, 3]);
      expect(list.length).toBe(3);
    });

    it("inserts at the front with index 0", () => {
      list.insertAt(0, 0);

      expect(toArray(list)).toEqual([0, 1, 3]);
    });

    it("inserts at the end with index === length", () => {
      list.insertAt(4, 2);
      list.append(5); // tail must point to the inserted node

      expect(toArray(list)).toEqual([1, 3, 4, 5]);
    });

    it("inserts into an empty list at index 0", () => {
      const empty = new SinglyLinkedList<string>();
      empty.insertAt("a", 0);

      expect(toArray(empty)).toEqual(["a"]);
    });

    it("return undefined for an out-of-range index", () => {
      expect(list.insertAt(9, -1)).toBeUndefined();
      expect(list.insertAt(9, 3)).toBeUndefined();
      expect(toArray(list)).toEqual([1, 3]); // list unchanged
    });
  });

  describe("get", () => {
    beforeEach(() => {
      list.append(10);
      list.append(20);
      list.append(30);
    });

    it("returns the item at each index", () => {
      expect(list.get(0)).toBe(10);
      expect(list.get(1)).toBe(20);
      expect(list.get(2)).toBe(30);
    });

    it("returns undefined for an out-of-range index", () => {
      expect(list.get(-1)).toBeUndefined();
      expect(list.get(3)).toBeUndefined();
    });
  });

  describe("remove", () => {
    beforeEach(() => {
      list.append(1);
      list.append(2);
      list.append(3);
    });

    it("removes an item from the middle and returns it", () => {
      expect(list.remove(2)).toBe(2);
      expect(toArray(list)).toEqual([1, 3]);
      expect(list.length).toBe(2);
    });

    it("removes the first item", () => {
      expect(list.remove(1)).toBe(1);
      expect(toArray(list)).toEqual([2, 3]);
    });

    it("removes the last item and updates the tail", () => {
      expect(list.remove(3)).toBe(3);
      list.append(4); // would be lost if tail still pointed at 3

      expect(toArray(list)).toEqual([1, 2, 4]);
    });

    it("removes only the first match", () => {
      list.append(2);
      list.remove(2);

      expect(toArray(list)).toEqual([1, 3, 2]);
    });

    it("returns undefined and changes nothing when the value is missing", () => {
      expect(list.remove(99)).toBeUndefined();
      expect(toArray(list)).toEqual([1, 2, 3]);
      expect(list.length).toBe(3);
    });
  });

  describe("removeAt", () => {
    beforeEach(() => {
      list.append(1);
      list.append(2);
      list.append(3);
    });

    it("removes the item at the given index and returns it", () => {
      expect(list.removeAt(1)).toBe(2);
      expect(toArray(list)).toEqual([1, 3]);
      expect(list.length).toBe(2);
    });

    it("removes the first item", () => {
      expect(list.removeAt(0)).toBe(1);
      expect(toArray(list)).toEqual([2, 3]);
    });

    it("removes the last item and updates the tail", () => {
      expect(list.removeAt(2)).toBe(3);
      list.append(4);

      expect(toArray(list)).toEqual([1, 2, 4]);
    });

    it("returns undefined for an out-of-range index", () => {
      expect(list.removeAt(-1)).toBeUndefined();
      expect(list.removeAt(3)).toBeUndefined();
      expect(list.length).toBe(3);
    });
  });

  it("can be emptied completely and reused", () => {
    list.append(1);
    list.append(2);
    list.removeAt(0);
    list.remove(2);

    expect(list.length).toBe(0);
    expect(toArray(list)).toEqual([]);

    list.append(5);
    list.prepend(4);
    expect(toArray(list)).toEqual([4, 5]);
  });
});
