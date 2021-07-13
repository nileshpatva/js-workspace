export class Stack<T> {
  private items: T[];
  private count: number = 0;

  constructor(size: number) {
    this.items = new Array<T>(size);
  }

  push(item: T) {
    if (this.count === this.items.length)
      throw new Error('Stack Overflow Exception');

    this.items[this.count++] = item;
  }

  pop() {
    if (this.isEmpty()) throw new Error('Illegal State Exception');
    return this.items[--this.count];
  }

  peek() {
    if (this.isEmpty()) throw new Error('Illegal State Exception');
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  toString() {
    let arr = this.items.filter((_, id) => id < this.count);
    return arr.toString();
  }
}
