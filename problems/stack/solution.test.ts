import { describe, it, expect, beforeEach } from "vitest";
import { Node, Stack } from "./solution";

describe("Node", () => {
  it("stores a value and starts with next set to null", () => {
    const node = new Node(5);

    expect(node.value).toBe(5);
    expect(node.next).toBeNull();
  });
});

describe("Stack", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  it("returns undefined from pop and peek when empty", () => {
    expect(stack.pop()).toBeUndefined();
    expect(stack.peek()).toBeUndefined();
  });

  it("pops items in reverse order of pushing (LIFO)", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  it("peek returns the top item without removing it", () => {
    stack.push(10);
    stack.push(20);

    expect(stack.peek()).toBe(20);
    expect(stack.peek()).toBe(20);
    expect(stack.pop()).toBe(20);
    expect(stack.peek()).toBe(10);
  });

  it("becomes empty again after all items are popped", () => {
    stack.push(1);
    stack.pop();

    expect(stack.pop()).toBeUndefined();
    expect(stack.peek()).toBeUndefined();
  });

  it("can be reused after being emptied", () => {
    stack.push(1);
    stack.pop();

    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.pop()).toBe(2);
  });

  it("keeps working when push and pop are mixed", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);

    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(1);
  });

  it("works with other types", () => {
    const words = new Stack<string>();
    words.push("a");
    words.push("b");

    expect(words.peek()).toBe("b");
    expect(words.pop()).toBe("b");
    expect(words.pop()).toBe("a");
  });
});
