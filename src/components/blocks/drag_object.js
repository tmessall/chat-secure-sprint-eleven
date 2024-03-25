import React from 'react';
import { MyBlock } from './block_elements';

const DraggableItem = ({ item, onDragStart, contents }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', item); // Set the data being dragged
    onDragStart();
  };

  return (
    <MyBlock
      draggable
      onDragStart={handleDragStart}
    >
      {item}
    </MyBlock>
  );
};

export default DraggableItem;