// app/admin/page.tsx
'use client'; // File này chạy ở phía Client (trình duyệt)

import React, { useState, useEffect } from 'react';
import { Save, Lock, Plus, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blocks, setBlocks] = useState([]);
  
  // Form data để tạo block mới
  const [formData, setFormData] = useState({
    title: '',
    type: 'project',
    content: '',
    size: 'small',
    color: 'bg-white',
    link: ''
  });

  // 1. Lúc mới vào web: Check xem có lưu chìa khoá chưa
  useEffect(() => {
    const savedKey = localStorage.getItem('admin_secret');
    if (savedKey) {
      setSecret(savedKey);
      setIsAuthenticated(true);
      fetchBlocks(); // Lấy dữ liệu cũ về
    }
  }, []);

  // Hàm lấy danh sách Blocks
  const fetchBlocks = async () => {
    const res = await fetch('/api/blocks');
    const data = await res.json();
    setBlocks(data);
  };

  // 2. Xử lý đăng nhập
  const handleLogin = () => {
    // Lưu chìa khoá lại dùng cho lần sau
    localStorage.setItem('admin_secret', secret);
    setIsAuthenticated(true);
    fetchBlocks();
  };

  // 3. Xử lý Thêm Block mới
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gửi yêu cầu lên API
    const res = await fetch('/api/blocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': secret // Gửi kèm chìa khoá để mở cửa
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('✅ Đã thêm thành công!');
      fetchBlocks(); // Load lại danh sách
      // Reset form
      setFormData({ ...formData, title: '', content: '' });
    } else {
      alert('❌ Lỗi rồi! Có thể sai mã bí mật?');
    }
  };

  // Giao diện: Cửa chặn (Login)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-4">
        <div className="max-w-md w-full bg-black border-2 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lock /> KHU VỰC CẤM
          </h1>
          <p className="mb-4 text-gray-400">Nhập mã bí mật của ngài Zehel để vào.</p>
          <input
            type="password"
            className="w-full bg-zinc-800 border border-zinc-600 p-3 mb-4 text-white focus:outline-none focus:border-yellow-400"
            placeholder="Secret Key..."
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-black font-bold p-3 hover:bg-yellow-300 transition-colors"
          >
            MỞ CỬA
          </button>
        </div>
      </div>
    );
  }

  // Giao diện: Bảng điều khiển (Khi đã login)
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black uppercase">Admin Dashboard</h1>
          <button 
            onClick={() => {
              localStorage.removeItem('admin_secret');
              window.location.reload();
            }} 
            className="text-red-500 font-bold hover:underline"
          >
            Đăng xuất
          </button>
        </div>

        {/* FORM THÊM MỚI */}
        <div className="bg-white border-4 border-black p-6 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Plus className="bg-black text-white p-1 rounded" /> THÊM BLOCK MỚI
          </h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tiêu đề */}
            <div className="col-span-2">
              <label className="block font-bold text-sm mb-1">Tiêu đề</label>
              <input 
                required
                className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            {/* Loại Block */}
            <div>
              <label className="block font-bold text-sm mb-1">Loại (Type)</label>
              <select 
                className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="contact">Contact Form (Liên hệ)</option>
                <option value="project">Project (Dự án)</option>
                <option value="snippet">Snippet (Code)</option>
                <option value="social">Social (MXH)</option>
                <option value="status">Status (Trạng thái)</option>
                <option value="note">Note (Ghi chú)</option>
              </select>
            </div>

            {/* Kích thước */}
            <div>
              <label className="block font-bold text-sm mb-1">Size</label>
              <select 
                className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none"
                value={formData.size}
                onChange={e => setFormData({...formData, size: e.target.value as any})}
              >
                <option value="small">Small (1x1)</option>
                <option value="medium">Medium (2x1)</option>
                <option value="large">Large (2x2)</option>
              </select>
            </div>

            {/* Màu sắc */}
            <div>
              <label className="block font-bold text-sm mb-1">Màu nền</label>
              <select 
                className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none"
                value={formData.color}
                onChange={e => setFormData({...formData, color: e.target.value})}
              >
                <option value="bg-white">Trắng</option>
                <option value="bg-yellow-400">Vàng Nghệ</option>
                <option value="bg-green-400">Xanh Lá</option>
                <option value="bg-blue-400">Xanh Dương</option>
                <option value="bg-purple-400">Tím Mộng Mơ</option>
                <option value="bg-red-400">Đỏ Chót</option>
              </select>
            </div>

            {/* Link */}
            <div>
              <label className="block font-bold text-sm mb-1">Link (nếu có)</label>
              <input 
                className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none"
                value={formData.link}
                onChange={e => setFormData({...formData, link: e.target.value})}
                placeholder="https://..."
              />
            </div>

            {/* Nội dung */}
            <div className="col-span-2">
              <label className="block font-bold text-sm mb-1">Nội dung (Text/Markdown)</label>
              <textarea 
                className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none h-32"
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="col-span-2 bg-black text-white font-bold p-3 hover:bg-zinc-800 transition-transform hover:scale-[0.99]"
            >
              <Save className="inline mr-2 w-4 h-4" /> LƯU VÀO DATABASE
            </button>
          </form>
        </div>

        {/* DANH SÁCH HIỆN TẠI (Preview nhẹ) */}
       {/* DANH SÁCH HIỆN TẠI */}
        <div className="mt-12">
          <h3 className="font-bold mb-4 border-b-2 border-black inline-block text-xl">
            KHO HÀNG TRÊN DATABASE ({blocks.length})
          </h3>
          
          <div className="space-y-3">
            {blocks.map((b: any) => (
              <div 
                key={b._id} 
                className="flex justify-between items-center bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <div className="flex items-center gap-3">
                  {/* Hiển thị màu demo */}
                  <div className={`w-4 h-4 rounded-full border border-black ${b.color}`}></div>
                  
                  <div>
                    <span className="font-bold block">{b.title}</span>
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{b.type} • {b.size}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                   {/* Nút Xoá */}
                  <button 
                    onClick={async () => {
                      if(!confirm('Ngài Zehel chắc chắn muốn xoá cái này chứ?')) return;
                      
                      // Gọi API xoá
                      const res = await fetch(`/api/blocks/${b._id}`, {
                        method: 'DELETE',
                        headers: { 'x-admin-secret': secret }
                      });

                      if(res.ok) {
                        fetchBlocks(); // Load lại danh sách
                      } else {
                        alert('Lỗi xoá rồi đại vương ơi!');
                      }
                    }}
                    className="bg-red-500 text-white p-2 rounded border-2 border-transparent hover:border-black hover:bg-red-600 transition-colors"
                    title="Xoá vĩnh viễn"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            {blocks.length === 0 && (
              <p className="text-gray-500 italic">Chưa có gì cả, thêm mới đi ngài...</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}