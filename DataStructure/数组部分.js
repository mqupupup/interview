
// 两数求和
const sum = function (nums,target) {
    const map = new Map();
    const len = nums.length;
    for(let i = 0;i < len ;i++){
        let complement = target - nums[i];
        if(map.has(complement)){
            return [map.get(complement),i]
        } else {
            map.set(nums[i],i);

        }
    }
    return [];
}
const arr = sum([0,1,1,2,4],2);
console.log(arr);

//合并有序数组：真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

const merge1 = function (num1, m, num2, n) {
    let len1 = m - 1,len2 = n - 1,len = m + n - 1;
    while(len1 >= 0 && len2 >= 0) {
        if(num1[len1] >= num2[len2]) {
            num1[len] = num1[len1];
            len1--;
            len--;
        }else {
            num1[len] = num2[len2];
            len2--;
            len--;
        }
    }
    while(len2 >= 0) {
        num1[len] = num2[len2];
        len--;
        len2--;
    }
    return num1;
}
const arr2 = merge1([1,3,5],3,[2,3,6],3);
console.log(arr2);

const merge2 = function (num1, m, num2, n) {
    let len1 = m - 1,len2 = n - 1,len = m + n - 1;
    while(len1 >= 0 && len2 >= 0) {
       num1[len--] = num1[len1] > num2[len2] ? num1[len1--] : num2[len2--];
    }

    if(len2 >= 0) {
        num1.splice(0,0,...num2.slice(0,len2))
        console.log('num2----',num2.slice(0,len2));

   /*     for(let i = 0;i <= len2;i++) {
            // num1.splice(i,0,num2[i]);
            num1[i] = num2[i];

        }*/
    }

/*    function arrayCopy(arr1, i, arr2, j, length){
        arr2.splice(j, length, ...arr1.slice(i, i+ length));
    }
    arrayCopy(nums2,0,nums1,0,len2+1);*/

    return num1;
}
/*
const arr3 = merge2([0],0,[2],1);
console.log(arr3);

const arr4 = [1, 2, 4, 6, 8];
const arr5 = arr4.slice(0,1);
const arr6 = arr4.splice(1,0, ...arr5);
console.log('----------', arr5);
console.log('----------', arr4);
*/


// 三数求和：真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

const threeSum = function (nums) {
    nums.sort((a,b) => a - b);
    let ans = [];
    const len = nums.length
    if(nums === null || len < 3)return ans;
    for(let i = 0;i < len;i++){
        if(nums[i] > 0 && nums[i + 1] > 0)break;
        if(i > 0 && nums[i] === nums[i-1]) continue;//去重
        let l = i + 1,r = len - 1;
        while(l < r){
            const sum = nums[i] + nums[l] + nums[r];
            if(sum === 0){
                ans.push(nums[i], nums[l], nums[r]);
                while(l < r && nums[l] === nums[l + 1]) l++;
                while(l < r && nums[r] === nums[r - 1]) r--;
                l++;
                r--;
            }else if (sum < 0) l++;
            else r--;
        }

    }
    return ans;
}

const arr3 = threeSum( [-1,0,1,2,-1,-4]);
console.log(arr3);
