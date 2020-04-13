const { Node, BinaryTree } = require('./binarytree')

// 学习目标

// 二叉搜索树

// 二叉搜索树有一种存在一定规则的树  树的左节点一定比父节点小  右节点一定比父节点大
console.log(BinaryTree)
class BinarySearchTree extends BinaryTree {
	constructor() {
		super()
	}

	// 重写insert方法
	insert(val) {
		if (!this.root) {
			return (this.root = new Node(val))
		}
		function _insert(root) {
			if (!root) {
				return
			}

			if (val > root.value) {
				return root.right ? _insert(root.right) : (root.right = new Node(val))
			} else {
				return root.left ? _insert(root.left) : (root.left = new Node(val))
			}
		}

		_insert(this.root)
	}
}
const bst = new BinarySearchTree()
bst.insert(1)
bst.insert(2)
bst.insert(3)
bst.inOrderTraverse() // 1,2,3
