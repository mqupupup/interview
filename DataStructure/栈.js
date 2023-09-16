// 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
const leftToRight = {
    "(":")",
    "[":"]",
    "{":"}"
}

const isValid = function (str) {
    if(!str) return true;
    const stack = [];
    const len = str.length;
    for(let i = 0; i < len;i++){
        const char = str[i];
        if(char === "(" || char === "[" || char === "{") stack.push(leftToRight[char]);
        else {
            if(!stack.length || stack.pop() !== char)
                return false;
        }
    }
    return !stack.length

}


// 题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
const dailyTemperatures = function (T) {
    let len = T.length;
    const stack = [];
    const res = (new Array(len).fill(0));
    for(let i = 0; i < len; i++){
        while(stack.length && T[i] > T[stack[stack.length - 1]]){
            const top = stack.pop();
            res[top] = i - top;
        }
        stack.push(i);
    }
    return res;

}


// 题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

const MinStack = function() {
    this.stack = [];
}
MinStack.prototype.push = function (x) {
    this.stack.push(x);
}

MinStack.prototype.pop = function () {
    this.stack.pop();
}

MinStack.prototype.top = function () {
    if(!this.stack && this.stack.length) {
        return
    }
    return this.stack[this.stack.length - 1];
}

MinStack.prototype.getMin = function () {
    let min = Infinity;
    const stack = this;
    for(let i = 0;i < stack;i++){
        if(stack[i] < min)
            min = stack[i];
    }
    return min;
}


const MinStack1 = function () {
    this.stack1 = [];
    this.stack2 = [];
}

MinStack1.prototype.push = function (x) {
    this.stack1.push(x);
    if(this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= x){
        this.stack2.push(x);
    }
}

MinStack1.prototype.pop = function (){
    if(this.stack1.pop() === this.stack2[this.stack2.length - 1]) {
        this.stack2.pop();
    }
}

MinStack1.prototype.top = function () {
    return this.stack1[this.stack1.length - 1];
}

MinStack1.prototype.getMin = function () {
    return this.stack2[this.stack2.length - 1];
}


// 如何用栈实现一个队列？

const MyQueue = function () {
    this.stack1 = [];
    this.stack2 = [];
}
MyQueue.prototype.push = function (x) {
    this.stack1.push(x);
}

MyQueue.prototype.pop = function () {
    if(this.stack2.length <= 0){
        while(this.stack1.length !== 0){
            this.stack2.push(this.stack1.pop());
        }
    }
    return this.stack2.pop();
}

MyQueue.prototype.peek = function () {
    if(this.stack2.length <= 0) {
        while(this.stack1.length !== 0) {
            this.stack2.push(this.stack1.pop());
        }
    }
    const stack2Len = this.stack2.length;
    return stack2Len && this.stack2[stack2Len - 1];
}

MyQueue.prototype.empty = function () {
    return !this.stack1.length && !this.stack2.length;
}


//双端队列就是允许在队列的两端进行插入和删除的队列。
/*const queue = [1,2,3,4] // 定义一个双端队列
queue.push(1) // 双端队列尾部入队
queue.pop() // 双端队列尾部出队
queue.shift() // 双端队列头部出队
queue.unshift(1) // 双端队列头部入队*/


/*滑动窗口问题
题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。*/
const maxSlidingWindow = function (nums, k) {
    const len = nums.length;
    const res = [];
    let left = 0;
    let right = k - 1;
    while(right < len) {
        const max = calMax(nums, left, right);
        res.push(max);
        left++;
        right--;
    }
    return res;
}
function  calMax(arr,left,right) {
    if(!arr || !arr.length) return;
    let maxNum = arr[left];
    for(let i = left;i <= right;i++) {
        if(arr[i] > maxNum)
            maxNum = arr[i];
    }
    return maxNum

}

// 双端队列解法
const maxSlidingWindow1 = function (nums,k) {
    const len = nums.length;
    const res = [];
    const deque = [];
    for(let i = 0;i < len;i++){
        while(deque.length && nums[deque[deque.length-1]] < nums[i]) {
            deque.pop();
        }
        deque.push(i)
        // 当队头元素的索引已经被排除在滑动窗口之外时
        while(deque.length && deque[0] <= i - k){
            deque.shift();
        }
        if(i >= k - 1){
            res.push(nums[deque[0]])
        }
    }
    return res;

}