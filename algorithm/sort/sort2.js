// 学习目标

// 实用的排序算法 归并排序与快速排序

// 归并排序

// 归并排序的思想 归并利用分治的思想 将数组分到最小单位  然后合起来的时候我们对最小单位进行排序

const mergeSort = (array) => {
	const len = array.length

	if (len < 2) {
		return array
	}

	const mid = Math.floor(len / 2) // 数组中间下标

	const l = mergeSort(array.slice(0, mid)) // 递归 左边的数组
	const r = mergeSort(array.slice(mid)) // 递归右边的数组

	// 当递归结束进行合并同时进行排序
	array = merge(l, r)
	return array
}

function merge(l, r) {
	const array = []
	let i = 0 // 左边数组的指针
	let j = 0 // 右边数组的指针
	while (i < l.length && j < r.length) {
		if (l[i] < r[j]) {
			array.push(l[i])
			i++
		} else {
			array.push(r[j])
			j++
		}
	}
	return i < l.length ? array.concat(l.slice(i)) : array.concat(r.slice(j)) // 剩下没比完的元素都丢到数组最后面
}

console.log(mergeSort([5, 4, 1, 3, 2, 7, 6, 9, 8]))

// 快速排序

// 快速排序的思想  快排是选择排序的优化版  所以他也是不稳定的  

// 选择排序是利用最小值与其他元素比较 进行排序  而快排 则需要一个主元pivot

// 利用分治的思想 每次将比主元小的元素排到左边（但不一定有序）大的元素排到右边 直到这个数组分到最小的时候

// 因为左边只有一个元素  所以一定有序 最后递归结束 数组也排序完成

const quickSort = (array) => {
	// 用来递归的函数
 	function quick(array, left, right) { 
		let index  
		if (array.length > 1) {
			// 将数组分区 每一次分区完成后index左边一定比array[index]小
			index = partition(array, left, right) 
			if (left < index - 1) {
				quick(array, left, index - 1) 
			}
			if (index < right) {
				quick(array, index, right) 
			}
		}
		return array
	}

	return quick(array, 0, array.length - 1)
}

function partition(array, left, right){
	const pivot = array[Math.floor((right + left) / 2)] // 不一定要中间，也可以是随机的元素  
	let i = left // 左边的指针
	let j = right // 右边的指针 

	while( i <= j){
		while (array[i] < pivot) {
			// 找到左边比主元大的元素时就停止
			i++
		}
		while (array[j] > pivot) {
			// 找到右边比主元小的元素时就停止
			j--
		}

		if(i <= j){
			// 交换这两个值
			[array[i],array[j]] = [array[j],array[i]] 
			j--
			i++
		}
	}

	// 直到左边指针超过右边指针 

	return i
}

console.log(quickSort([5, 4, 1, 3, 2, 7, 6, 9, 8]))
