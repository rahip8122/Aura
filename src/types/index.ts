export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

export interface MentalHealthResource {
  name: string;
  type: 'helpline' | 'website' | 'organization';
  contact?: string;
  website?: string;
  description: string;
  availability?: string;
}