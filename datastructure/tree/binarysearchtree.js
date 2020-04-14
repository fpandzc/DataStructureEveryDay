// const { Node, BinaryTree } = require('./binarytree')

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

	// 添加search方法
	search(val) {
		function _search(root, val) {
			if (!root) {
				return null
			}

			if (root.value === val) {
				return root
			}

			if (root.right && val > root.value) {
				_search(root.right, val)
			}
			if (root.left && val < root.value) {
				_search(root.left, val)
			}
		}

		return _search(this.root, val)
	}

	// 添加删除节点delete方法

	// 分为三种情况

	// 1.目标节点没有子节点 2. 目标节点只有一个子节点 3. 目标节点有两个子节点

	deleteNode(val) {
		function _deleteNode(root, val) {
			if (!root) {
				return null
			}

			if (root.value === val) {
				// 当前节点是目标节点
				if (!root.left && !root.right) {
					root = null
				} else if (!root.left && root.right) {
					root = root.right
				} else if (root.left && !root.right) {
					root = root.left
				} else {
					// 如果有两个子节点 则需要找到右子树的最小节点作为待删除节点的替代者
					const min = getMin(root.right,root => {root = null})
					min.left = root.left
					min.right = root.right
					root = min
				}
			} else {
				root.value < val ? _deleteNode(root.right,val):_deleteNode(root.left,val)
			}
		}

		_deleteNode(this.root, val)
	}
}

function getMin(root,callback){
	if(!root){
		return null
	}

	if(!root.left){
		const res = {...root}
		callback || callback(root) // 找到最小值可以执行callback
		return res
	} else {
		return getMin(root.left, callback)
	}
}
const bst = new BinarySearchTree()
bst.insert(3)
bst.insert(2)
bst.insert(1)
bst.insert(5)
bst.insert(4)
bst.insert(7)
bst.insert(6)
bst.inOrderTraverse() // 1,2,3
bst.deleteNode(5)
bst.inOrderTraverse() 
