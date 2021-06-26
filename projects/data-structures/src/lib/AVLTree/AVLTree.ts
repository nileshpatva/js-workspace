import { AVLNode } from './AVLNode';

export class AVLTree<T> {
  root: AVLNode<T>;

  constructor() {
    this.root = null as any;
  }

  public insert(val: T) {
    this.root = this.insertVal(this.root, val);
  }

  private insertVal(root: AVLNode<T>, val: T) {
    if (!root) return new AVLNode(val);

    if (val < root.val) {
      root.left = this.insertVal(root.left, val);
    } else {
      root.right = this.insertVal(root.right, val);
    }
    
    this.setHeight(root);

    return this.balance(root);
  }

  private balance(root: AVLNode<T>): AVLNode<T> {
    if (this.isLeftHeavy(root)) {
      if (this.balanceFacotor(root.left) < 0) { // left heavy tree
        root.left = this.rotateLeft(this.root.left);
      }
      return this.rotateRight(root);
    } else if (this.isRightHeavy(root)) { // Right heavy tree
      if (this.balanceFacotor(root.right) > 0) {
        root.right = this.rotateRight(root.right);
      }
      return this.rotateLeft(root);
    }
    return root;
  }

  private rotateLeft(root: AVLNode<T>) {
    const newRoot = root.right;

    root.right = newRoot.left;
    newRoot.left = root;

    this.setHeight(root);
    this.setHeight(newRoot);

    return root;
  }

  private rotateRight(root: AVLNode<T>) {
    const newRoot = root.left;

    root.left = newRoot.right;
    newRoot.right = root;

    this.setHeight(root);
    this.setHeight(newRoot);

    return root;
  }

  private setHeight(node: AVLNode<T>) {
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  private height(node: AVLNode<T>) {
    return !node ? -1 : node.height;
  }

  private isLeftHeavy(node: AVLNode<T>) {
    return this.balanceFacotor(node) > 1;
  }

  private isRightHeavy(node: AVLNode<T>) {
    return this.balanceFacotor(node) < -1;
  }

  private balanceFacotor(node: AVLNode<T>) {
    return !node ? 0 : this.height(node.left) - this.height(node.right);
  }
}
