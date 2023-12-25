const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
      return;
    }

    let current = this._root;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else if (data > current.data) {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      } else {
        // if data is equal to current.data, decide how to handle (e.g., ignore or handle as duplicate)
        break;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data === node.data) {
      // Node to be deleted found

      // Case 1: Node has no children
      if (!node.left && !node.right) {
        return null;
      }

      // Case 2: Node has one child (left or right)
      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      // Case 3: Node has two children
      const temp = this._findMinNode(node.right);
      node.data = temp.data;
      node.right = this._removeNode(node.right, temp.data);

    } else if (data < node.data) {
      node.left = this._removeNode(node.left, data);
    } else {
      node.right = this._removeNode(node.right, data);
    }

    return node;
  }

  _findMinNode(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  min() {
    const minNode = this._findMinNode(this._root);
    return minNode ? minNode.data : null;
  }

  _findMaxNode(node) {
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current;
  }

  max() {
    const maxNode = this._findMaxNode(this._root);
    return maxNode ? maxNode.data : null;
  }
}



module.exports = {
  BinarySearchTree
};