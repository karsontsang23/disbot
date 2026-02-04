import React from 'react';
import { Server } from '../types';

interface ServerListProps {
  servers: Server[];
  activeServerId: string;
  onSelectServer: (id: string) => void;
}

const ServerList: React.FC<ServerListProps> = ({ servers, activeServerId, onSelectServer }) => {
  return (
    <aside className="w-[72px] flex-shrink-0 bg-slate-200 dark:bg-server-dark flex flex-col items-center py-3 space-y-2 hidden md:flex border-r border-slate-300/50 dark:border-black/20 z-20">
      {/* Home / Direct Messages */}
      <div className="mb-2 relative group w-full flex justify-center">
         {/* Indicator */}
         <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-slate-900 dark:bg-white rounded-r-full transition-all duration-200 ${activeServerId === 's1' ? 'h-10' : 'h-2 scale-0 group-hover:scale-100 group-hover:h-5'}`}></div>
         
         <div 
           className="w-12 h-12 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-[16px] flex items-center justify-center text-white cursor-pointer hover:rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20"
           onClick={() => onSelectServer('s1')}
         >
          <span className="material-symbols-outlined !text-3xl">auto_awesome</span>
        </div>
      </div>

      <div className="w-8 h-[2px] bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-1"></div>

      <div className="flex-1 w-full flex flex-col items-center space-y-2 overflow-y-auto no-scrollbar pb-4">
        {servers.slice(1).map((server) => {
           const isActive = activeServerId === server.id;
           const isImage = server.icon && server.icon.startsWith('http');
           
           return (
            <div key={server.id} className="relative group w-full flex justify-center">
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-slate-900 dark:bg-white rounded-r-full transition-all duration-200 ${isActive ? 'h-10' : 'h-2 scale-0 group-hover:scale-100 group-hover:h-5'}`}></div>
              
              <div 
                className={`server-icon ${isActive ? '!rounded-[30%] !bg-primary !text-white' : ''} ${!isImage && server.name === 'Design Hub' && isActive ? '!bg-primary' : ''} `}
                onClick={() => onSelectServer(server.id)}
              >
                {isImage ? (
                  <img src={server.icon} alt={server.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined">{server.icon}</span>
                )}
              </div>
            </div>
           );
        })}

        <div className="server-icon text-emerald-500 hover:!bg-emerald-500 group">
          <span className="material-symbols-outlined group-hover:text-white transition-colors">add</span>
        </div>
        <div className="server-icon text-emerald-500 hover:!bg-emerald-500 group">
          <span className="material-symbols-outlined group-hover:text-white transition-colors">explore</span>
        </div>
      </div>
    </aside>
  );
};

export default ServerList;