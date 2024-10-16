class Queue {
  constructor(size) {
    this.items = new Array(size);
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element) {
    if (this.tail === this.items.length) {
      console.log('队列已满');
      return;
    }
    this.items[this.tail++] = element;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.head++];
  }

  peek() {
    return this.items[this.head];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }
}

const queue = new Queue(2);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.size()); // 3
console.log(queue.peek()); // 1
console.log(queue.dequeue()); // 1
console.log(queue.size()); // 2
console.log(queue.peek()); // 2
console.log(queue.isEmpty()); // false
