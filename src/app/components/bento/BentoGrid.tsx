'use client'; // Đây là Client Component

import React, { useState } from 'react';
import BlockCard from './BlockCard';
import BlockModal from '../ui/BlockModal';

const BentoGrid = ({ blocks }: { blocks: any[] }) => {
  const [selectedBlock, setSelectedBlock] = useState<null | any>(null);

  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
        {blocks.map((block) => (
          <div key={block._id} onClick={() => setSelectedBlock(block)} className="cursor-pointer">
            <BlockCard
              title={block.title}
              type={block.type}
              content={block.content} // Chỉ hiện text ngắn
              size={block.size}
              color={block.color}
              // Link ở đây để null để tránh bấm vào icon nó nhảy trang, ta xử lý click toàn cục
              link={null} 
            />
          </div>
        ))}
      </div>

      {/* Cái Modal thần thánh nằm ở đây */}
      <BlockModal 
        isOpen={!!selectedBlock} 
        onClose={() => setSelectedBlock(null)} 
        block={selectedBlock} 
      />
    </>
  );
};

export default BentoGrid;