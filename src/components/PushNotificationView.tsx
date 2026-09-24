import React, { useState, useRef } from 'react';
import { useNotification } from '../context/NotificationContext';
import { AdminView } from '../types';

interface PushNotificationViewProps {
  onNavigate?: (view: AdminView) => void;
}

export const PushNotificationView: React.FC<PushNotificationViewProps> = ({ onNavigate }) => {
  const { notify } = useNotification();
  const [heading, setHeading] = useState('');
  const [message, setMessage] = useState('');
  const [onClickLink, setOnClickLink] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      notify({ message: 'Message is required', type: 'warning' });
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      notify({
        message: 'Push Notification Sent Successfully!',
        type: 'success',
      });
      setIsSending(false);
      setHeading('');
      setMessage('');
      setOnClickLink('');
      setThumbnail(null);
      setFileName('No file chosen');
    }, 500);
  };

  return (
    <div className="space-y-4">
      {/* Title & Breadcrumbs (Image 8) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Push Notifications
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <span
            onClick={() => onNavigate?.('dashboard')}
            className="hover:text-gray-700 cursor-pointer"
          >
            Home
          </span>
          <span>&gt;</span>
          <span className="hover:text-gray-700 cursor-pointer">Notify</span>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">Push Notifications</span>
        </div>
      </div>

      {/* Main Card (Image 8) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden p-6 sm:p-10">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto space-y-8">
          {/* Centered Heading */}
          <h3 className="text-center text-lg sm:text-xl font-bold text-gray-900">
            Push Notification
          </h3>

          {/* Heading Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-800">
              Heading
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full pb-2 text-xs text-gray-900 border-b border-gray-200 outline-none focus:border-blue-500 transition-colors bg-transparent"
            />
          </div>

          {/* Message Input (Required) */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-800">
              Message (Required)
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full pb-2 text-xs text-gray-900 border-b border-gray-200 outline-none focus:border-blue-500 transition-colors bg-transparent"
            />
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-800">
              Thumbnail
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-[#f3e8ff] hover:bg-[#ebd5ff] text-[#9333ea] border border-[#e9d5ff] rounded-md text-xs font-semibold cursor-pointer transition-colors"
              >
                Choose File
              </button>
              <span className="text-xs text-gray-500 truncate max-w-[240px]">
                {fileName}
              </span>
            </div>
            <p className="text-[10px] text-gray-400">
              JPG, PNG, GIF or WebP — Max 5 MB
            </p>

            {/* Thumbnail Preview Area */}
            <div className="w-56 h-36 mt-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Push Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400 font-medium">
                  No thumbnail
                </span>
              )}
            </div>
          </div>

          {/* On Click Link Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-800">
              On Click Link
            </label>
            <input
              type="text"
              value={onClickLink}
              onChange={(e) => setOnClickLink(e.target.value)}
              className="w-full pb-2 text-xs text-gray-900 border-b border-gray-200 outline-none focus:border-blue-500 transition-colors bg-transparent"
            />
          </div>

          {/* Send Now Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSending}
              className="px-8 py-2.5 bg-[#00c853] hover:bg-[#00b248] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSending ? 'Sending...' : 'Send Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
