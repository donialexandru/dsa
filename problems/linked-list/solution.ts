export class SinglyLinkedList<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private _length = 0;

  get length(): number {
    return this._length;
  }
  prepend(value: T): void {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this._length++;
  }
  append(value: T): void {
    const node = new Node(value);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this._length++;
  }
  insertAt(value: T, index: number): void {
    if (index < 0 || index > this._length) {
      return undefined;
    }

    if (index === 0) {
      return this.prepend(value);
    }
    if (index === this.length) {
      return this.append(value);
    }

    //walk to the node just before the insertion point
    const prev = this.getNode(index - 1);
    const node = new Node(value);
    node.next = prev!.next;
    prev!.next = node;

    this._length++;
  }
  get(index: number): T | undefined {
    const node = this.getNode(index);
    return node?.value;
  }
  remove(value: T): T | undefined {
    let prev: Node<T> | null = null;
    let curr = this.head;

    while (curr !== null && curr.value !== value) {
      prev = curr;
      curr = curr.next;
    }

    if (curr === null) return undefined;

    this.unlink(prev, curr);
    return curr.value;
  }
  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this._length) {
      return undefined;
    }

    const prev = index === 0 ? null : this.getNode(index - 1);
    const curr = prev === null ? this.head! : prev.next;

    this.unlink(prev, curr);

    return curr!.value;
  }

  private getNode(index: number): Node<T> | null {
    if (index < 0 || index >= this._length) {
      return null;
    }

    let curr = this.head;
    if (curr === null) {
      return null;
    }
    for (let i = 0; i < index; i++) {
      curr = curr!.next;
    }
    return curr;
  }

  private unlink(prev: Node<T> | null, curr: Node<T>): void {
    if (prev === null) {
      this.head = curr.next;
    } else {
      prev.next = curr.next;
    }

    if (curr === this.tail) {
      this.tail = prev;
    }

    curr.next = null;
    this._length--;
  }
}

export class Node<T> {
  public next: Node<T> | null = null;
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}
