import React, { useState, useCallback, useRef, useEffect } from 'react';

export interface VirtualScrollProps {
  items: string[];
  height: number;
  rowHeight: number;
}

export default function VirtualScroll({ items, height, rowHeight }: VirtualScrollProps) {
  // 保存滚动条位置的状态
  const [scrollTop, setScrollTop] = useState(0);
  // 获取列表容器元素的引用
  const containerRef = useRef<HTMLDivElement>(null);
  // 计算可见区域的行数
  const visibleRowCount = Math.ceil(height / rowHeight);

  // 监听滚动条的滚动事件，更新滚动条位置的状态
  const handleScroll = useCallback(() => {
    const scrollTop = containerRef.current!.scrollTop;
    setScrollTop(scrollTop);
  }, []);

  // 使用 useEffect 添加滚动条滚动事件的监听器，并在组件卸载时移除监听器
  useEffect(() => {
    const container = containerRef.current;
    container!.addEventListener('scroll', handleScroll);
    return () => {
      container!.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // 计算可见区域的起始行和结束行
  const start = Math.floor(scrollTop / rowHeight);
  const end = Math.min(start + visibleRowCount + 1, items.length);

  // 渲染可见区域内的元素
  const visibleItems = items.slice(start, end).map((item, index) => (
    <div key={start + index} style={{ height: `${rowHeight}px` }}>
      {item}
    </div>
  ));

  // 计算列表容器的 paddingTop 和 paddingBottom，确保可见区域内的元素能够正确地垂直对齐
  const paddingTop = start * rowHeight;
  const paddingBottom = (items.length - end) * rowHeight;

  return (
    <div ref={containerRef} style={{ height: `${height}px`, overflowY: 'scroll' }}>
      {/* 使用 paddingTop 和 paddingBottom 让可见区域内的元素能够正确地垂直对齐 */}
      <div style={{ paddingTop: `${paddingTop}px`, paddingBottom: `${paddingBottom}px` }}>
        {visibleItems}
      </div>
    </div>
  );
}
