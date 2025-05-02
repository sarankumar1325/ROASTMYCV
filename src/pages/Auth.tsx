
import React from 'react';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import Hyperspeed from '../components/Hyperspeed';
import Logo from '../components/Logo';

const Auth: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();
  const isSignUp = location.pathname === '/sign-up';
  
  // If the user is already signed in, redirect to home
  if (isLoaded && isSignedIn) {
    return <Navigate to="/" replace />;
  }
  
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
          
          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-white mb-6">
            {isSignUp ? 'Create Your Account' : 'Sign In to Resume Roaster'}
          </h1>
          
          {/* Clerk auth component */}
          <div className="bg-white/5 p-4 rounded-xl">
            {isSignUp ? (
              <SignUp 
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
                afterSignUpUrl="/"
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-transparent shadow-none",
                    headerTitle: "text-amber-500",
                    headerSubtitle: "text-white/70",
                    socialButtonsBlockButton: "bg-white/10 hover:bg-white/20 text-white",
                    formButtonPrimary: "bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700",
                    formFieldInput: "bg-white/10 text-white border-white/20",
                    formFieldLabel: "text-white/70",
                    dividerText: "text-white/50",
                    formFieldAction: "text-amber-400 hover:text-amber-300"
                  }
                }}
              />
            ) : (
              <SignIn 
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                afterSignInUrl="/"
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-transparent shadow-none",
                    headerTitle: "text-amber-500",
                    headerSubtitle: "text-white/70",
                    socialButtonsBlockButton: "bg-white/10 hover:bg-white/20 text-white",
                    formButtonPrimary: "bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700",
                    formFieldInput: "bg-white/10 text-white border-white/20",
                    formFieldLabel: "text-white/70",
                    dividerText: "text-white/50",
                    formFieldAction: "text-amber-400 hover:text-amber-300"
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
