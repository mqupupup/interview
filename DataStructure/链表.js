//真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
const  mergeTwoList = function (l1,l2){
    let head = new ListNode();
    let cur = head;
    while(l1 && l2) {
        if(l1.val <= l2.val){
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }
    cur.next = l1 !== null ? l1 : l2;
    return head.next;

}
const l1 = new ListNode(1);
l1.next = new ListNode(2);
l1.next.next = new ListNode(3);
const l2 = new ListNode(3);
l2.next = new ListNode(3);
l2.next.next = new ListNode(4);
let l3 = mergeTwoList(l1,l2);
while(l3){
    console.log(l3.val);
    l3 = l3.next;
}

// 删除节点：真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

const deleteDuplicate = function (head){
    let cur = head;
    while(cur != null && cur.next != null){
        if(cur.val === cur.next.val) {
            cur.next = cur.next.next;
        }else {
            cur = cur.next;
        }
    }
    return head;

}
const l4 = new ListNode(1);
l4.next = new ListNode(2);
l4.next.next = new ListNode(2);
l4.next.next.next = new ListNode(3);
let l5 = deleteDuplicate(l4);
while(l5) {
    console.log('-----',l5.val);
    l5 = l5.next;
}

// 真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。

const deleteDumplateAll = function(head) {
    if(!head || !head.next) return head;

    let dummy = new ListNode();
    dummy.next = head;
    let cur = dummy;
    while(cur.next && cur.next.next){
        if(cur.next.val === cur.next.next.val){
            let dumplateValue = cur.next.val;
            while(cur.next && cur.next.val === dumplateValue) {
                cur.next = cur.next.next;
            }
        }else {
            cur = cur.next;
        }
    }
    return dummy.next;

}

const l8 = new ListNode(1);
l8.next = new ListNode(2);
l8.next.next = new ListNode(2);
l8.next.next.next = new ListNode(3);
let l9 = deleteDumplateAll(l8);
while(l9) {
    console.log('删除所有重复的节点',l9.val);
    l9 = l9.next;
}

// 快慢指针——删除链表的倒数第 N 个结点
const removeNthFromEnd = function (head, n) {
    const dummy = new ListNode();
    dummy.next = head;
    let slow = dummy;
    let fast = dummy;
    while(n !== 0){
        fast = fast.next;
        n--;
    }
    while(fast.next){
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return dummy.next;

}

const l10 = new ListNode(1);
l10.next = new ListNode(2);
l10.next.next = new ListNode(2);
l10.next.next.next = new ListNode(3);
let l11 = removeNthFromEnd(l10,4);
while(l11) {
    console.log('删除倒数第n个节点',l11.val);
    l11 = l11.next;
}

// 翻转链表
const reverseList = function (head) {
    let pre = null;
    let cur = head;
    while(cur) {
        // 记录一下 next 结点
        let next = cur.next;
        // 反转指针
        cur.next = pre;
        // pre 往前走一步
        pre = cur;
        // cur往前走一步
        cur = next;
    }
    return pre;
}

const reverseList1 = function (head) {

    if(head == null || head.next == null) return head;
    const p = reverseList1(head.next);
    head.next.next = head;
    head.next = null;
    return p;
}

let l12 = reverseList1(l10,4);
while(l12) {
    console.log('翻转链表',l12.val);
    l12 = l12.next;
}

//局部反转一个链表
const reverseBetween = function (head, m, n) {
    let pre,cur,leftHead;
    const dummy = new ListNode();
    dummy.next = head;
    let p = dummy;
    for(let i = 0;i < m - 1;i++){
        p = p.next;
    }
    leftHead = p;
    let start = leftHead.next;
    pre = start;
    cur = start.next;
    for(let i = m;i < n;i++) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    //  leftHead 的后继结点此时为反转后的区间的第一个结点
    leftHead.next = pre
    // 将区间内反转后的最后一个结点 next 指向 cur
    start.next=cur
    // dummy.next 永远指向链表头结点
    return dummy.next
}

const hasCycle = function (head) {
    if(head === null) return false;
    let slow = head;
    let fast = head.next;
    while(fast && fast.next) {
        if(slow.next === fast.next) return true;
        slow = slow.next;
        fast = fast.next.next;
    }
    return  false;
}
const hasCycle1 = function (head) {
    while(head) {
        if(head.flag) {
            return true;
        }else {
            console.log('head详情-----',head);
            head.flag = true;
            head = head.next;
        }
    }
    return  false;
}
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2;
let test = hasCycle1(node1);
console.log("判断是否有环---，",test);

// 环形链表衍生问题——定位环的起点

const detectCycle = function(head) {
    while(head) {
        if (head.flag){
            return head;
        }else {
            head.flag = true;
            head = head.next;
        }
    }
    return null;

}