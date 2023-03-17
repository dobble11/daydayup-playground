import LRUCache from './test';

describe('LRUCache', () => {
  let lru;

  beforeEach(() => {
    lru = new LRUCache(2);
  });

  test('Adding items to cache works', () => {
    lru.put(1, 'a');
    expect(lru.cache.size).toEqual(1);
    expect(lru.get(1)).toEqual('a');
  });

  test('Deleting least recently used item works', () => {
    lru.put(1, 'a');
    lru.put(2, 'b');
    lru.put(3, 'c');
    expect(lru.cache.has(1)).toBeFalsy();
    expect(lru.get(1)).toEqual(-1);
    expect(lru.get(2)).toEqual('b');
    expect(lru.get(3)).toEqual('c');
  });

  test('Putting an already existing key updates its value', () => {
    lru.put(1, 'a');
    lru.put(1, 'b');
    expect(lru.cache.size).toEqual(1);
    expect(lru.get(1)).toEqual('b');
  });

  test('Getting a non-existing key returns -1', () => {
    expect(lru.get(1)).toEqual(-1);
  });
});
