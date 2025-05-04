import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@clerk/clerk-react';

// Function to get user ID from Clerk
const getUserId = () => {
  const auth = useAuth();
  return auth.userId || '';
};

export const saveFeedback = async ({ message_id, rating, comments }: { message_id: string; rating: number; comments: string; }) => {
  try {
    const userId = getUserId();
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('feedback')
      .insert({
        message_id,
        rating,
        comments,
        user_id: userId
      })
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving feedback:', error);
    return null;
  }
};
