
import React from 'react';
import { User } from '../types';

interface MemberListProps {
  onlineUsers: User[];
  offlineUsers: User[];
}

const MemberList: React.FC<MemberListProps> = ({ onlineUsers, offlineUsers }) => {
  // Added key property to satisfy TypeScript when used as a JSX element in a list
  const UserRow = ({ user, opacity = 1 }: { user: User; opacity?: number; key?: React.Key }) => (
    <div 
        className={`flex items-center p-2 rounded hover:bg-slate-300/30 dark:hover:bg-slate-700/30 cursor-pointer transition-colors group ${opacity < 1 ? 'opacity-50 grayscale' : ''}`}
    >
      <div className="relative mr-3">
        {user.avatar && user.avatar.startsWith('http') ? (
             <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${user.avatar === 'smart_toy' ? 'bg-ai-accent' : 'bg-slate-400'}`}>
                {user.avatar === 'smart_toy' ? <span className="material-symbols-outlined text-sm">smart_toy</span> : 'JD'}
            </div>
        )}
        
        {user.status !== 'offline' && (
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-sidebar-light dark:border-sidebar-dark rounded-full"></div>
        )}
      </div>
      <div>
           <span className={`text-sm font-medium truncate ${user.name.includes('Sarah') ? 'text-pink-500 dark:text-pink-400' : ''}`}>{user.name}</span>
           {user.isBot && <span className="ml-2 bg-primary text-[10px] px-1 rounded text-white font-bold uppercase py-0.5 leading-tight">Bot</span>}
      </div>
     
    </div>
  );

  return (
    <aside className="w-60 flex-shrink-0 bg-sidebar-light dark:bg-sidebar-dark py-4 px-3 space-y-4 hidden xl:flex flex-col border-l border-slate-300/50 dark:border-slate-900/50">
      <div>
        <h3 className="px-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Online — {onlineUsers.length}</h3>
        <div className="space-y-1">
          {onlineUsers.map(u => <UserRow key={u.id} user={u} />)}
        </div>
      </div>
      <div>
        <h3 className="px-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Offline — {offlineUsers.length + 11}</h3>
        <div className="space-y-1">
          {offlineUsers.map(u => <UserRow key={u.id} user={u} opacity={0.5} />)}
          {/* Mocking extra offline users */}
        </div>
      </div>
    </aside>
  );
};

export default MemberList;
