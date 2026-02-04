import React, { useState } from 'react';
import { Channel, User } from '../types';

interface ChannelListProps {
  channels: Channel[];
  activeChannelId: string;
  onSelectChannel: (id: string) => void;
  currentUser: User;
}

const ChannelList: React.FC<ChannelListProps> = ({ channels, activeChannelId, onSelectChannel, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels.filter(channel => 
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const aiName = 'creative-gen';
  const showAiSection = aiName.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <aside className="w-60 flex-shrink-0 bg-sidebar-light dark:bg-sidebar-dark flex flex-col hidden lg:flex border-r border-slate-300/50 dark:border-slate-900/50">
      <div className="h-12 px-4 flex items-center justify-between border-b border-slate-300/50 dark:border-slate-900/50 shadow-sm hover:bg-slate-300/20 dark:hover:bg-slate-700/20 cursor-pointer transition-colors flex-shrink-0">
        <h1 className="font-bold text-sm truncate uppercase tracking-tight">The Creative Hub</h1>
        <span className="material-symbols-outlined text-lg">expand_more</span>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {/* Search Input */}
        <div className="px-2 pb-2">
          <div className="relative">
             <input 
               type="text" 
               placeholder="Find channels..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-slate-200 dark:bg-[#1e1f22] text-slate-900 dark:text-slate-200 text-xs rounded px-2 py-1.5 border-none focus:ring-0 placeholder-slate-500 transition-colors"
             />
             <span className="material-symbols-outlined absolute right-2 top-1.5 text-slate-500 text-sm pointer-events-none">search</span>
          </div>
        </div>

        {/* Category: CHAT */}
        {filteredChannels.length > 0 && (
          <div>
            <div className="flex items-center px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
              <span className="material-symbols-outlined text-xs mr-1">expand_more</span>
              Chat
            </div>
            <div className="space-y-0.5">
              {filteredChannels.map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => onSelectChannel(channel.id)}
                  className={`flex items-center px-2 py-1.5 rounded cursor-pointer transition-colors group ${
                    activeChannelId === channel.id
                      ? 'bg-slate-300/50 dark:bg-slate-700/50 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-300/30 dark:hover:bg-slate-700/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl mr-1.5 opacity-60">tag</span>
                  <span className={`font-medium text-sm ${channel.unread ? 'font-bold dark:text-white' : ''}`}>
                      {channel.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category: AI ASSISTANTS */}
        {showAiSection && (
          <div>
            <div className="flex items-center px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
              <span className="material-symbols-outlined text-xs mr-1">expand_more</span>
              AI Assistants
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center px-2 py-1.5 rounded hover:bg-slate-300/30 dark:hover:bg-slate-700/30 text-slate-600 dark:text-slate-400 cursor-pointer transition-colors group">
                <span className="material-symbols-outlined text-xl mr-1.5 opacity-60">smart_toy</span>
                <span className="font-medium text-sm">{aiName}</span>
              </div>
            </div>
          </div>
        )}
        
        {filteredChannels.length === 0 && !showAiSection && (
            <div className="text-center text-xs text-slate-500 mt-4">
                No channels found
            </div>
        )}
      </div>

      {/* User Status Bar */}
      <div className="p-2 bg-slate-200 dark:bg-[#232428] flex items-center space-x-2 flex-shrink-0">
        <div className="relative group cursor-pointer">
          <img src={currentUser.avatar} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-200 dark:border-[#232428] rounded-full"></div>
        </div>
        <div className="flex-1 min-w-0 cursor-pointer">
          <div className="text-xs font-bold truncate">{currentUser.name}</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{currentUser.discriminator}</div>
        </div>
        <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
          <button className="p-1 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition-colors relative group">
              <span className="material-symbols-outlined text-lg">mic</span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Unmute</div>
          </button>
          <button className="p-1 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition-colors">
              <span className="material-symbols-outlined text-lg">headphones</span>
          </button>
          <button className="p-1 hover:bg-slate-300 dark:hover:bg-slate-700 rounded transition-colors">
              <span className="material-symbols-outlined text-lg">settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ChannelList;