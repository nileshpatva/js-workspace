import { TreeNode } from './TreeNode';

export class Tree<T> {
  root: TreeNode<T>;

  constructor() {
    this.root = null as any;
  }

  insert(value: T): void {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;

    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  }

  find(value: T): boolean {
    return !!this.lookup(value);
  }

  // just to mesh with BST for validate function
  swapRoot() {
    let temp = this.root.left;
    this.root.left = this.root.right;
    this.root.right = temp;
  }

  private lookup(value: T): TreeNode<T> | null {
    let current = this.root;

    while (current !== null) {
      if (current.value === value) return current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }
}
