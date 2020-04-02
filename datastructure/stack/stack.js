// 学习目标
// 创建 栈 数据结构

// 栈是一种遵从后进先出（ LIFO）原则的有序集合。
// 新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。

class Stack{
    constructor(){
        // 通过数组来实现栈
        this.item = []
    }

    // 添加入栈Push方法
    push(el){
        // 返回栈的长度
        return this.item.push(el)
    }

    // 添加出栈pop方法
    pop() {
        // 返回出栈元素
        return this.item.pop() 
    }

    // 查看栈顶元素
    peek(){
        return this.item[this.item.length - 1]
    }

    // 检查栈是否为空
    isEmpty(){
        return this.item.length === 0
    }

    // 清空栈
    clear(){
        this.item = []
    }
}

// 通过栈解决问题
// 如何将10进制转换成二进制

// 例如 10 -> 1010  10 % 2 -> 0, 5 % 2 -> 1, 2 % 2 -> 0, 1 % 2 -> 1  

const decimalToBinary = decNumber => {
    const baseNumber = 2 // 基数
    const remainderStack = new Stack() // 余数栈
    let quotient = decNumber// 商
    let binaryStr = ''
    while(quotient > 0){ // 当商大于0时就一直循环
        let remainder = Math.floor(quotient % baseNumber) // 向下取整
        quotient = Math.floor(quotient / baseNumber) 
        remainderStack.push(remainder)
    }

    // 输入栈
    while(!remainderStack.isEmpty()){
        binaryStr += remainderStack.pop().toString()
    }

    return binaryStr
}

const num = 10

console.log(decimalToBinary(num)) // 输出结果1010

// 最小栈  
class MinStack extends Stack {
    constructor() {
        super() // 继承父类 存放元素的栈
        this.helper = [] // 辅助栈 用来存放最小值 
    }

    // 扩展父类的push方法
    push(el){
        // 如果辅助栈为空 或者el小于栈顶元素则更新辅助栈
        if(this.helper.length === 0 || el < this.helper[this.helper.length - 1]){
            this.helper.push(el)
        }
        super.push(el)
    }

    pop(){
        const el = super.pop()
        // 最小元素出栈时 辅助栈同步出栈更新最小值
        if(el === this.helper[this.helper.length - 1]){
            this.helper.pop()
        }
    }

    getMin(){
        return this.helper[this.helper.length - 1]
    }
}

const minStack = new MinStack()
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   // 返回 -3.
minStack.pop();
minStack.peek();     // 返回 0.
minStack.getMin();  // 返回 -2.
