
import { supabase } from '@/integrations/supabase/client';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import type { ChatSession, Message, MessageSender } from '@/types/database';

// API Key - in a real application, this should be stored securely
const API_KEY = "AIzaSyC74WevNjWdIdIhdJ9iG_MCSZbEhBxjrtg";

// Initialize the chat model
const chatModel = new ChatGoogleGenerativeAI({
  apiKey: API_KEY,
  modelName: "gemini-2.0-flash",
  maxOutputTokens: 1024,
  temperature: 0.7,
});

// Chat Sessions
export const createChatSession = async (
  resumeId: string | null = null, 
  title: string = 'New Chat Session'
): Promise<ChatSession | null> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        user_id: user.id,
        resume_id: resumeId,
        session_title: title
      })
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating chat session:', error);
    return null;
  }
};

export const getChatSessions = async (): Promise<ChatSession[]> => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return [];
  }
};

export const getChatSession = async (id: string): Promise<ChatSession | null> => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching chat session:', error);
    return null;
  }
};

export const updateChatSessionTitle = async (id: string, title: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ session_title: title })
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating chat session title:', error);
    return false;
  }
};

// Messages
export const getMessages = async (chatSessionId: string): Promise<Message[]> => {
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

export const sendMessage = async (
  chatSessionId: string,
  content: string,
  sender: MessageSender = 'user'
): Promise<Message | null> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    // Insert the message
    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_session_id: chatSessionId,
        content,
        sender
      })
      .select('*')
      .single();
    
    if (error) throw error;
    
    // If this is a user message, generate an AI response
    if (sender === 'user') {
      // Get all previous messages in this chat
      const previousMessages = await getMessages(chatSessionId);
      
      // Format messages for LangChain
      const langchainMessages = previousMessages.map(msg => 
        msg.sender === 'user' 
          ? new HumanMessage(msg.content) 
          : new AIMessage(msg.content)
      );
      
      // Add current message
      langchainMessages.push(new HumanMessage(content));
      
      // Get AI response
      try {
        const aiResponse = await chatModel.invoke(langchainMessages);
        const aiContent = aiResponse.content as string;
        
        // Save AI response
        await sendMessage(chatSessionId, aiContent, 'ai');
      } catch (aiError) {
        console.error('Error getting AI response:', aiError);
        await sendMessage(
          chatSessionId, 
          "Sorry, I encountered an error processing your message. Please try again.", 
          'ai'
        );
      }
    }
    
    return data as Message;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};

// Update the chat session's updated_at timestamp
export const touchChatSession = async (chatSessionId: string): Promise<void> => {
  try {
    await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', chatSessionId);
  } catch (error) {
    console.error('Error updating chat session timestamp:', error);
  }
};
