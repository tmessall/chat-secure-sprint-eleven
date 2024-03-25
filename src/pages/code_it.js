import React, { useState } from "react";
//import DroppableArea from "../components/blocks/drag_drop_zone";
//import { MyBlock, BlockHolder } from "../components/blocks/block_elements"
//import  DragDrop  from "../components/blocks/drag_drop_zone"
import DraggableItem from "../components/blocks/drag_object";
import DroppableArea from "../components/blocks/drag_drop_zone";
import { BlockHolder, MyButton } from "../components/blocks/block_elements";
import { saveAs } from 'file-saver'

function CodeIt(){
    // const [blocks, setBlocks] = useState([]);
    // function handleOnDrag(blockType){
    //     //React.DragEvent.setData("blockType", blockType);
    // }

    // function handleOnDrop(){
    //     //const blockType = React.DragEvent.getData("blockType");
    //     //console.log("blockType", blocks);
    //     //setBlocks([...blocks, blockType]);
    // }

    // function handleDragOver(dEvent){
    //     dEvent.preventDefault();
    // }

    // return (
    //     <div className="main" style={{display: "flex"}}>
    //         <BlockHolder>
    //             <DraggableItem item="Say Hello" onDrag
    //         </BlockHolder>
    //         <DragDrop />
    //     </div>
    // );
    const [draggedItem, setDraggedItem] = useState(null);
    const [droppedItems, setDroppedItems] = useState([]);
    const [blockContent, setblockContent] = useState([]);

    const handleDragStart = () => {
        setDraggedItem(null); // Reset the dragged item
    };

    const handleDrop = (item, content) => {
        setDroppedItems([...droppedItems, item]);
        setblockContent([...blockContent, content]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    function resetList(){
        setDroppedItems([]);
    };

    function generateFile(){
        const file = new Blob(droppedItems, { type: 'text/plain;charset=utf-8' });
        saveAs(file, 'testfile.txt');
        return;
    };

    return (
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
            <div>
                <BlockHolder>
                    <h2>Robot Commands</h2>
                    <DraggableItem item="Stand Up" onDragStart={handleDragStart} contents="Code for robot to stand up;\n"/>
                    <DraggableItem item="Sit Down" onDragStart={handleDragStart} contents="Code for robot to sit down;\n"/>
                    <DraggableItem item="Walk Forward" onDragStart={handleDragStart} contents="Code for robot to walk forward;\n"/>
                    <DraggableItem item="Walk Backwards" onDragStart={handleDragStart} contents="Code for robot to walk backwards;\n"/>
                    <DraggableItem item="Stop Walking" onDragStart={handleDragStart} contents="Code for robot to stop walking;\n"/>
                    <DraggableItem item="Look Left" onDragStart={handleDragStart} contents="Code for robot to look left;\n"/>
                    <DraggableItem item="Look Right" onDragStart={handleDragStart} contents="Code for robot to look right;\n"/>
                </BlockHolder>
                <div>
                <DroppableArea onDrop={handleDrop} onDragOver={handleDragOver} />
                </div>
                <div>
                <MyButton onClick={resetList}> Clear </MyButton>
                <MyButton onClick={generateFile}> Go </MyButton>
                </div>
            </div>
            <div style={{background: "grey"}}>
                    {droppedItems.map((item, index) => (
                        <div id={index}>{item}</div>
                    ))}
            </div>
        </div>
    );
};

{/* <ul>
                {droppedItems.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
</ul> */}

 
export default CodeIt;