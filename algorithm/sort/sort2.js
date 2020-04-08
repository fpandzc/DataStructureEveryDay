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

//

const quickSort = (array) => {
	return quick(array, 0, array.length - 1)
}

function quick(array, left, right) {
	let index 
	if (array.length > 1) {
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

function partition(array, left, right){
	const pivot = array[Math.floor((right + left) / 2)]
	let i = left
	let j = right

	while( i <= j){
		while (array[i] < pivot) {
			i++
		}
		while (array[j] > pivot) {
			j--
		}

		if(i <= j){
			[array[i],array[j]] = [array[j],array[i]] 
			j--
			i++
		}
	}

	return i
}

console.log(quickSort([5, 4, 1, 3, 2, 7, 6, 9, 8]))
