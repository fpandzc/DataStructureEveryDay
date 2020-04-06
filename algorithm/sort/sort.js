// 学习目标

// 排序算法 (默认从小到大)

// 简单的排序算法  冒泡排序

// 冒泡排序的思路  比较相邻的两个项 如果不符合排序 就交换这两个元素 直到数组排序完毕

const bubbleSort = (array) => {
	const len = array.length

	if (len < 2) {
		return array
	}

	// 控制 外层循环 的次数 只需要遍历到len - 1,a[len -1 ]会与相邻的a[len]比较
	for (let i = 0; i < len - 1; i++) {
		// 内层循环用来比较大小  每一次外层循环 都会让一个元素冒泡到对应位置上

		// 所以就有i 个元素是已经排好序的了  那么内层循环只需要比较未排序好的元素

		// 也就是len - 1 -i
		for (let j = 0; j < len - 1 - i; j++) {
			if (array[j] > array[j + 1]) {
				// 相邻元素比较, 不符合排序就交换
				[array[j], array[j + 1]] = [array[j + 1], array[j]]
			}
		}
	}

	return array
}

// 涉及到算法我们就需要分析 复杂度

// 可以看到我们并未申请额外的存储变量的空间

// ,仅仅只是申明了i,j用来控制循环, 所以空间复杂度应该为O(1)

//  时间复杂度 已经很明显了  两个循环 一个为n (len - 1) ,一个为n  - i ,i是常量

// 所以时间复杂度为O(n^2)

console.log(bubbleSort([5, 4, 1, 3, 2]))

// 插入排序

// 插入排序的思想 是 将未排序好的元素 依次正确的插入到 已排序好的数组中

// 对于插入排序而言  要正确的理解 已排序分区 和未排序分区

const insertionSort = (array) => {
	const len = array.length

	if (len < 2) {
		return array
	}

	// 外层循环  用来控制要插入 已排序分区的元素 默认第一项是已排序分区
	// 所以从第二项元素开始循环
	for (let i = 1; i < len; i++) {
		// 拿到 待插入的元素
		const value = array[i]
		// i前面的数组都是已排序分区
		let j = i - 1
		for (; j >= 0; j--) {
			// 如果已排序分区 出现比value大的值  我们将元素后移 给value腾出空位
			if (array[j] > value) {
				array[j + 1] = array[j]
			} else {
				// 如果array[j]比value小就可以直接跳出循环
				// 因为array[j-1 -> 0]都是比array[j]小的值
				break
			}
		}

		// 此时已经比较完毕  把vale插入到腾出的空位中
		// array[j] <= value时 跳出循环说明value应在array[j]后面的空位上
		array[j + 1] = value
	}

	return array
}

// 同样 插入排序也是原地排序 时间复杂度也是O(n^2)

console.log(insertionSort([5, 4, 1, 3, 2]))

// 选择排序

// 选择排序的思想  和插入排序有一些地方很相似

// 它也存在已排序分区和未排序分区

// 顾名思义  选择 排序就是选择元素进行交换排序

// 已知数组最后排完序 最小值一定在数组的最前面  那么我们从数组中挑出最小值与数组第一位交换

// 交换后 继续对未排序分区进行选择交换 直到数组全部排完序 是不是有点选择内味了？

const selectorSort = (array) => {
	const len = array.length

	if (len < 2) {
		return array
	}

	// 从i开始的地方都表示未排序分区,假设第一位已经是最小值了
	for (let i = 0; i < len; i++) {
		let j = i + 1
		// 遍历i 之后的元素 查找是否是有比array[i]小的值
		for (; j < len; j++) {
			// 如果有就交换更新最小值
			if (array[j] < array[i]) {
				;[array[j], array[i]] = [array[i], array[j]]
			}
		}
	}

	return array
}

console.log(selectorSort([5, 4, 1, 3, 2]))

// 选择排序的缺点  不稳定

// 什么叫做不稳定？

// 对相同的元素进行排序  排完序之后他们的相对位置不发生变化 那么这个排序算法就是稳定的

// 但是选择排序 很明显不稳定 假设对[5(0),4,5(1),3,2,1]数组进行排序

// (0),(1),仅仅是做个标记 他们的值还是5

// 第一次排序会把5(0)交换到最后，再进行排序时已经没有值比5(1)大了 所以等数组排好序后

// 然后5(1)会一直在5(0)前面  然而我们想要的则是他们的相对位置不变  所以选择排序时不稳定的
