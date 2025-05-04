
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import Logo from '../components/Logo';
import Hyperspeed from '../components/Hyperspeed';

const Authentication: React.FC = () => {
  const { user, loading, signIn, signUp } = useSupabaseAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('test@example.com'); // Pre-filled for testing
  const [password, setPassword] = useState('password123'); // Pre-filled for testing
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  
  // If already logged in, redirect to home
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Please check your inputs',
        description: 'Email and password are required.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = isSignUp 
        ? await signUp({ email, password }) 
        : await signIn({ email, password });
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      toast({
        title: isSignUp ? 'Account created' : 'Welcome back',
        description: isSignUp 
          ? 'Your account has been created successfully and you are signed in.'
          : 'You have successfully signed in.',
      });
    } catch (error: any) {
      toast({
        title: 'Authentication failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative">
      {/* Hyperspeed background */}
      <Hyperspeed />
      
      {/* Auth container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo variant="default" className="w-24 h-24" />
          </div>
          
          <Card className="bg-transparent shadow-none border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-white">
                {isSignUp ? 'Create an account' : 'Sign in'}
              </CardTitle>
              <CardDescription className="text-center text-white/70">
                {isSignUp 
                  ? 'Enter your email below to create your account'
                  : 'Enter your email and password to sign in'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white/70">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/10 text-white border-white/20"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-white/70">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 text-white border-white/20"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Please wait...'
                      : isSignUp
                        ? 'Create account'
                        : 'Sign in'
                    }
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-sm text-white/70 text-center mt-2">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <Button 
                      variant="link" 
                      onClick={() => setIsSignUp(false)}
                      className="text-amber-400 hover:text-amber-300 p-0 h-auto"
                    >
                      Sign in
                    </Button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <Button 
                      variant="link" 
                      onClick={() => setIsSignUp(true)}
                      className="text-amber-400 hover:text-amber-300 p-0 h-auto"
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
