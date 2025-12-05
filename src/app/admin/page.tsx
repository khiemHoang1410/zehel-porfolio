// app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Save, Lock, Plus, Trash2, Mail, Layout, MessageSquare } from 'lucide-react';

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Tab chuyển đổi: 'blocks' hoặc 'messages'
  const [activeTab, setActiveTab] = useState<'blocks' | 'messages'>('blocks');

  const [blocks, setBlocks] = useState([]);
  const [messages, setMessages] = useState([]); // Lưu tin nhắn

  const [formData, setFormData] = useState({
    title: '',
    type: 'project',
    content: '',
    size: 'small',
    color: 'bg-white',
    link: ''
  });

  useEffect(() => {
    const savedKey = localStorage.getItem('admin_secret');
    if (savedKey) {
      setSecret(savedKey);
      setIsAuthenticated(true);
      fetchBlocks();
    }
  }, []);

  // Khi chuyển tab thì load dữ liệu tương ứng
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'blocks') fetchBlocks();
      if (activeTab === 'messages') fetchMessages();
    }
  }, [activeTab, isAuthenticated]);

  const fetchBlocks = async () => {
    const res = await fetch('/api/blocks');
    const data = await res.json();
    setBlocks(data);
  };

  const fetchMessages = async () => {
    const res = await fetch('/api/messages', {
      headers: { 'x-admin-secret': secret } // API này cần bảo mật
    });
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  const handleLogin = () => {
    localStorage.setItem('admin_secret', secret);
    setIsAuthenticated(true);
    fetchBlocks();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/blocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': secret
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('✅ Đã thêm thành công!');
      fetchBlocks();
      setFormData({ ...formData, title: '', content: '' });
    } else {
      alert('❌ Lỗi rồi! Có thể sai mã bí mật?');
    }
  };

  // --- GIAO DIỆN LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white p-4">
        <div className="max-w-md w-full bg-black border-2 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lock /> KHU VỰC CẤM
          </h1>
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

  // --- GIAO DIỆN DASHBOARD ---
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-black font-mono">
      <div className="max-w-5xl mx-auto">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-black uppercase">Admin Dashboard</h1>
          
          <div className="flex bg-white border-2 border-black rounded-lg overflow-hidden">
            <button 
              onClick={() => setActiveTab('blocks')}
              className={`p-3 px-6 font-bold flex gap-2 ${activeTab === 'blocks' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
            >
              <Layout size={20} /> Content
            </button>
            <div className="w-[2px] bg-black"></div>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`p-3 px-6 font-bold flex gap-2 ${activeTab === 'messages' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
            >
              <Mail size={20} /> Inbox ({messages.length})
            </button>
          </div>

          <button 
            onClick={() => {
              localStorage.removeItem('admin_secret');
              window.location.reload();
            }} 
            className="text-red-500 font-bold hover:underline"
          >
            Log Out
          </button>
        </div>

        {/* --- TAB 1: QUẢN LÝ BLOCKS --- */}
        {activeTab === 'blocks' && (
          <>
            <div className="bg-white border-4 border-black p-6 mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Plus className="bg-black text-white p-1 rounded" /> THÊM BLOCK MỚI
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block font-bold text-sm mb-1">Tiêu đề</label>
                  <input required className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block font-bold text-sm mb-1">Loại (Type)</label>
                  <select className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="project">Project (Dự án)</option>
                    <option value="snippet">Snippet (Code)</option>
                    <option value="social">Social (MXH)</option>
                    <option value="note">Note (Ghi chú)</option>
                    <option value="status">Status (Trạng thái)</option>
                    <option value="contact">Contact Form (Liên hệ)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-sm mb-1">Size</label>
                  <select className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value as any})}>
                    <option value="small">Small (1x1)</option>
                    <option value="medium">Medium (2x1)</option>
                    <option value="large">Large (2x2)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-sm mb-1">Màu nền</label>
                  <select className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})}>
                    <option value="bg-white">Trắng</option>
                    <option value="bg-yellow-400">Vàng Nghệ</option>
                    <option value="bg-green-400">Xanh Lá</option>
                    <option value="bg-blue-400">Xanh Dương</option>
                    <option value="bg-purple-400">Tím Mộng Mơ</option>
                    <option value="bg-red-400">Đỏ Chót</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-sm mb-1">Link</label>
                  <input className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-sm mb-1">Nội dung</label>
                  <textarea className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none h-32" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
                </div>
                <button type="submit" className="col-span-2 bg-black text-white font-bold p-3 hover:bg-zinc-800 transition-transform hover:scale-[0.99]">
                  <Save className="inline mr-2 w-4 h-4" /> LƯU VÀO DATABASE
                </button>
              </form>
            </div>

            {/* List Blocks */}
            <div className="space-y-3">
              {blocks.map((b: any) => (
                <div key={b._id} className="flex justify-between items-center bg-white p-4 border-2 border-black shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border border-black ${b.color}`}></div>
                    <div><span className="font-bold block">{b.title}</span><span className="text-xs text-gray-500 uppercase">{b.type}</span></div>
                  </div>
                  <button 
                    onClick={async () => {
                      if(!confirm('Xoá nhé?')) return;
                      const res = await fetch(`/api/blocks/${b._id}`, { method: 'DELETE', headers: { 'x-admin-secret': secret } });
                      if(res.ok) fetchBlocks();
                    }}
                    className="text-red-500 hover:bg-red-100 p-2 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* --- TAB 2: HỘP THƯ ĐẾN --- */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
             {messages.length === 0 ? (
               <div className="text-center py-20 text-gray-500">Hộp thư trống trơn. Chưa có ai liên hệ cả 🥲</div>
             ) : (
               messages.map((msg: any) => (
                 <div key={msg._id} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-2">
                      <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          <MessageSquare size={18} className="text-blue-600"/> {msg.name}
                        </h3>
                        <p className="text-sm text-gray-500">{msg.email}</p>
                      </div>
                      <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
                        {new Date(msg.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed bg-gray-50 p-3 rounded border border-gray-200">
                      {msg.content}
                    </p>
                 </div>
               ))
             )}
          </div>
        )}

      </div>
    </div>
  );
}