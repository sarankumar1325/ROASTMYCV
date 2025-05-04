
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

const NavBar: React.FC = () => {
  const { user, signOut } = useSupabaseAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { success, error } = await signOut();
      if (success) {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out."
        });
        navigate('/');
      } else if (error) {
        throw new Error(error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Logo variant="small" className="size-8" />
            <span className="font-bold text-lg">Resume Roaster</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-8">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
              Home
            </Link>
            <Link to="/pricing" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
              Pricing
            </Link>
            {user && (
              <>
                <Link to="/roaster" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                  Roaster
                </Link>
                <Link to="/chat" className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                  AI Chat
                </Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/auth')} variant="outline" size="sm">
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700" size="sm">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
