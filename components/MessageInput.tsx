import React, { useState, useRef, KeyboardEvent } from 'react';
import { AIAction } from '../types';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onAIAction: (action: AIAction, currentText: string) => void;
  channelName: string;
  isTyping?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, onAIAction, channelName, isTyping }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        onSendMessage(text);
        setText('');
      }
    }
  };

  const handleAction = (action: AIAction) => {
    onAIAction(action, text);
  };

  return (
    <footer className="px-4 pb-6 bg-background-light dark:bg-background-dark pt-2">
      {/* AI Tool bar */}
      <div className="mb-2 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => handleAction(AIAction.SUMMARIZE)}
          className="glow-ai flex items-center space-x-2 px-3 py-1.5 bg-ai-accent text-white rounded-lg text-xs font-semibold hover:opacity-90 hover:scale-105 transition-all flex-shrink-0"
        >
          <span className="material-symbols-outlined !text-sm">summarize</span>
          <span>Summarize Conversation</span>
        </button>
        <button 
          onClick={() => handleAction(AIAction.IMPROVE_TONE)}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-200 dark:bg-[#383a40] text-slate-600 dark:text-slate-300 rounded-lg text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex-shrink-0"
        >
          <span className="material-symbols-outlined !text-sm">auto_fix</span>
          <span>Improve Tone</span>
        </button>
        <button 
          onClick={() => handleAction(AIAction.TRANSLATE)}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-200 dark:bg-[#383a40] text-slate-600 dark:text-slate-300 rounded-lg text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex-shrink-0"
        >
          <span className="material-symbols-outlined !text-sm">translate</span>
          <span>Translate</span>
        </button>
      </div>

      {/* Input Bar */}
      <div className="relative">
        <div className="bg-slate-200/70 dark:bg-[#383a40] rounded-xl flex items-center p-1 shadow-sm focus-within:shadow-md transition-shadow focus-within:ring-1 focus-within:ring-indigo-500/50">
          <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          
          <input 
            ref={inputRef}
            className="flex-1 bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-500 dark:placeholder:text-slate-400 py-3 text-slate-900 dark:text-slate-100" 
            placeholder={`Message #${channelName}`} 
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <div className="flex items-center space-x-1 pr-1">
            <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:block">
               <span className="material-symbols-outlined">gif_box</span>
            </button>
            <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
               <span className="material-symbols-outlined">sentiment_satisfied</span>
            </button>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>
            <button 
                onClick={() => { if(text.trim()) { onSendMessage(text); setText(''); } }}
                className={`h-9 px-3 rounded-lg flex items-center justify-center space-x-1 transition-all transform active:scale-95 shadow-lg ${text.trim() ? 'bg-primary hover:bg-[#4752c4] text-white shadow-primary/20' : 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                disabled={!text.trim()}
            >
              <span className="text-xs font-bold uppercase hidden sm:inline">Send</span>
              <span className="material-symbols-outlined !text-lg">send</span>
            </button>
          </div>
        </div>
        
        <div className="mt-1.5 px-1 min-h-[1.5em]">
             {isTyping && (
                <div className="text-[10px] text-slate-400 italic animate-pulse">
                    <span className="font-bold">Creative Assistant</span> is thinking...
                </div>
             )}
        </div>
      </div>
    </footer>
  );
};

export default MessageInput;