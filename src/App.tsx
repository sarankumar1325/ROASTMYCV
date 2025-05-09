
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-react";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Roaster from "./pages/Roaster";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Tips from "./pages/Tips";
import FormatChecker from "./pages/FormatChecker";

const queryClient = new QueryClient();

// Private route wrapper component
const PrivateRoute = ({ element }: { element: React.ReactNode }) => (
  <ClerkLoaded>
    <SignedIn>{element}</SignedIn>
    <SignedOut>
      <Navigate to="/sign-in" replace />
    </SignedOut>
  </ClerkLoaded>
);

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
          <Route path="/sign-in" element={<Auth />} />
          <Route path="/sign-up" element={<Auth />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/format-checker" element={<FormatChecker />} />

          {/* Protected routes */}
          <Route path="/roaster" element={<PrivateRoute element={<Roaster />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
