
import { useUser, useAuth } from '@clerk/clerk-react';

/**
 * This adapter provides Supabase-compatible auth functionality using Clerk
 * It allows existing code that expects Supabase auth to work without major refactoring
 */
export function useClerkAsSupabase() {
  const { user } = useUser();
  const { isSignedIn, isLoaded, signOut } = useAuth();
  
  return {
    user: isSignedIn ? {
      id: user?.id || '',
      email: user?.primaryEmailAddress?.emailAddress || '',
      user_metadata: {
        full_name: user?.fullName || '',
      }
    } : null,
    session: isSignedIn ? {
      user: {
        id: user?.id || '',
        email: user?.primaryEmailAddress?.emailAddress || '',
        user_metadata: {
          full_name: user?.fullName || '',
        }
      }
    } : null,
    loading: !isLoaded,
    signIn: async () => {
      // This is just a stub - actual sign in happens via Clerk UI
      return { success: false, error: "Please use Clerk UI to sign in" };
    },
    signUp: async () => {
      // This is just a stub - actual sign up happens via Clerk UI
      return { success: false, error: "Please use Clerk UI to sign up" };
    },
    signOut: async () => {
      try {
        await signOut();
        return { success: true };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
  };
}
