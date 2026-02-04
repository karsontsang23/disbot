import React from 'react';
import { Message, User } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender.isBot;
  
  // Dynamic Styles based on bot status
  const containerClass = isBot 
    ? "flex group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 -mx-4 px-4 py-2 transition-colors relative"
    : "flex group hover:bg-slate-50 dark:hover:bg-slate-800/20 -mx-4 px-4 py-1.5 transition-colors relative";
    
  return (
    <div className={containerClass}>
      {/* Avatar */}
      <div className="flex-shrink-0 mr-4 mt-0.5">
        {isBot ? (
          <div className="w-10 h-10 rounded-full bg-ai-accent flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <span className="material-symbols-outlined text-xl">smart_toy</span>
          </div>
        ) : (
          <img src={message.sender.avatar} alt={message.sender.name} className="w-10 h-10 rounded-full object-cover" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-12">
        <div className="flex items-baseline space-x-2">
          <span 
            className={`font-semibold hover:underline cursor-pointer ${
                isBot ? 'text-ai-accent' : 
                message.sender.name === 'DevMike' ? 'text-emerald-500 dark:text-emerald-400' :
                'text-indigo-500 dark:text-indigo-400'
            }`}
          >
            {message.sender.name}
          </span>
          {isBot && (
             <span className="bg-primary text-[10px] px-1 rounded text-white font-bold uppercase py-0.5 leading-tight shadow-sm">Bot</span>
          )}
          <span className="text-[10px] text-slate-500 dark:text-slate-400">{message.timestamp}</span>
        </div>

        <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {/* Simple processing for mentions/channels */}
            {message.content.split(' ').map((word, i) => {
                if (word.startsWith('#')) return <span key={i} className="text-primary hover:underline cursor-pointer">{word} </span>;
                return word + ' ';
            })}
        </div>

        {/* Attachments (e.g. Bot Cards) */}
        {message.attachments && message.attachments.map((att, idx) => (
           <div key={idx} className="mt-2 max-w-md bg-slate-100 dark:bg-sidebar-dark border-l-4 border-ai-accent rounded-r p-4 shadow-sm">
             {att.title && <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">{att.title}</h4>}
             {att.description && <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{att.description}</p>}
             {att.url && (
                <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                    <img src={att.url} alt="Attachment" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                </div>
             )}
           </div>
        ))}

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
            <div className="flex space-x-2 mt-2">
                {message.reactions.map((r, idx) => (
                    <div key={idx} className={`px-2 py-0.5 rounded-md flex items-center space-x-1 border border-transparent hover:border-primary cursor-pointer transition-colors ${r.me ? 'bg-indigo-100/50 dark:bg-indigo-900/30 border-indigo-500/30' : 'bg-slate-200/50 dark:bg-slate-700/50'}`}>
                        <span className="text-xs">{r.emoji}</span>
                        <span className="text-xs font-bold text-primary">{r.count}</span>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* Hover Actions */}
      <div className="absolute top-0 right-4 -translate-y-1/2 bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 z-10">
        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 dark:text-slate-400" title="Add Reaction">
            <span className="material-symbols-outlined text-lg">add_reaction</span>
        </button>
        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 dark:text-slate-400" title="Reply">
            <span className="material-symbols-outlined text-lg">reply</span>
        </button>
        {isBot && (
            <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 dark:text-slate-400" title="Regenerate">
                <span className="material-symbols-outlined text-lg">refresh</span>
            </button>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;