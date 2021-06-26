import { AVLTree } from './lib/AVLTree';
import { Tree, TreeNode } from './lib/Tree';

//#region Tree
const tree = new Tree();

tree.insert(7);
tree.insert(4);
tree.insert(9);
tree.insert(1);
tree.insert(6);
tree.insert(8);
tree.insert(10);

/**
 * BREADTH FIRST or LEVEL ORDER Traversal
 * traversing the tree level by level
 */

// function levelOrderTraversal(root: TreeNode<unknown>) {
//   if (!root) return;
//   levelOrderTraversal(root.left);
//   console.log(root.value);
//   levelOrderTraversal(root.right);
// }

/**
 * DEPTH FIRST
 *
 * 1. Pre-Order  => ROOT -> left  -> right
 * 2. In-Order   => left -> ROOT  -> right ---> gives node values in ascending order - BST
 * 3. Post-Order => left -> right -> ROOT
 */
function preOrderTraversal(root: TreeNode<unknown>) {
  if (!root) return;
  console.log(root.value);
  preOrderTraversal(root.left);
  preOrderTraversal(root.right);
}
preOrderTraversal(tree.root);

function inOrderTraversal(root: TreeNode<unknown>) {
  if (!root) return;
  inOrderTraversal(root.left);
  console.log(root.value);
  inOrderTraversal(root.right);
}
inOrderTraversal(tree.root);

function postOrderTraversal(root: TreeNode<unknown>) {
  if (!root) return;
  postOrderTraversal(root.left);
  postOrderTraversal(root.right);
  console.log(root.value);
}
postOrderTraversal(tree.root);

function heightOfTree(root: TreeNode<unknown>): number {
  if (!root) return 0;

  return 1 + Math.max(heightOfTree(root.left), heightOfTree(root.right));
}
console.log(heightOfTree(tree.root));

function isLeaf(root: TreeNode<unknown>): boolean {
  return !root.left && !root.right;
}

// for Binary Search Tree
// Time Complexity ->  O(log(N))
function minOfBST(root: TreeNode<number>): number {
  if (!root) {
    throw new Error('Illegal State Exception');
  }
  let current = root;
  while (current) {
    if (!current.left) return current.value;
    current = current.left;
  }

  return 0;
}
minOfBST(tree.root as TreeNode<number>);

// Binary Tree - not for BST - Binary Search Tree
// Time Complexity -> O(N)
function minVal(root: TreeNode<number>): number {
  if (isLeaf(root)) return root.value;

  const left = minVal(root.left);
  const right = minVal(root.right);

  return Math.min(root.value, Math.min(left, right));
}

minVal(tree.root as TreeNode<number>);

function equals(rootA: TreeNode<number>, rootB: TreeNode<number>): boolean {
  // both the nodes are null so return true;
  if (!rootA && !rootB) return true;
  // both the nodes are not null
  if (rootA && rootB)
    return (
      rootA.value === rootB.value &&
      equals(rootA.left, rootB.left) &&
      equals(rootA.right, rootB.right)
    );
  // either of the nodes are null
  return false;
}

console.log(equals(tree.root as any, tree.root as any));

function isBinarySearchTree(
  root: TreeNode<number>,
  min: number,
  max: number
): boolean {
  if (!root) return true;

  // out of range for BSTs
  if (root.value < min || root.value > max) {
    return false;
  }

  return (
    isBinarySearchTree(root.left, min, root.value - 1) &&
    isBinarySearchTree(root.right, root.value - 1, max)
  );
}

tree.swapRoot(); // now not a BST

console.log(isBinarySearchTree(tree.root as any, -Infinity, Infinity));

function nodesAtDistance(
  root: TreeNode<any>,
  distance: number,
  list: Array<any> = []
) {
  if (!root) return list;
  if (distance === 0) list.push(root.value);

  nodesAtDistance(root.left, distance - 1, list);
  nodesAtDistance(root.right, distance - 1, list);

  return list;
}

console.log(nodesAtDistance(tree.root, 2));

function levelOrderTraversal(root: TreeNode<any>) {
  for (let i = 0; i <= heightOfTree(root); i++) {
    for (let node of nodesAtDistance(root, i)) {
      console.log(node);
    }
  }
}

levelOrderTraversal(tree.root);

function LowestCommonAncestor(
  root: TreeNode<any>,
  n1: number,
  n2: number
): TreeNode<any> | null {
  if (!root) return root;
  if (root.value === n1 || root.value === n2) return root;
  let left = LowestCommonAncestor(root.left, n1, n2);
  let right = LowestCommonAncestor(root.right, n1, n2);
  if (left && right) return root;
  if (!left && !right) return null;
  if (left) {
    return LowestCommonAncestor(root.left, n1, n2);
  } else {
    return LowestCommonAncestor(root.right, n1, n2);
  }
}

function getLevel(root: TreeNode<any>, k: number, level: number): number {
  if (!root) return -1;
  if (root.value === k) return level;
  const left = getLevel(root.left, k, level + 1);
  return left !== -1 ? left : getLevel(root.right, k, level + 1);
}
function findDistance(root: TreeNode<any>, a: number, b: number) {
  let lca = LowestCommonAncestor(root, a, b);
  let dist1 = getLevel(lca as any, a, 0);
  let dist2 = getLevel(lca as any, b, 0);
  return dist1 + dist2;
}
console.log(findDistance(tree.root, 4, 10))

//#endregion Tree

//#region  AVLTree

const avlTree = new AVLTree();

avlTree.insert(5);
avlTree.insert(6);
avlTree.insert(7);
avlTree.insert(10);

console.log(avlTree);
//#endregion AVLTree
