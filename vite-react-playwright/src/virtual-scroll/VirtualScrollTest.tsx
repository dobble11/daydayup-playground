import React, { useRef, useState } from 'react';
import VirtualScroll from './VirtualScroll';

export default function VirtualScrollTest() {
  const [items, setItems] = useState(Array.from({ length: 10000 }, (_, index) => `Item ${index}`));

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, `Item ${prevItems.length}`]);
  };

  return (
    <div>
      <h1>Virtual Scroll Demo</h1>
      <button onClick={handleAddItem}>Add Item</button>
      <VirtualScroll items={items} height={500} rowHeight={40} />
    </div>
  );
}
