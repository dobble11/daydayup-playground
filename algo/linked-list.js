// 单向链表
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 链表尾部插入元素
  push(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.size++;
  }

  // 删除链表尾部
  pop() {
    if (!this.head) {
      return null;
    }
    let current = this.head;
    let prev = null;

    while (current.next) {
      // ! 注意赋值循序
      prev = current;
      current = current.next;
    }
    if (!prev) {
      this.head = null;
    } else {
      prev.next = null;
    }
    this.size--;
    return current;
  }

  // 删除链表头部
  shift() {
    if (!this.head) {
      return null;
    }
    const oldHead = this.head;
    this.head = this.head.next;
    oldHead.next = null;
    this.size--;
    return oldHead;
  }

  // 头部插入元素
  unshift(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  // 在指定位置后插入元素
  insert(index, value) {
    if (index < 0 || index > this.size - 1) return false;
    const node = new Node(value);

    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let prev = null;

      while (index) {
        prev = current;
        current = current.next;
        index--;
      }
      prev.next = node;
      node.next = current;
    }
    this.size++;
    return true;
  }

  // 删除指定元素
  remove(value) {
    let current = this.head;
    let prev = null;

    while (current) {
      if (current.value === value) {
        if (!prev) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        break;
      }
      prev = current;
      current = current.next;
    }
  }

  // 反转
  reverse() {
    let current = this.head;
    let prev = null;
    let next = null;
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
}

const ll = new LinkedList();

ll.push(1);
ll.push(2);
ll.push(3);
ll.push(4);
console.log(ll.shift()); // 1
console.log(ll.pop(), ll.head); // 4  2->3
ll.unshift(1);
console.log(ll.head); // 1->2->3
ll.reverse();
console.log(ll.head); // 3->2->1
ll.remove(2);
console.log(ll.head); // 3->1
console.log(ll.insert(1, 2), ll.head); // 3->2->1
