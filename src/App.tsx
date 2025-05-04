
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import { useSyncClerkUser } from "./hooks/useSyncClerkUser";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Roaster from "./pages/Roaster";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import ChatPage from "./pages/ChatPage";

const queryClient = new QueryClient();

// Protected route wrapper component using Clerk
interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();
  
  // Sync Clerk user data with Supabase
  useSyncClerkUser();
  
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  
  return <>{element}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Clerk auth routes */}
          <Route path="/sign-in" element={<Auth />} />
          <Route path="/sign-up" element={<Auth />} />

          {/* Protected routes */}
          <Route path="/roaster" element={<ProtectedRoute element={<Roaster />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/chat" element={<ProtectedRoute element={<ChatPage />} />} />
          <Route path="/chat/:sessionId" element={<ProtectedRoute element={<ChatPage />} />} />
          
          {/* Redirect old auth path to sign-in */}
          <Route path="/auth" element={<Navigate to="/sign-in" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
