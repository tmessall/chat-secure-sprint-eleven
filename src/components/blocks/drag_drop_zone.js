// import React, { useState } from 'react';
// import { DropZone } from './block_elements';

// const DragDrop = props => {
//     const [blocks, setBlocks] = useState([])
//     const handleDragEnter = e => {
//         e.preventDefault();
//         e.stopPropagation();
//     };
//     const handleDragLeave = e => {
//         e.preventDefault();
//         e.stopPropagation();
//     };
//     const handleDragOver = e => {
//         e.preventDefault();
//         e.stopPropagation();
//     };
//     const handleDrop = e => {
//         e.preventDefault();
//         e.stopPropagation();

//     };
//     return (
//         <DropZone
//         onDrop={e => handleDrop(e)}
//         onDragOver={e => handleDragOver(e)}
//         onDragEnter={e => handleDragEnter(e)}
//         onDragLeave={e => handleDragLeave(e)}
//         >
//         <p>Drag Your Code Blocks Here!</p>
//         </DropZone>
//     );
// };

// export default DragDrop;

import React from 'react';
import { DropZone } from './block_elements';

const DroppableArea = ({ onDrop, onDragOver }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain'); // Get the data being dropped
    onDrop(data);
  };

  return (
    <DropZone
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      ---Drag Commands Here---
    </DropZone>
  );
};

export default DroppableArea;