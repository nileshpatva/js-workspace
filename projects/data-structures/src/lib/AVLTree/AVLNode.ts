export class AVLNode<T> {
  height: number;
  left: AVLNode<T>;
  right: AVLNode<T>;
  constructor(public val: T) {
    this.left = null as any;
    this.right = null as any;
    this.height = 0;
  }
}
