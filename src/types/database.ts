
export type Profile = {
  id: string;
  display_name: string | null;
  created_at: string;
  last_login: string | null;
  settings: Record<string, any>;
};

export type Resume = {
  id: string;
  user_id: string;
  file_url: string | null;
  file_name: string;
  parsed_text: string | null;
  metadata: Record<string, any>;
  created_at: string;
};

export type ChatSession = {
  id: string;
  user_id: string;
  resume_id: string | null;
  session_title: string;
  created_at: string;
  updated_at: string;
};

export type MessageSender = 'user' | 'ai';

export type Message = {
  id: string;
  chat_session_id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  metadata: Record<string, any>;
};

export type Feedback = {
  id: string;
  message_id: string;
  user_id: string;
  rating: number | null;
  comments: string | null;
  created_at: string;
};
