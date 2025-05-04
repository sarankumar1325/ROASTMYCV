
import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';

/**
 * This hook syncs Clerk user data to Supabase profiles table
 */
export function useSyncClerkUser() {
  const { user } = useUser();
  const { userId, isSignedIn } = useAuth();
  
  useEffect(() => {
    // Only sync when we have a signed-in user
    if (isSignedIn && user && userId) {
      const syncUserToSupabase = async () => {
        try {
          // Check if profile exists
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
          
          if (existingProfile) {
            // Update existing profile with latest Clerk data
            await supabase
              .from('profiles')
              .update({
                display_name: user.fullName || user.username || '',
                last_login: new Date().toISOString(),
              })
              .eq('id', userId);
          } else {
            // Create new profile with Clerk data
            await supabase
              .from('profiles')
              .insert({
                id: userId,
                display_name: user.fullName || user.username || '',
                last_login: new Date().toISOString(),
                settings: {}
              });
          }
        } catch (error) {
          console.error('Error syncing user to Supabase:', error);
        }
      };
      
      syncUserToSupabase();
    }
  }, [isSignedIn, user, userId]);
  
  return null; // This hook doesn't return anything
}
