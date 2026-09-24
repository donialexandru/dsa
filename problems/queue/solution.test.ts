import { describe, it, expect, beforeEach } from "vitest";
import { Queue, Node } from "./solution";

describe("Node", () => {
  it("stores a value and starts with next set to null", () => {
    const node = new Node(5);

    expect(node.value).toBe(5);
    expect(node.next).toBeNull();
  });

  it("can be linked to another node", () => {
    const first = new Node("a");
    const second = new Node("b");
    first.next = second;

    expect(first.next).toBe(second);
    expect(first.next.value).toBe("b");
    expect(second.next).toBeNull();
  });
});

describe("Queue", () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it("returns undefined from dequeue and peek when empty", () => {
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.peek()).toBeUndefined();
  });

  it("dequeues items in the order they were enqueued (FIFO)", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });

  it("peek returns the front item without removing it", () => {
    queue.enqueue(10);
    queue.enqueue(20);

    expect(queue.peek()).toBe(10);
    expect(queue.peek()).toBe(10);
    expect(queue.dequeue()).toBe(10);
    expect(queue.peek()).toBe(20);
  });

  it("becomes empty again after all items are dequeued", () => {
    queue.enqueue(1);
    queue.dequeue();

    expect(queue.dequeue()).toBeUndefined();
    expect(queue.peek()).toBeUndefined();
  });

  it("can be reused after being emptied", () => {
    queue.enqueue(1);
    queue.dequeue();

    // tail must have been reset, otherwise this item would be lost
    queue.enqueue(2);
    expect(queue.peek()).toBe(2);
    expect(queue.dequeue()).toBe(2);
  });

  it("keeps working when enqueue and dequeue are mixed", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);

    queue.enqueue(3);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });

  it("works with other types", () => {
    const words = new Queue<string>();
    words.enqueue("a");
    words.enqueue("b");

    expect(words.peek()).toBe("a");
    expect(words.dequeue()).toBe("a");
  });
});
