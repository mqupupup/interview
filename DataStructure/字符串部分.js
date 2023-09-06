const str = 'dachang';

const res = str.split('').reverse().join('');
console.log(str);

// 判断一个字符串是否是回文字符串
function isPalindrome(str) {
    const reversedStr = str.split().reverse().join();
    return reversedStr === str;
}
const str2 = 'yessey';
console.log(isPalindrome(str2));

function isPalindrome1(str) {
   const len = str.length;
    //先替换掉所有非字母和数字
    //再替换掉所有的空格
    //然后后reverse()方法颠倒顺序
    str = str.replace(/[^a-zA-Z0-9]/g,"").replace(/\s/g,"").toLowerCase();
/*   for(let i = 0;i < len / 2;i++){
       if(str[i] !== str[len - i - 1]) return false;
   }*/
   return str === str2.split('').reverse().join('');
}
console.log(isPalindrome1("一个人，一个计划，一条运河：巴拿马"));


// 衍生：真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

const validPalindrome = function(s) {
    const len = s.length;
    let i = 0, j = len - 1;
    while(i < j && s[i] === s[j]) {
        i++;
        j--;
    }
    if(isPalindrome(i + 1,j)){
        return true;
    }
    if(isPalindrome(i,j - 1)){
        return true;
    }

    function isPalindrome(start,end){
        while(start < end){
            if(s[start]!== s[end]) return false;
            start++;
            end--;
        }
        return true;
    }
    return false;

}
console.log('删除一个字符是否是回文串', validPalindrome("aba"));


//真题描述： 设计一个支持以下两种操作的数据结构：
//
// void addWord(word)
// bool search(word)
// search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
// . 可以表示任何一个字母


const wordDictionary = function () {
    this.words = {};
}

wordDictionary.prototype.addWord = function (word) {
    if(this.words[word.length]){
        this.words[word.length].push(word);
    }else {
        this.words[word.length] = [word];
    }
}
wordDictionary.prototype.search = function (word){
    if(!this.words[word.length]) return false;
    const len = word.length;
    if(!word.includes('.')){
        return this.words[len].includes(word);
    }
    const regExp = new RegExp();
    return this.words[len].some((item) => {
        return regExp.test(item);
    });
}
const dict = new wordDictionary();
dict.addWord("dad");
dict.addWord("mad");
dict.search("pad");
const arr4 = [
dict.search("bad"),
dict.search(".ad"),
dict.search("b..")]
console.log(arr4)

// 真题描述：请你来实现一个 atoi 函数，使其能将字符串转换成整数。

const myAtoi = function (str) {
    const reg = /\s*([+\-]?[0-9]*).*/
    const groups = str.match(reg);
    console.log('group:',groups[1]);
    const maxInt = Math.pow(2,31) - 1;
    const minInt = - maxInt - 1;
    let targetNum = 0;
    if(groups) {
        targetNum = +groups[1];
        if(isNaN(targetNum)){
            targetNum = 0;
        }
    }
    if(targetNum > maxInt) return maxInt;
    else if(targetNum < minInt) return minInt
    return targetNum;
}
const num = myAtoi( "-91283472332");
console.log(num);