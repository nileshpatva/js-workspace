export class TreeNode<T> {
  public value: T;
  public left: TreeNode<T>;
  public right: TreeNode<T>;

  constructor(value: T) {
    this.value = value;
    this.left = null as any;
    this.right = null as any;
  }

  toString() {
    return `Node=${this.value}`;
  }
}
