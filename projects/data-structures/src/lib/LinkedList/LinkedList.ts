import { LinkedListNode } from './LinkedListNode';

export class LinkedList<T> {
  private readonly NO_SUCH_EL = `No such element in LinkedList`;

  private _head: LinkedListNode<T>;
  get head() {
    return this._head;
  }

  private _tail: LinkedListNode<T>;
  get tail() {
    return this._tail;
  }

  private _count: number = 0;
  get count() {
    return this._count;
  }

  constructor() {
    this._head = null as any;
    this._tail = null as any;
  }

  empty(): boolean {
    return this.count === 0;
  }

  addFirst(item: T) {
    const node = new LinkedListNode(item);

    if (this.empty()) this._head = this._tail = node;
    else {
      node.next = this.head;
      this._head = node;
    }
    this._count++;
  }

  addLast(item: T) {
    const node = new LinkedListNode(item);

    if (this.empty()) this._head = this._tail = node;
    else {
      if (this.tail) {
        this._tail.next = node;
        this._tail = node;
      }
    }
    this._count++;
  }

  removeFirst() {
    if (this.empty()) throw new Error(this.NO_SUCH_EL);
    if (this.head === this.tail) this._head = this._tail = null as any;
    else {
      const second = this.head.next;
      this._head.next = null as any;
      this._head = second;
    }
    this._count--;
  }

  removeLast() {
    if (this.empty()) throw new Error(this.NO_SUCH_EL);
    if (this.head === this.tail) this._head = this._tail = null as any;
    else {
      const prev = this.previous(this.tail) as LinkedListNode<T>;
      prev.next = null as any;
      this._tail = prev;
    }
    this._count--;
  }

  contains(item: T): boolean {
    return this.indexOf(item) !== -1;
  }

  indexOf(item: T): number {
    let idx = 0;
    let current = this.head;
    while (current) {
      if (item === current.val) return idx;
      idx++;
      current = current.next;
    }
    return -1;
  }

  fromEnd(k: number) {}

  *[Symbol.iterator]() {
    let curr = this.head;
    while (curr) {
      yield curr.val;
      curr = curr.next;
    }
  }

  forEach(cb: (val: T, index: number) => void) {
    let id = 0;
    for (let data of this) {
      cb(data as T, id);
      id++;
    }
  }

  private previous(node: LinkedListNode<T>) {
    let current = this.head;
    while (current) {
      if (current.next === node) return current;
      current = current.next;
    }
    return null;
  }
}
