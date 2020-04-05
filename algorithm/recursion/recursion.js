// 学习目标

// 递归

// 递归是一种解决问题的有效方法，在递归过程中，函数将自身作为子例程调用

// 递归是一种思想 将问题拆分成它的子问题 直到子问题无需进一步递归就可以解决的地步

// 为了使递归不无限循环，递归应具备以下属性：

// 1. 递归边界 能够让函数终止的条件 2. 递推关系  能够将问题拆分成子问题的一组规则

// 在之前链表的js中 用到了三次递归 都具备以上的属性

// 第一个问题: 以相反的顺序打印字符串。

// 这个问题用循环可以轻易解决 但是如何用递归解决？

// 将问题分成两步 递 的过程 我们不断把str[0 -> n-1]传到子函数中 直到最后一个字符

// 然后 输出 子函数不断出栈 ，这样就形成了归
function printReverse(str) {
	let i = 0
	function _reverse(s) {
		if (!s) {
			return
		}
		_reverse(str[i++]) // 只要str[i]存在就把str[i+1] 递下去
		console.log(s) // 当最后的函数调用结束 会依次出栈执行打印 就形成了 归
	}

	if (str) {
		_reverse(str[i])
	}
}
const str = 'dcba'

printReverse(str)

// 反转字符串

// 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

// 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

// 其实就是反转数组

var reverseString = function (s) {
	let index = 0
	function _reverse() {
		if (index == Math.floor(s.length / 2)) {
			return
		}

		// 当指针还没到数组的一半时 就对换相对应两个元素的位置 同时指针后移 继续递归
		;[s[index], s[s.length - index - 1]] = [s[s.length - index - 1], s[index]]
		index++
		_reverse()
	}

	_reverse()
}

const s = ['h', 'e', 'l', 'l', 'o']
reverseString(s)

// 交换链表节点问题

// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

// 例如 给定 1->2->3->4, 你应该返回 2->1->4->3.

// 思路  假定一个函数swap(head,head.next)是交换这两个节点 那么交换完之后继续交换head.next后面两个节点

// 直到链表元素全部交换完毕

var swapPairs = function (head) {
	function swap(node) {
		if(!node || !node.next){
			return node
		}
		// 交换节点时需要注意 链表不同于数组

		// 保存next 节点
		const next = node.next 
		// 将第一个节点的next指向直接'跳过'next
		node.next = next.next 
		// 再将next.next指向指向Node 就实现node 和 next对换了
		next.next = node 
		
		// 递归边界
		if(!next.next.next){
			head = next // 将next 指针交给head
			return head 
		}
		// 在'归'的过程 修正head指针
		next.next.next = swap(next.next.next)
		head = next 
		return head
	}

	if (!head || !head.next) {
		return head
	}
	swap(head)
	return head
}

// 借用一下之前链表的节点构造函数
class Node {
	constructor(value) {
		this.value = value // 存放当前链表值
		this.next = null // 指向下一个节点的指针
	}
}

const nodeList = [1, 2].map((item) => {
	return new Node(item)
})
nodeList.forEach((node, index) => {
	node.next = nodeList[index + 1]
})
console.log(swapPairs(nodeList[0]))