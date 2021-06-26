export class Queue {
  private count = 0;
  private rear = 0;
  private front = 0;

  private list: number[];

  constructor(capacity: number) {
    this.list = new Array(capacity);
  }

  enqueue(item: number) {
    if (this.isFull()) {
      throw new Error('Queue is full');
    }
    this.list[this.rear] = item;

    this.rear = (this.rear + 1) % this.list.length;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Illegal State Exception');
    }

    const item = this.list[this.front];
    this.list[this.front] = 0;
    this.front = (this.front + 1) % this.list.length;
    this.count--;
    return item;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.list[this.front];
  }

  isFull() {
    return this.count === this.list.length;
  }

  isEmpty() {
    return this.count === 0;
  }
}
