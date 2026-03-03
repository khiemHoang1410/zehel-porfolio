//src/shared/components/ui/NeoButton.tsx
'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper để gộp class cho sạch
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface NeoButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export default function NeoButton({ 
    variant = 'primary', 
    size = 'md', 
    className, 
    children, 
    ...props 
}: NeoButtonProps) {
    
    const variants = {
        primary: "bg-yellow-300 text-black hover:bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        secondary: "bg-white text-black border-2 border-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        danger: "bg-red-500 text-white border-2 border-black hover:bg-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
    };

    const sizes = {
        sm: "px-3 py-1 text-sm font-bold",
        md: "px-6 py-3 text-lg font-black",
        lg: "px-8 py-4 text-xl font-black uppercase"
    };

    return (
        <motion.button
            whileHover={{ translateX: -2, translateY: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
            whileTap={{ translateX: 2, translateY: 2, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
            className={cn(
                "inline-flex items-center gap-2 transition-all border-2 border-black active:shadow-none",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}