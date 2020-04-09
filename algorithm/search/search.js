// 学习目标

// 二分查找(最简单版本)

// 如何在一个10000长度不存在重复元素且有序的数组(足够长，有序 且不存在重复)内快速的查找一个值？

// 顺序遍历的话 则需要执行10000次比较 有没有更快的方法呢

const binarySearch = function(array, value){
    const len = array.length

    if(len < 1){
        return -1 // 表示不存在
    }

    function search(array, left, right){
        const mid = Math.floor( (left + right) / 2) // 中间指针

        if(value < array[mid]){ // 如果比中间值小  我们就递归左边的
            search(array, left, mid - 1)
        } else if (value > array[mid]){ // 如果比中间值大  我们就递归右边的
            search(array, mid + 1, right)
        } else {
            return mid
        }
    }
    
    return search(array, 0, len)
}


console.log(binarySearch([1,2,3,4,5,6],4))
console.log(binarySearch([1,2,3,4,5],3))

