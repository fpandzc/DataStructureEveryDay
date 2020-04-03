// 学习目标
// 创建 队列 数据结构
// 队列是典型的 FIFO（先进先出） 数据结构。插入（insert）操作也称作入队（enqueue），新元素始终被添加在队列的末尾。
// 删除（delete）操作也被称为出队（dequeue)。 你只能移除第一个元素。

// 对于JS而言  队列可以继续使用js的array的特性偷懒  but 谁让我是一个事精呢
class Queue {
	constructor(maxLength) {
		this.item = new Array(maxLength) // 存放入队元素  初始化队伍大小
		this.head = 0 // 头部指针
		this.tail = 0 // 尾部指针
	}

	enqueue(el) {
		if (this.isFull()) return false // 达到队列最大值 返回false
		this.item[this.tail] = el
		this.tail++ // 尾部指针后移
		return true // 入队成功
	}

	dequeue() {
		if (this.isEmpty()) return null
		const res = this.item[this.head]
		this.item[this.head] = null // 这步操作可要可不要
		this.head++
		return res
	}

	// 把队列的状态逻辑都抽离成api
	isEmpty() {
		// 头部指针等于尾部指针代表队列为空
		return this.head === this.tail
	}

	isFull() {
		// 达到队列最大值
		return this.tail === this.item.length
	}
}

// 循环队列

//  可以看出来 上面实现的队列 当队列元素出栈时  它所留下的空位就没有元素可以顶替上去了

// 因为指针指过去就不会再回来了

// 那么循环队列就是当队列满了之后  如果队列前面有空位 元素又可以继续入队

// 因为可以循环使用出队元素留下的空位，所以之前判断队列是否满队的条件没办法继续使用

// 那么循环队列如何判断队列满队呢？

// 常规情况，当head -> 0 并且tail = maxLength时 队列满队
// head -> 非0位置时 head - 1 === tail指针
class CirculationQueue extends Queue {
	constructor(maxLength) {
		super(maxLength)
	}

	// 重写判断栈为满的情况
	isFull() {
		return (this.head === 0 && this.tail === this.item.length) || (this.head !== 0 && this.head - 1 === this.tail)
	}

	// 重新入栈方法
	enqueue(el) {
		if (this.isFull()) {
			return false
        } // 达到队列最大值 返回false 
        if(this.tail === this.item.length){
            // 如果队列没满 但是指针在最后面则重置指针
            this.tail = 0
        }
		this.item[this.tail] = el
		this.tail++ // 尾部指针后移
		return true // 入队成功
	}
}

// 测试循环队列 
const cq = new CirculationQueue(3)
cq.enqueue(1) // [1,,]
console.log(cq)
cq.enqueue(2) // [1,2,]
console.log(cq)
cq.enqueue(3) // [1,2,3]
console.log(cq)
cq.enqueue(4) // 无法插入
console.log(cq)
cq.dequeue() // [null,2,3]
console.log(cq)
cq.enqueue(4) // [4,2,3]
console.log(cq)
