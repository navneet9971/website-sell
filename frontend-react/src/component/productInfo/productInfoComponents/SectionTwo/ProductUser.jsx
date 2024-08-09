import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import React, { useState } from 'react';
import { FaUserSecret, FaHandshake } from "react-icons/fa";
import { testData } from "../../../../data/data";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tree } from '@minoru/react-dnd-treeview'; // Static import

const ProductUser = ({productInfo}) => {
  const [treeData, setTreeData] = useState(testData);

  const handleHireDev = () => {
    alert("Please Hire Me");
  };

  return (
    <>
      <div className='w-[27rem] h-full border-black bg-slate-200'>
        <h1 className='bg-blue-400 text-white font-bold text-2xl text-center'>Developer</h1>

        <div className='flex flex-col items-center justify-center mt-8 gap-3'>
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Username</AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-md">{productInfo.userData.userName}</h2>
          <FaUserSecret size={25} onClick={handleHireDev} className="cursor-pointer" />

          <Button variant="destructive" className="flex items-center gap-2">
            <FaHandshake size={20} />
            Negotiate Price
          </Button>

          <Button variant="jump">
            <FaHandshake size={20} />
            Request Code Sample
          </Button>

          <Button variant="jump">
            <FaHandshake size={20} />
            Seller Support
          </Button>

          <Button variant="jump">
            <FaHandshake size={20} />
            Help Desk
          </Button>


          <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-sm">Project Upload Date </h1>
          <h1 className="text-sm">{productInfo.currentDate} </h1>
          </div>
        </div>
      </div>

      <div className="w-[27rem] h-full border-black bg-slate-200 mt-5">
        <h1 className='bg-blue-400 text-white font-bold text-2xl text-center'>File Tree</h1>
        
        <div className="flex items-center justify-start ml-5">
          <DndProvider backend={HTML5Backend}>
            <Tree
              tree={treeData}
              rootId={0}
              render={(node, { depth, isOpen, onToggle }) => (
                <div style={{ marginInlineStart: depth * 10 }}>
                  {node.droppable && (
                    <span onClick={onToggle}>
                      {isOpen ? '[-]' : '[+]'}
                    </span>
                  )}
                  {node.text}
                </div>
              )}
              dragPreviewRender={(monitorProps) => <div>{monitorProps.item.text}</div>}
              onDrop={(newTree) => setTreeData(newTree)}
              readOnly
            />
          </DndProvider>
        </div>
      </div>
    </>
  );
};

export default ProductUser;
