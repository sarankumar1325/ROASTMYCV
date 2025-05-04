
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@clerk/clerk-react';
import type { Profile } from '@/types/database';

// Function to get user ID from Clerk
const getUserId = () => {
  const auth = useAuth();
  return auth.userId || '';
};

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const userId = getUserId();
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data as unknown as Profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const updateProfile = async (updates: Partial<Profile>): Promise<Profile | null> => {
  try {
    const userId = getUserId();
    
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select('*')
      .single();
    
    if (error) throw error;
    return data as unknown as Profile;
  } catch (error) {
    console.error('Error updating profile:', error);
    return null;
  }
};
