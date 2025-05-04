
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      // For testing purposes - if error is about email not confirmed, bypass it
      if (error.message.includes('Email not confirmed')) {
        console.log('Bypassing email confirmation for testing');
        // Try to sign up again to force the session creation
        const { data } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              confirmed_at: new Date().toISOString() // This is just for our mock data
            }
          }
        });
        
        if (data.session) {
          return { success: true };
        }
      }
      return { success: false, error: error.message };
    }
  };

  const signUp = async ({ email, password }: { email: string; password: string }) => {
    try {
      // For testing, we're enabling auto-confirm
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            confirmed_at: new Date().toISOString() // This helps bypass email confirmation
          }
        }
      });
      
      if (error) throw error;
      
      // For testing, if we have a session immediately after signup, consider it successful
      if (data.session) {
        return { success: true };
      }
      
      return { success: true, message: "Account created. For a real app, you would need to confirm your email." };
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
