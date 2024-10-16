/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cache = new Map();
  this.cap = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) {
    return -1;
  }
  this.makeRecently(key);
  return this.cache.get(key);
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key);
    this.cache.set(key, value);
    return;
  }
  if (this.cache.size === this.cap) {
    this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};

/* 将某个 key 提升为最近使用的 */
LRUCache.prototype.makeRecently = function (key) {
  const val = this.cache.get(key);
  // 删除 key，重新插入到队尾
  this.cache.delete(key);
  this.cache.set(key, val);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// export default LRUCache;

lru = new LRUCache(2);
