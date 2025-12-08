'use client'; // Đây là Client Component

import React, { useState } from 'react';
import BlockCard from './BlockCard';
import BlockModal from '../ui/BlockModal';
import FloatingDock from '../ui/FloatingDock';
import { BlockType } from '@/types';

const BentoGrid = ({ blocks }: { blocks: BlockType[] }) => {
    const [selectedBlock, setSelectedBlock] = useState<null | any>(null);
    const [filter, setFilter] = useState<string>('all');

    return (
        <>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px] grid-flow-dense">
                {blocks.map((block) => (
                    <div key={block._id} onClick={() => setSelectedBlock(block)} className="cursor-pointer contents">
                        <BlockCard
                            title={block.title}
                            type={block.type}
                            content={block.content} // Chỉ hiện text ngắn
                            size={block.size}
                            color={block.color}
                            link={block.link} // Nhớ truyền link nếu có                        
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