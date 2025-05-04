
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@clerk/clerk-react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  chat_session_id: string;
  metadata: Record<string, any>;
}

export interface ChatSession {
  id: string;
  created_at: string;
  updated_at: string;
  session_title: string | null;
  user_id: string;
  resume_id: string | null;
}

// Function to get user ID from Clerk
const getUserId = () => {
  const auth = useAuth();
  return auth.userId || '';
};

export const createChatSession = async (title: string = 'New Chat Session', resumeId?: string): Promise<ChatSession | null> => {
  try {
    const userId = getUserId();
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        user_id: userId,
        session_title: title,
        resume_id: resumeId || null
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as ChatSession;
  } catch (error) {
    console.error('Error creating chat session:', error);
    return null;
  }
};

export const getChatSession = async (sessionId: string): Promise<ChatSession | null> => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    if (error) throw error;
    return data as ChatSession;
  } catch (error) {
    console.error('Error fetching chat session:', error);
    return null;
  }
};

export const getChatSessionsByUser = async (): Promise<ChatSession[]> => {
  try {
    const userId = getUserId();
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as ChatSession[];
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return [];
  }
};

export const saveMessage = async (
  chat_session_id: string,
  content: string,
  sender: 'user' | 'ai',
  metadata: Record<string, any> | null = null
): Promise<Message | null> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_session_id,
        content,
        sender,
        metadata: metadata || {}
      })
      .select()
      .single();
    
    if (error) throw error;
    return data as Message;
  } catch (error) {
    console.error('Error saving message:', error);
    return null;
  }
};

// Add sendMessage as an alias for saveMessage for backward compatibility
export const sendMessage = async (
  chat_session_id: string,
  content: string,
  sender: 'user' | 'ai' = 'user',
  metadata: Record<string, any> | null = null
): Promise<Message | null> => {
  return saveMessage(chat_session_id, content, sender, metadata);
};

export const getMessagesBySessionId = async (chatSessionId: string): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_session_id', chatSessionId)
      .order('timestamp', { ascending: true });
    
    if (error) throw error;
    return (data || []) as Message[];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

// Add getMessages as an alias for getMessagesBySessionId
export const getMessages = getMessagesBySessionId;

// Add touchChatSession function to update the timestamp of a chat session
export const touchChatSession = async (sessionId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', sessionId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error updating chat session timestamp:', error);
  }
};
