
import { supabase } from '@/integrations/supabase/client';
import type { Feedback } from '@/types/database';

export const submitFeedback = async (
  messageId: string,
  rating: number,
  comments: string | null = null
): Promise<Feedback | null> => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        message_id: messageId,
        rating,
        comments
      })
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return null;
  }
};

export const getFeedbackForMessage = async (messageId: string): Promise<Feedback | null> => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('message_id', messageId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "No rows returned" error
    return data || null;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return null;
  }
};

export const updateFeedback = async (
  feedbackId: string,
  updates: { rating?: number; comments?: string }
): Promise<Feedback | null> => {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .update(updates)
      .eq('id', feedbackId)
      .select('*')
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating feedback:', error);
    return null;
  }
};
