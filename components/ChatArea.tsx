import React, { useEffect, useRef } from 'react';
import { Message, Channel, AIAction } from '../types';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatAreaProps {
  channel: Channel;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onAIAction: (action: AIAction, text: string) => void;
  isAiTyping: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({ channel, messages, onSendMessage, onAIAction, isAiTyping }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  return (
    <main className="flex-1 flex flex-col min-w-0 relative bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="h-12 px-4 flex-shrink-0 flex items-center justify-between border-b border-slate-300/50 dark:border-slate-900/50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm z-10 sticky top-0">
        <div className="flex items-center space-x-2 min-w-0">
          <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">tag</span>
          <h2 className="font-bold text-base truncate text-slate-900 dark:text-white">{channel.name}</h2>
          <div className="hidden md:block w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>
          <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400 truncate">
             The catch-all place for anything and everything.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 sm:space-x-4 text-slate-600 dark:text-slate-400">
          <button className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"><span className="material-symbols-outlined text-xl">notifications</span></button>
          <button className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors hidden sm:block"><span className="material-symbols-outlined text-xl">push_pin</span></button>
          <button className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors md:hidden"><span className="material-symbols-outlined text-xl">group</span></button>
          
          <div className="relative flex items-center group hidden sm:flex">
            <input 
                className="bg-slate-200 dark:bg-server-dark border-none h-6 text-xs rounded px-2 w-36 focus:ring-0 focus:w-48 transition-all placeholder-slate-500 text-slate-800 dark:text-slate-200" 
                placeholder="Search" 
                type="text"
            />
            <span className="material-symbols-outlined text-sm absolute right-1.5 pointer-events-none opacity-50 group-focus-within:opacity-100">search</span>
          </div>
          
          <button className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"><span className="material-symbols-outlined text-xl">help</span></button>
        </div>
      </header>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
        {/* Welcome Banner */}
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800 mt-10">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-slate-600 dark:text-slate-300">tag</span>
          </div>
          <h1 className="text-3xl font-bold mb-1 text-slate-900 dark:text-white">Welcome to #{channel.name}!</h1>
          <p className="text-slate-500 dark:text-slate-400">This is the start of the #{channel.name} channel.</p>
        </div>

        {/* Message List */}
        {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
        ))}
        
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <MessageInput 
        onSendMessage={onSendMessage} 
        onAIAction={onAIAction}
        channelName={channel.name} 
        isTyping={isAiTyping}
      />
    </main>
  );
};

export default ChatArea;