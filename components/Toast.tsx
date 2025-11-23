import React, { useEffect } from 'react';
import { ICONS } from '../constants';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info';
}

interface Props {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<Props> = ({ messages, onRemove }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {messages.map((msg) => (
        <ToastItem key={msg.id} message={msg} onRemove={onRemove} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ message: ToastMessage; onRemove: (id: string) => void }> = ({ message, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(message.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [message.id, onRemove]);

  return (
    <div className="pointer-events-auto flex items-start gap-3 p-4 bg-slate-900 border border-slate-700 rounded-lg shadow-xl shadow-black/50 w-80 animate-slide-up">
      <div className={`${message.type === 'success' ? 'text-green-500' : 'text-blue-500'} mt-0.5`}>
        {message.type === 'success' ? ICONS.Database : ICONS.Activity}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">{message.title}</h4>
        <p className="text-xs text-slate-400 mt-1">{message.description}</p>
      </div>
    </div>
  );
};

export default ToastContainer;