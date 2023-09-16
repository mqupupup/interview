function TreeNode(val, left, right) {
    this.val = val === undefined  ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null: right;
}

//先序遍历，迭代实现

const preorderTraversal = function (root) {
    const res = [];
    if(!root) {
        return res;
    }
    const stack = [];
    stack.push(root);
    while(stack.length) {
        const cur = stack.pop();
        res.push(cur.value);
        if(cur.right) stack.push(cur.right);
        if(cur.left) stack.push(cur.left);
    }
    return res;

}

// 后序遍历
const postorderTraversal = function(root) {
    // 定义结果数组
    const res = []
    // 处理边界条件
    if(!root) {
        return res
    }
    // 初始化栈结构
    const stack = []
    // 首先将根结点入栈
    stack.push(root)
    // 若栈不为空，则重复出栈、入栈操作
    while(stack.length) {
        // 将栈顶结点记为当前结点
        const cur = stack.pop()
        // 当前结点就是当前子树的根结点，把这个结点放在结果数组的头部
        res.unshift(cur.val)
        // 若当前子树根结点有左孩子，则将左孩子入栈
        if(cur.left) {
            stack.push(cur.left)
        }
        // 若当前子树根结点有右孩子，则将右孩子入栈
        if(cur.right) {
            stack.push(cur.right)
        }
    }
    // 返回结果数组
    return res
};


// 中序遍历
const inorderTraversal = function (root) {
    const res = [];
    const stack =  [];
    let cur = root;
    while(cur || stack.length){
        while(cur){
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        res.push(cur.val);
        cur = stack.right;
    }
    return res;
}

// 题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

const levelOrder = function (root) {
    let res = [];
    if(!root) return res;
    const queue = [];
    queue.push(root);
    while(queue.length){
        const level = [];
        const len = queue.length;
        for(let i = 0;i < len;i++){
            const top = queue.shift();
            level.push(top.val);
            if(top.left) queue.push(top.left);
            if(top.right) queue.push(top.right);
        }
        res.push(level);
    }
    return res;
}

//题目描述：翻转一棵二叉树。
const invertTree = function (root) {
    if(!root) return root;
    let right = invertTree(root.right);
    let left = invertTree(root.left);
    root.left = right;
    root.right = left;
    return root;
}

// 二叉搜索树：查

function search(root, target){
    if(!root) return;
    if(root.val === target) {
        console.log('目标节点是：', root);
    }else if(root.val > target) {
        search(root.left,target);
    }else {
        search(root.right,target)
    }

}

function insertToBST(root, target) {
    if(!root){
        root = new TreeNode(n);
        return root;
    }
    if(root.val > target){
        root.left = invertTree(root.left,target);
    }else {
        root.right = invertTree(root.right,target);
    }
    return root;
}

// 删除指定结点

function deleteNode(root, n) {
    if(!root) return root;
    if(root.val === n) {
        if(!root.left && !root.right)
            root = null;
        else if(root.left) {
            const maxLeft = findMax(root.left);
            root.val = maxLeft;
            root.left = deleteNode(root.left, maxLeft.val);
        }else if(root.right) {
            const minRight = findMin(root.right);
            root.val = minRight;
            root.right = deleteNode(root.right,minRight.val);
        }
    }else if(root.val > n){
        root.left = deleteNode(root.left, n);
    }else  root.right = deleteNode(root.right,n);

    return root;
}

function findMax(root) {
    while(root.right) {
        root = root.right
    }
    return root;
}

// 题目描述：给定一个二叉树，判断其是否是一个有效的二叉搜索树。
const isValidBST = function(root) {
    function dfs(root, minValue, maxValue) {
        if(!root) return true;
        if(root.val <= minValue || root.val >= maxValue) return false;
        return dfs(root.left, minValue, root.val) && dfs(root.right, root.val,maxValue);
    }
    return dfs(root,-Infinity,Infinity);

}

// 题目描述：将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
const sortArrayToBST = function (nums) {
    if(!nums)return null;
    const root = buildBST(0,nums.length - 1);
    function buildBST(low, high) {
        if(low > high) return null;
        const mid = Math.floor(low + (high - low) / 2);
        const cur = new TreeNode(nums[mid]);
        cur.left = buildBST(low, mid - 1);
        cur.right = buildBST(mid + 1,high);
        return cur;
    }
    return root;
}

// 平衡二叉树:平衡二叉树的判定 题目描述：给定一个二叉树，判断它是否是高度平衡的二叉树。
const isBalance = function(root) {
    let flag = true;
    function dfs(root) {
        if(!root || !flag) {
            return 0;
        }
        const left = dfs(root.left);
        const right = dfs(root.right);
        if(Math.abs(left - right) > 1) {
            flag = false;
            return 0;
        }
        return Math.max(left, right) + 1;
    }
    dfs(root);
    return flag;
}

// 题目描述：给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。
const balanceBST = function(root) {
    const nums = [];
    function inOrder(root) {
        if(!root)return;
        inOrder(root.left);
        nums.push(root.val);
        inOrder(root.right);
    }
    function buildAVL(low,high){
        if(low > high)return null;
        const mid = Math.floor(low + (high - low) / 2);
        const cur = new TreeNode(nums[mid]);
        cur.left = buildAVL(low, mid - 1);
        cur.right = buildAVL(mid + 1, high);
        return cur;
    }
    inOrder(root);
    return buildAVL(0,nums.length - 1);

}


// 大顶堆删除堆顶元素
// 入参是堆元素在数组里的索引范围，low表示下界，high表示上界
function downHeap(low, high) {
    let i = low, j = 2 * i + 1;
    while(j <= high) {
        // 如果右孩子比左孩子更大，则用右孩子和根结点比较
        if(j_+ 1 <= high && heap[j + 1] > heap[j]) {
            j = j + 1;
        }
        // 若当前结点比孩子结点小，则交换两者的位置，把较大的结点“拱上去”
        if(heap[i] < heap[j]) {
            const temp = heap[i];
            heap[i] = heap[j];
            heap[j] = temp;
            i = j;
            j = 2 * j + 1;
        }else {break}
    }
}

// 堆里增加元素

function upHeap(low, high) {
    let i = high;
    let j = Math.floor((i-1)/2);
    while(j >= low) {
        if(heap[j] < heap[i]){
            const temp = heap[j];
            heap[j] = heap[i];
            heap[i] = temp;
            i = j;
            j = Math.floor((i - 1)/2);
        }else {break;}
    }



}


// 应用：题目描述：在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
const findKthLargest = function (nums, k) {
    const sorted = nums.sort((a,b) => {return b - a})
    return sorted[k-1];
}
