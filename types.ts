export interface User {
  id: string;
  name: string;
  avatar: string;
  discriminator?: string; // e.g. #4482
  status: 'online' | 'offline' | 'idle' | 'dnd';
  isBot?: boolean;
}

export interface Attachment {
  type: 'image' | 'file';
  url: string;
  title?: string;
  description?: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  me: boolean;
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: string; // ISO string or formatted time
  attachments?: Attachment[];
  reactions?: Reaction[];
  isAi?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  unread?: boolean;
}

export interface Server {
  id: string;
  name: string;
  icon?: string; // URL or material icon name
  active?: boolean;
}

export enum AIAction {
  SUMMARIZE = 'summarize',
  IMPROVE_TONE = 'improve_tone',
  TRANSLATE = 'translate'
}