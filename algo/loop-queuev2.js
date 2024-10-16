// 使用 count 存储队列元素长度，不需要牺牲一个存储空间
class LoopQueue {
  constructor(size) {
    this.queue = new Array(size);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
  }

  enqueue(item) {
    // 队满
    if (this.count === this.queue.length) {
      return false;
    }

    this.queue[this.tail] = item;
    this.tail = (this.tail + 1) % this.queue.length;
    this.count += 1;

    return true;
  }

  dequeue() {
    // 队空
    if (this.count === 0) {
      return undefined;
    }
    const item = this.queue[this.head];
    this.queue[this.head] = null;
    this.head = (this.head + 1) % this.queue.length;
    this.count -= 1;

    return item;
  }

  size() {
    return this.count;
  }
}

const queue = new LoopQueue(3);
console.log(queue.enqueue(1)); // true
console.log(queue.enqueue(2)); // true
console.log(queue.enqueue(3)); // true
console.log(queue.dequeue()); // 1
console.log(queue.enqueue(4)); // true
console.log(queue.size()); // 3
console.log(queue.tail, queue.head, queue.queue); // 1 1 [ 4, 2, 3 ]
console.log(queue.dequeue(), queue.queue); // 2 [ 4, null, 3 ]
