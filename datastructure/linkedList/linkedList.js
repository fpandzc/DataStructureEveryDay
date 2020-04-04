// 学习目标

// 单链表

// 单链表中的每个结点不仅包含值，还包含链接到下一个结点的引用字段。

// 通过这种方式，单链表将所有结点按顺序组织起来。

class Node {
	constructor(value) {
		this.value = value // 存放当前链表值
		this.next = null // 指向下一个节点的指针
	}
}

// 辅助函数 获得链表的最后一个节点
function getNext(node) {
	if (!node.next) {
		return node // 递 的过程找到最后一个节点
	}
	return getNext(node.next) // 归的过程一步一步把最后一个节点返回
}
// 辅助函数  找到node节点之后index位置的节点
function getNode(node, index) {
	if (index === 0) {
		// 递归边界
		return node
	}
	if (node.next) {
		index--
		return getNode(node.next, index)
	}

	return null
}

class LinkedList {
	constructor() {
		this.count = 0 // 链表长度
		this.head = null // 头部指针
	}

	// 向 链表添加元素 分为两种
	// 1.直接添加到链表尾部
	push(el) {
		const node = new Node(el)
		if (this.count === 0) {
			this.head = node
		} else {
			const lastNode = getNext(this.head) // 这里也可以用循环来找最后一个结点
			lastNode.next = node
		}
		return ++this.count // 返回链表长度
	}

	//  2.向指定位置添加元素
	insert(el, index) {
		// 检查index是否合法
		if (index < 0) {
			return false // 返回false 表示插入失败
		}

		// 做一个宽松处理  如果超过链表长度 直接向链表最后添加元素
		if (index >= this.count) {
			return this.push(el)
		}

		const node = new Node(el)
		const current = getNode(this.head, index) // 拿到待插入的节点
		const next = current.next
		current.next = node
		node.next = next
		return ++this.count
	}

	// 把链表的添加封装成一个api
	add(el, index) {
		return index ? this.insert(el, index) : this.push(el)
	}

	// 删除节点
	remove(index) {
		// 检查index是否合法
		if (index < 0 || index > this.count) {
			return false // 返回false 表示删除失败
		}

		if (this.count === 0) {
			return false // 链表无元素 也直接返回false
		}

		let current = this.head // 当前节点指针
		let previous = null // 前一个节点
		for (; index > 1; index--) {
			// 只需要循环index -1 次 因为current 一开始就指向第一个节点了
			if (!current.next) {
				break
			}
			previous = current
			current = current.next
		}
		// 此时指针已指向待删除元素
		previous.next = current.next
		this.count--
	}
}

const ll = new LinkedList()
ll.push(1) //  1
ll.push(2) // 1 -> 2
ll.push(3) // 1 -> 2 -> 3
ll.remove(3) // 删除第3个节点 1 -> 2
ll.remove(3) // 删除第3个节点 但是因长度超过 所以应该删除不了 1 -> 2
ll.insert(1.5, 0) // 在index为0的节点后插入1.5这个节点 1 -> 1.5 -> 2
console.log(ll)

// 检测链表中是否存在环

// 思路  利用双指针 快慢指针  q,s  而快指针 等于 慢指针时表示链表中有环

// 可以类比两个人在环形跑道跑步 在n圈后 快的总会与慢的再次相遇

// 假设在l长度，环长度为d的链表下，一定的循环次数n中,快指针q经过的节点数qn = q*n ,

// 而q指向的节点index: qi = (qn - (l -d)) % d

// 同理 sn = s*n，si = (sn - (l - d)) % d 当指针相遇时 即指针指向同一个节点si = qi时 链表有环

// 可以得到 (q * n - (l - d)) % d = (s * n - (l - d)) % d, 所以n 等于整数倍 d 即可

const nodeList = [3, 2 ,0 ,-4].map(item => {
    return new Node(item)
})
nodeList.forEach((node,index) => {
    node.next = nodeList[index + 1]
})

nodeList[3].next = nodeList[1]

console.log(nodeList[0])

let count = 0
function hasCycle(head) {
	let q = head, // 快指针
        s = head // 慢指针
    
    // 更新一次指针 
    function move(q,s){  
        // 如果节点不存在
        if(!q && !s){
            return false // 不存在环
        }
        // 如果下个节点不存在
        if(!q.next || !s.next){
            return false // 不存在环
        }
        // 如果下下个节点不存在
        if(!q.next.next){
            return false // 不存在环
        }

        q = q.next.next 
        s = s.next 

        return q === s ? true:move(q,s)
    }    

    return move(q,s)
}

console.log(hasCycle(nodeList[0]))