/*
* 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。*/
const permute = function (nums) {
    const len = nums.length;
    const cur = [];
    const res = [];
    const visited = {};
    function dfs(nth) {
        if(nth === len) {
            /*当走到递归边界时，一个完整的排列也到手了。将这个完整排列推入结果数组时，我们用了 res.push(curr.slice()) 而不是简单的 res.push(curr) 。
            为什么这样做？因为全局只有一个唯一的 curr ， curr 的值会随着 dfs 的进行而不断被更新。 slice 方法的作用是帮助我们拷贝出一个不影响curr正本的副本，以防直接修改到curr的引用。*/
            res.push(cur.slice());
            return;
        }
        for(let i = 0; i < len; i++){
            if(!visited[nums[i]]){
                visited[nums[i]] = 1;
                cur.push(nums[i]);
                dfs(nth + 1);
                cur.pop();
                visited[nums[i]] = 0;
            }
        }
    }
    dfs(0);
    return res;
}
const arr = permute([1,2,3]);
console.log(arr);

/*题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。*/

const subsets = function (nums) {
    const res = [];
    const len = nums.length;
    const subset = [];
    dfs(0);
    function dfs(index) {
        res.push(subset.slice());
        for(let i = index; i < len;i++) {
            subset.push(nums[i]);
            dfs(i + 1);
            subset.pop();
        }
    }
    return res;
}

/*题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。*/
const combine = function (n,k) {
    const res = [];
    const subset = [];
    dfs(1);
    function dfs(index) {
        if(subset.length == k) {
            res.push(subset.slice());
            return
        }
        for(let i = index; i <= n;i++) {
            subset.push(i);
            dfs(i + 1);
            subset.pop();
        }
    }
    return res;
}

