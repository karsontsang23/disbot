import React, { useState, useCallback } from 'react';
import { SERVERS, CHANNELS, INITIAL_MESSAGES, MOCK_USERS, CURRENT_USER, AI_BOT } from './constants';
import { Message, AIAction } from './types';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import MemberList from './components/MemberList';
import ChatArea from './components/ChatArea';
import { sendMessageToGemini, summarizeConversation, improveTone, translateText } from './services/geminiService';

const App: React.FC = () => {
  const [activeServerId, setActiveServerId] = useState(SERVERS[1].id);
  const [activeChannelId, setActiveChannelId] = useState(CHANNELS[0].id);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Derived state
  const activeChannel = CHANNELS.find(c => c.id === activeChannelId) || CHANNELS[0];
  const onlineUsers = MOCK_USERS.filter(u => u.status !== 'offline');
  const offlineUsers = MOCK_USERS.filter(u => u.status === 'offline');

  const addMessage = (content: string, isAi: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: isAi ? AI_BOT : CURRENT_USER,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAi
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage; // Return for side effects
  };

  const handleSendMessage = async (text: string) => {
    // 1. Add User Message
    addMessage(text);

    // 2. Trigger AI Response (Simplified: AI always responds in this demo if addressed or random chance)
    // For demo purposes, let's make the AI respond if it's mentioned or the channel is 'general'
    // To make it feel "Live", we always send context to Gemini but maybe only reply if pertinent.
    // For this prompt, let's make it always reply to show off the integration.
    setIsAiTyping(true);
    try {
        const aiResponse = await sendMessageToGemini(messages, text);
        addMessage(aiResponse, true);
    } catch (e) {
        console.error(e);
    } finally {
        setIsAiTyping(false);
    }
  };

  const handleAIAction = async (action: AIAction, currentText: string) => {
    setIsAiTyping(true);
    try {
        if (action === AIAction.SUMMARIZE) {
            const summary = await summarizeConversation(messages);
            // We present the summary as a specialized system message or AI message
            addMessage(`**Conversation Summary:**\n\n${summary}`, true);
        } else if (action === AIAction.IMPROVE_TONE) {
             if (!currentText) return; // Need text to improve
             const improved = await improveTone(currentText);
             // In a real app, this would replace the input value. 
             // Since Input is controlled internally or via ref, we'll just send it as a message for demo
             // OR prompt the user. For this UX, let's put it in the chat as a suggestion.
             addMessage(`**Suggested Improvement:**\n"${improved}"`, true);
        } else if (action === AIAction.TRANSLATE) {
             if (!currentText) return;
             const translated = await translateText(currentText, "Spanish");
             addMessage(`**Translation (Spanish):**\n"${translated}"`, true);
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsAiTyping(false);
    }
  };

  // Toggle Dark Mode
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`flex w-full h-full ${isDarkMode ? 'dark' : ''}`}>
      <ServerList 
        servers={SERVERS} 
        activeServerId={activeServerId} 
        onSelectServer={setActiveServerId} 
      />
      
      <ChannelList 
        channels={CHANNELS} 
        activeChannelId={activeChannelId} 
        onSelectChannel={setActiveChannelId}
        currentUser={CURRENT_USER}
      />
      
      <ChatArea 
        channel={activeChannel}
        messages={messages}
        onSendMessage={handleSendMessage}
        onAIAction={handleAIAction}
        isAiTyping={isAiTyping}
      />
      
      <MemberList 
        onlineUsers={onlineUsers} 
        offlineUsers={offlineUsers} 
      />

      {/* Theme Toggle FAB */}
      <button 
        className="fixed bottom-4 right-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform flex items-center justify-center border border-slate-200 dark:border-slate-700"
        onClick={toggleTheme}
        title="Toggle Theme"
      >
        <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
      </button>
    </div>
  );
};

export default App;