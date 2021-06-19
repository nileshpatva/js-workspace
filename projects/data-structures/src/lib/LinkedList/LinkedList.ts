import { LinkedListNode } from './LinkedListNode';

export class LinkedList<T> {
  private readonly NO_SUCH_EL = `No such element in LinkedList`;
  private readonly ILLEGAL_STATE = `Illegal State Exception`;

  private _head: LinkedListNode<T>;
  /**
   * head of the LinkedList
   */
  get head() {
    return this._head;
  }

  private _tail: LinkedListNode<T>;
  /**
   * tail of the LinkedList
   */
  get tail() {
    return this._tail;
  }

  private _count: number = 0;
  /**
   * Total count of the elements of LinkedList
   */
  get count() {
    return this._count;
  }

  /**
   * Creates a LinkedList and returns it
   */
  constructor() {
    this._head = null as any;
    this._tail = null as any;
  }

  /**
   * Checks if LinkedList is empty or not
   * @returns boolean value
   */
  empty(): boolean {
    return this.count === 0;
  }

  /**
   * Adds element at the start of the LinkedList
   * @param item element to be added
   */
  addFirst(item: T) {
    const node = new LinkedListNode(item);

    if (this.empty()) this._head = this._tail = node;
    else {
      node.next = this.head;
      this._head = node;
    }
    this._count++;
  }

  /**
   * Adds element at the end of the LinkedList
   * @param item item to be added
   */
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

  /**
   * Performs removal of value at the begininng of a LinkedList
   */
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

  /**
   * Performs removal of value at the end of a LinkedList
   */
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

  /**
   * method check if item present in LinkedList or not
   * @param item value
   * @returns boolean value
   */
  contains(item: T): boolean {
    return this.indexOf(item) !== -1;
  }

  /**
   * function to get index of value in LinkedList
   * @param item value of node
   * @returns index of value in LinkedList
   */
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

  /**
   * returns k-th value from end of the LinkedList
   * @param k count from end
   * @returns value of k-the node from end
   */
  fromEnd(k: number) {
    if (this.empty()) throw new Error(this.ILLEGAL_STATE);
    if (this.count < k) throw new Error(this.ILLEGAL_STATE);

    let dist = k - 1;
    let first = this.head;
    let second = this.head;

    for (let i = 0; i < dist; i++) {
      second = second.next;
      if (second) throw new Error(this.ILLEGAL_STATE);
    }

    while (second !== this.tail) {
      first = first.next;
      second = second.next;
    }
    return first.val;
  }

  /**
   * returns k-th value from start of the LinkedList
   * @param k count from start
   * @returns value of k-th node from start
   */
  fromStart(k: number) {
    if (this.empty()) throw new Error(this.ILLEGAL_STATE);
    if (this.count < k) throw new Error(this.ILLEGAL_STATE);

    let curr = this.head;

    while (k > 1) {
      curr = curr.next;
      k--;
    }
    return curr;
  }

  /**
   * Implementation of interator function,
   * which makes this LinkedList iterable
   */
  *[Symbol.iterator]() {
    let curr = this.head;
    while (curr) {
      yield curr.val;
      curr = curr.next;
    }
  }

  /**
   * Performs the specified action for each element in an LinkedList
   * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the LinkedList.
   */
  forEach(callbackfn: (val: T, index: number, lList: LinkedList<T>) => void) {
    let id = 0;
    for (let data of this) {
      callbackfn(data as T, id, this);
      id++;
    }
  }

  /**
   * converts LinkedList into an array and returns it
   * @returns array of LinkedList item values
   */
  toArray(): T[] {
    let arr: T[] = [];
    for (let val of this) {
      arr.push(val);
    }
    return arr;
  }

  /**
   * Returns a string representation of a LinkedList
   * @returns string value
   */
  toString() {
    return this.toArray().toString();
  }

  /**
   * method to get previous node
   * @param node node whose previous node is required
   * @returns previous node
   */
  private previous(node: LinkedListNode<T>) {
    let current = this.head;
    while (current) {
      if (current.next === node) return current;
      current = current.next;
    }
    return null;
  }
}
