function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

function formatArr(arr) {
    let ret = new ListNode(arr[0])
    let p = ret
    for (let i = 1; i < arr.length; i++) {
        p.next = new ListNode(arr[i])
        p = p.next
    }
    return ret
}

const list = [
    [[2, 4, 3], [5, 6, 4]],
    [[0], [0]],
    [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]]
]

for (let v of list) {
    const ret = addTwoNumbers(formatArr(v[0]), formatArr(v[1]))
    console.log(ret)
}

function addTwoNumbers(l1, l2) {
    let p = l1, q = l2,
        head = new ListNode(-1), // 头指针
        h = head, // 移动指针
        sum,
        carry = false // 进位
    while (p || q) {
        sum = 0
        if (p) {
            sum += p.val
            p = p.next
        }
        if (q) {
            sum += q.val
            q = q.next
        }
        if (carry) {
            sum++
        }
        h = h.next = new ListNode(sum % 10)
        carry = sum >= 10
    }
    if (carry) {
        h.next = new ListNode(1)
    }
    return head.next
};