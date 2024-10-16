class LoopQueue {
  constructor(size) {
    this.queue = new Array(size);
    this.head = 0;
    this.tail = 0;
  }

  enqueue(item) {
    // 队满 牺牲一个存储空间
    if ((this.tail + 1) % this.queue.length === this.head) {
      return false;
    }
    this.queue[this.tail] = item;
    this.tail = (this.tail + 1) % this.queue.length;

    return true;
  }

  dequeue() {
    // 队空
    if (this.head === this.tail) {
      return undefined;
    }
    const item = this.queue[this.head];
    this.queue[this.head] = null;
    this.head = (this.head + 1) % this.queue.length;

    return item;
  }

  size() {
    return (this.tail - this.head + this.queue.length) % this.queue.length;
  }
}

const queue = new LoopQueue(3);
console.log(queue.enqueue(1)); // true
console.log(queue.enqueue(2)); // true
console.log(queue.dequeue()); // 1
console.log(queue.enqueue(3)); // true
console.log(queue.size()); // 2
console.log(queue.tail, queue.head); // 0 1
