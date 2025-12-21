'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
  _id: string;
  title: string;
  company: string;
  year: string;
  description: string;
  tags: string[];
}

export default function Timeline() {
  const [data, setData] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    fetch('/api/experience')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-3">
        <span className="bg-black text-white px-2 py-1 transform -rotate-2">#</span> 
        Hành Trình
      </h2>

      <div className="relative pl-8 md:pl-0">
        {/* Đường kẻ dọc: Dày dặn, đen tuyền */}
        <div className="absolute left-[9px] md:left-1/2 top-0 h-full w-[4px] bg-black -translate-x-1/2 rounded-full opacity-20 md:opacity-100"></div>

        <div className="space-y-12">
          {data.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* 1. Phần Rỗng (để đẩy card sang 1 bên) */}
                <div className="hidden md:block w-5/12"></div>

                {/* 2. Trục Giữa (Icon tròn) */}
                <div className="absolute left-[9px] md:left-1/2 -translate-x-1/2 z-10 bg-white border-4 border-black p-2 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Briefcase size={20} className="text-black" />
                </div>

                {/* 3. Card Nội Dung */}
                <div className="w-full md:w-5/12 pl-10 md:pl-0">
                  <div className={`
                    relative bg-white border-4 border-black p-6 rounded-xl 
                    shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                    hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] 
                    hover:-translate-y-1 transition-all duration-300
                    ${isEven ? 'md:text-left' : 'md:text-right'} // Chẵn lẻ căn trái phải
                  `}>
                    
                    {/* Mũi tên trỏ vào trục giữa (Trang trí) */}
                    <div className={`hidden md:block absolute top-6 w-4 h-4 bg-black rotate-45 border-r-2 border-b-2 border-white
                      ${isEven ? '-left-2 border-l-0 border-t-0' : '-right-2 border-r-0 border-b-0'}
                    `}></div>

                    {/* Năm tháng */}
                    <div className={`inline-flex items-center gap-1 font-bold text-sm bg-yellow-400 border-2 border-black px-2 py-0.5 rounded-md mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                      <Calendar size={12} /> {item.year}
                    </div>

                    <h3 className="text-xl font-black uppercase leading-tight mt-1">{item.title}</h3>
                    <div className="text-sm font-bold text-gray-500 mb-3 font-mono">@ {item.company}</div>
                    
                    <p className="text-gray-700 leading-relaxed text-sm font-medium mb-4">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold border-2 border-black px-2 py-1 rounded bg-gray-100 hover:bg-black hover:text-white transition-colors cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}