export class LinkedListNode<T> {
  public next: LinkedListNode<T>;

  constructor(public val: T) {
    this.next = null as any;
  }
}
