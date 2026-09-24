import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  type?: NotificationType;
  title?: string;
  message: string;
  duration?: number;
}

export type NotifyOptions =
  | string
  | {
      type?: NotificationType;
      title?: string;
      message: string;
      duration?: number;
    };

interface NotificationContextType {
  notify: (options: NotifyOptions) => void;
  removeNotification: (id: string) => void;
  notifications: NotificationItem[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    (options: NotifyOptions) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const item: NotificationItem =
        typeof options === 'string'
          ? { id, type: 'success', title: 'Action Done', message: options, duration: 3500 }
          : {
              id,
              type: options.type || 'success',
              title: options.title || (options.type === 'error' ? 'Action Failed' : 'Action Done'),
              message: options.message,
              duration: options.duration || 3500,
            };

      setNotifications((prev) => [item, ...prev]);

      if (item.duration && item.duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, item.duration);
      }
    },
    [removeNotification]
  );

  return (
    <NotificationContext.Provider value={{ notify, removeNotification, notifications }}>
      {children}

      {/* Floating Square Boxed Notification Popup Stack (Mobile Compatible) */}
      <div
        aria-live="polite"
        className="fixed top-3 sm:top-5 left-3 right-3 sm:left-auto sm:right-5 z-50 flex flex-col gap-2.5 max-w-sm sm:w-96 pointer-events-none mx-auto sm:mx-0"
      >
        <AnimatePresence>
          {notifications.map((toast) => {
            const isSuccess = toast.type === 'success' || !toast.type;
            const isInfo = toast.type === 'info';
            const isWarning = toast.type === 'warning';
            const isError = toast.type === 'error';

            const borderAccent = isSuccess
              ? 'border-l-[#00c950]'
              : isInfo
              ? 'border-l-[#1d6bf3]'
              : isWarning
              ? 'border-l-amber-500'
              : 'border-l-rose-500';

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className={`pointer-events-auto rounded-none bg-white border border-slate-200 border-l-4 ${borderAccent} shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-3.5 sm:p-4 relative`}
                role="alert"
              >
                <div className="flex items-start gap-3">
                  {/* Square Icon Container */}
                  <div className="shrink-0 mt-0.5">
                    {isSuccess && (
                      <div className="w-7 h-7 rounded-none bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00c950]">
                        <CheckCircle2 className="w-4 h-4 stroke-[2.4]" />
                      </div>
                    )}
                    {isInfo && (
                      <div className="w-7 h-7 rounded-none bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1d6bf3]">
                        <Info className="w-4 h-4 stroke-[2.4]" />
                      </div>
                    )}
                    {isWarning && (
                      <div className="w-7 h-7 rounded-none bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                        <AlertTriangle className="w-4 h-4 stroke-[2.4]" />
                      </div>
                    )}
                    {isError && (
                      <div className="w-7 h-7 rounded-none bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                        <AlertCircle className="w-4 h-4 stroke-[2.4]" />
                      </div>
                    )}
                  </div>

                  {/* Text Content & Dismiss Button */}
                  <div className="flex-1 min-w-0 pr-1">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-slate-900 flex items-center gap-1.5">
                      <span>{toast.title}</span>
                    </h4>
                    <p className="text-xs font-normal text-slate-700 mt-1 leading-relaxed break-words">
                      {toast.message}
                    </p>

                    {/* Explicit Dismiss Button */}
                    <div className="mt-2.5 flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => removeNotification(toast.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-slate-700 hover:text-black bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-none transition-colors cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>

                  {/* Top-Right Corner Close Icon Button */}
                  <button
                    type="button"
                    onClick={() => removeNotification(toast.id)}
                    className="shrink-0 -mr-1 -mt-1 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-none transition-colors cursor-pointer"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Timer Progress Bar (Square) */}
                {toast.duration && toast.duration > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: (toast.duration || 3500) / 1000, ease: 'linear' }}
                      className={`h-full ${
                        isSuccess
                          ? 'bg-[#00c950]'
                          : isInfo
                          ? 'bg-[#1d6bf3]'
                          : isWarning
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
