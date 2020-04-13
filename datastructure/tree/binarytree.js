// 学习目标

// 二叉树

// 二叉树是每个节点最多有两个子树的树结构

class Node {
	constructor(value) {
		this.value = value // 值
		this.left = null // 左节点
		this.right = null // 右节点
	}
}

class BinaryTree {
	constructor() {
		this.root = null
	}

	// insert 向二叉树插入节点
	insert(value) {
		const node = new Node(value)

		if (!this.root) {
			return (this.root = node)
		}
		function _insert(root, node) {
			if (!root.left) {
				return (root.left = node)
			}
			if (!root.right) {
				return (root.right = node)
			}

			// 否则检查子节点的孩子节点是否还有空位
			if (!root.left.left || !root.left.right || (root.left.left && root.left.right && root.right.left && root.right.right)) {
				// 如果左节点的孩子节点还有空位 或者 左节点的孩子节点满了同时右节点的孩子节点也满了
				_insert(root.left, node)
			} else {
				_insert(root.right, node)
			}
		}

		_insert(this.root, node)
	}

	// 遍历节点
	// 前序遍历首先访问根节点，然后遍历左子树，最后遍历右子树。
	preOrderTraverse() {
		function _preOrderTraverse(root) {
			if (!root) {
				return
			}
			console.log(root.value) // 这一步可以替换成其他操作 相当于执行提供的callback
			_preOrderTraverse(root.left) // 再访问左子树 直到左子树没有
			_preOrderTraverse(root.right) // 再访问右子树
		}

		_preOrderTraverse(this.root)
	}

	// 中序遍历是先遍历左子树，然后访问根节点，然后遍历右子树。
	inOrderTraverse() {
		function _inOrderTraverse(root) {
			if (!root) {
				return
			}
			_inOrderTraverse(root.left) // 再访问左子树 直到左子树没有
			console.log(root.value) // 这一步可以替换成其他操作 相当于执行提供的callback
			_inOrderTraverse(root.right) // 再访问右子树
		}

		_inOrderTraverse(this.root)
	}
	// 后序遍历是先遍历左子树，然后遍历右子树，最后访问树的根节点。
	postOrderTraverse() {
		function _postOrderTraverse(root) {
			if (!root) {
				return
			}
			_postOrderTraverse(root.left) // 再访问左子树 直到左子树没有
			_postOrderTraverse(root.right) // 再访问右子树
			console.log(root.value) // 这一步可以替换成其他操作 相当于执行提供的callback
		}

		_postOrderTraverse(this.root)
	}
	//层序遍历就是逐层遍历树结构。

	// 广度优先搜索是一种广泛运用在树或图这类数据结构中，遍历或搜索的算法。

	// 该算法从一个根节点开始，首先访问节点本身。

	// 然后遍历它的相邻节点，其次遍历它的二级邻节点、三级邻节点，以此类推。

	// 当我们在树中进行广度优先搜索时，我们访问的节点的顺序是按照层序遍历顺序的。

	levelOrder() {
		const res = [] // 存放遍历结果
		let queue = [] // 存放下一次遍历的节点
		let index = 0 // 用来记录层数
		if (this.root) {
			queue.push(this.root)
		}

		function _levelOrder() {
			if (queue.length === 0) {
				return
			}
			const temp = []
			res[index] = []
			while (queue.length > 0) {
				const node = queue.shift()
				res[index].push(node.value)

				if (node.left) {
					temp.push(node.left)
				}
				if (node.right) {
					temp.push(node.right)
				}
			}

			if (temp.length > 0) {
                index++
                queue = temp
				_levelOrder()
			}
		}

		_levelOrder()
		return res
	}
}

const bt = new BinaryTree()
bt.insert(1)
bt.insert(2)
bt.insert(3)
bt.insert(4)
bt.insert(5)
bt.insert(6)
bt.insert(7)
bt.insert(8)
// console.log(bt)
// bt.preOrderTraverse()
// bt.inOrderTraverse()
// bt.postOrderTraverse()
// console.log(bt.levelOrder())

module.exports = {
	Node,
	BinaryTree
}