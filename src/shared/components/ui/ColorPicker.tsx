'use client';

import { Palette } from 'lucide-react';

interface ColorPickerProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    className?: string;
}

export default function ColorPicker({
    label = "Chọn màu",
    value = "#000000",
    onChange,
    error,
    className
}: ColorPickerProps) {

    const handleChange = (newValue: string) => {
        // Gọi hàm onChange của cha
        onChange(newValue);
    };

    return (
        <div className={`space-y-1 ${className}`}>
            {/* Label */}
            <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                <Palette size={10} /> {label}
            </label>

            <div className="flex gap-2">
                {/* 1. Visual Picker (Cục màu) */}
                <div className="relative w-10 h-10 border-2 border-black overflow-hidden shadow-sm hover:scale-105 transition-transform shrink-0 bg-white">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer p-0 border-0"
                    />
                </div>

                {/* 2. Text Input (Mã Hex) */}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        className="w-full h-full border-2 border-black p-2 font-mono uppercase text-sm outline-none focus:bg-gray-50"
                        placeholder="#000000"
                        maxLength={7}
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-[10px] font-bold">{error}</p>}

            {/* Preview (Optional) */}
            <div className="mt-1 flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Preview:</span>
                <div className="h-2 w-full rounded-full border border-gray-200" style={{ backgroundColor: value }}></div>
            </div>
        </div>
    );
}