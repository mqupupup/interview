const arr1 = [1,2];
// 添加元素到数组头部
arr1.unshift(0);
console.log(arr1);

const arr2 = [1,2];
// 添加元素到数组尾部
arr2.push(3);
console.log(arr2);

const arr3 = [1,2];
// splice添加元素到任何位置.第一个入参是起始的索引值，第二个入参表示从起始索引开始需要删除的元素个数。
arr3.splice(1,1);
console.log(arr3);

const arr4 = [1,2];
//因为删掉的元素是0个，所以说 arr[1] 中原有的元素值“2”仍然会被保留下来；同时因为我们后面又指定了 arr[1] 处需要新增一个元素3，
// 那么这个3就会把原来arr[1]这个地方的元素给“挤到后面去”。这样我们就做到了在数组中任意位置进行元素的新增。
arr4.splice(1,0,3);
console.log(arr4);

const arr5 = [1,2];
// 删除数组首个元素
arr5.shift();
console.log(arr5);

const arr6 = [1,2];
arr6.pop();
console.log(arr6)

