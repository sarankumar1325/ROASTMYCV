
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useSupabaseAuth } from "./hooks/useSupabaseAuth";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Roaster from "./pages/Roaster";
import Profile from "./pages/Profile";
import Authentication from "./pages/Authentication";
import ChatPage from "./pages/ChatPage";

const queryClient = new QueryClient();

// Private route wrapper component
interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user, loading } = useSupabaseAuth();
  const location = useLocation();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
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
          <Route path="/auth" element={<Authentication />} />

          {/* Protected routes */}
          <Route path="/roaster" element={<ProtectedRoute element={<Roaster />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/chat" element={<ProtectedRoute element={<ChatPage />} />} />
          <Route path="/chat/:sessionId" element={<ProtectedRoute element={<ChatPage />} />} />
          
          {/* No longer using Clerk auth */}
          {/* <Route path="/sign-in" element={<Navigate to="/auth" replace />} />
          <Route path="/sign-up" element={<Navigate to="/auth" replace />} /> */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
