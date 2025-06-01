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
import Templates from "./pages/Templates";
import Progress from "./pages/Progress";
import KeywordAnalyzer from "./pages/KeywordAnalyzer";
import TimelineBuilder from "./pages/TimelineBuilder";
import PowerWords from "./pages/PowerWords";
import TechnicalReport from "./pages/TechnicalReport";
import ResumeAnalytics from "./pages/ResumeAnalytics";
import ColorPalettes from "./pages/ColorPalettes";
import ContactValidator from "./pages/ContactValidator";
import FontPairing from "./pages/FontPairing";

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
          <Route path="/templates" element={<Templates />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/keyword-analyzer" element={<KeywordAnalyzer />} />
          <Route path="/timeline-builder" element={<TimelineBuilder />} />
          <Route path="/power-words" element={<PowerWords />} />
          <Route path="/technical-report" element={<TechnicalReport />} />
          <Route path="/resume-analytics" element={<ResumeAnalytics />} />
          <Route path="/color-palettes" element={<ColorPalettes />} />
          <Route path="/contact-validator" element={<ContactValidator />} />
          <Route path="/font-pairing" element={<FontPairing />} />

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
