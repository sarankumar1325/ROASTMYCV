
import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import Logo from '../components/Logo';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, FileText, FlameKindling, Award, BookOpen, FileSearch, List } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const demoRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const demoStepRef = useRef(1);
  const demoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [demoPlaying, setDemoPlaying] = useState(true);

  useEffect(() => {
    // Observer for features animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Apply observer to feature elements
    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    // Enhanced demo animation
    const runDemoAnimation = () => {
      if (!demoRef.current || !demoPlaying) return;
      const step = demoStepRef.current;
      
      const demoSteps = demoRef.current.querySelectorAll('.demo-step');
      demoSteps.forEach((el) => el.classList.remove('active'));
      
      if (demoSteps[step - 1]) {
        demoSteps[step - 1].classList.add('active');
        
        // Animate elements within the step
        const elements = demoSteps[step - 1].querySelectorAll('.anim-element');
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('animated');
          }, index * 300);
        });
      }
      
      demoStepRef.current = step < 3 ? step + 1 : 1;
    };
    
    // Start demo animation
    runDemoAnimation();
    demoIntervalRef.current = setInterval(runDemoAnimation, 5000);
    
    // Button pulse animation
    if (ctaButtonRef.current) {
      const pulseAnimation = () => {
        ctaButtonRef.current?.classList.add('animate-pulse-glow');
        setTimeout(() => {
          ctaButtonRef.current?.classList.remove('animate-pulse-glow');
        }, 1000);
      };
      
      const pulseInterval = setInterval(pulseAnimation, 6000);
      return () => {
        clearInterval(pulseInterval);
        if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
        observer.disconnect();
      };
    }
    
    return () => {
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
      observer.disconnect();
    };
  }, [demoPlaying]);

  const handleDemoControlClick = () => {
    setDemoPlaying(!demoPlaying);
    if (!demoPlaying && demoIntervalRef.current === null) {
      demoIntervalRef.current = setInterval(() => {
        const step = demoStepRef.current;
        if (demoRef.current) {
          const demoSteps = demoRef.current.querySelectorAll('.demo-step');
          demoSteps.forEach((el) => el.classList.remove('active'));
          if (demoSteps[step - 1]) demoSteps[step - 1].classList.add('active');
        }
        demoStepRef.current = step < 3 ? step + 1 : 1;
      }, 5000);
    } else if (demoPlaying && demoIntervalRef.current !== null) {
      clearInterval(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Add CSS for animations */}
      <div dangerouslySetInnerHTML={{ __html: `
        <style>
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes rotate-slow {
            0% { transform: rotate(-5deg); }
            100% { transform: rotate(5deg); }
          }
          @keyframes pulse-scale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          @keyframes upload-appear {
            0% { transform: translate(-50%, 20px); opacity: 0; }
            100% { transform: translate(-50%, 0); opacity: 1; }
          }
          @keyframes toaster-light {
            0%, 100% { background-color: rgba(255, 255, 255, 0.9); }
            50% { background-color: rgba(255, 253, 230, 0.95); }
          }
          @keyframes pop-in {
            0% { transform: scale(0.8); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fade-slide-up {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 0 rgba(251, 191, 36, 0); }
            50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.7); }
          }
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          @keyframes slide-in-left {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes slide-in-right {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes bounce-in {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.1); opacity: 1; }
            80% { transform: scale(0.95); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes spin-glow {
            0% { transform: rotate(0deg); box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
            50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.8); }
            100% { transform: rotate(360deg); box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-float-slow {
            animation: float 5s ease-in-out infinite;
          }
          .animate-rotate-slow {
            animation: rotate-slow 3s ease-in-out alternate infinite;
          }
          .animate-pulse-scale {
            animation: pulse-scale 1.5s ease-in-out infinite;
          }
          .animate-upload-appear {
            animation: upload-appear 0.8s ease-out forwards 0.5s;
          }
          .animate-toaster-light {
            animation: toaster-light 1.5s ease-in-out infinite;
          }
          .animate-pop-in {
            animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            opacity: 0;
          }
          .animate-pulse-glow {
            animation: pulse-glow 1s ease-in-out;
          }
          .animate-typing {
            overflow: hidden;
            white-space: nowrap;
            animation: typing 1s steps(40, end) forwards;
            width: 0;
          }
          .animate-slide-in-left {
            animation: slide-in-left 0.5s ease-out forwards;
            opacity: 0;
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.5s ease-out forwards;
            opacity: 0;
          }
          .animate-bounce-in {
            animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            opacity: 0;
          }
          .animate-spin-glow {
            animation: spin-glow 3s linear infinite;
          }
          
          .flame-animation {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }
          
          .flame {
            position: absolute;
            bottom: 15%;
            width: 60%;
            height: 60%;
            border-radius: 50% 50% 20% 20%;
            opacity: 0.8;
            filter: blur(5px);
            transform-origin: center bottom;
          }
          
          .flame-1 {
            background: linear-gradient(to top, #ff9500, #ff5e3a);
            z-index: 3;
            animation: flame1 1s infinite alternate;
          }
          
          .flame-2 {
            width: 45%;
            height: 45%;
            background: linear-gradient(to top, #ffcc00, #ff9500);
            z-index: 2;
            animation: flame2 1.33s infinite alternate;
          }
          
          .flame-3 {
            width: 30%;
            height: 30%;
            background: rgba(255, 255, 255, 0.7);
            z-index: 1;
            animation: flame3 0.9s infinite alternate;
          }
          
          @keyframes flame1 {
            0%, 100% { transform: scaleY(1) scaleX(1) rotate(-2deg); }
            50% { transform: scaleY(1.1) scaleX(0.9) rotate(2deg); }
          }
          
          @keyframes flame2 {
            0%, 100% { transform: scaleY(0.9) translateX(-5px); }
            50% { transform: scaleY(1.1) translateX(5px); }
          }
          
          @keyframes flame3 {
            0%, 100% { transform: scaleY(0.8) translateX(2px); opacity: 0.6; }
            50% { transform: scaleY(1.2) translateX(-2px); opacity: 0.8; }
          }
          
          .demo-step {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }
          
          .demo-step.active {
            opacity: 1;
            transform: translateY(0);
          }
          
          .anim-element {
            opacity: 0;
            transform: scale(0.9);
            transition: all 0.5s ease-out;
          }
          
          .anim-element.animated {
            opacity: 1;
            transform: scale(1);
          }
          
          .hover-bounce:hover {
            animation: bounce 0.5s ease;
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          
          .scale-on-hover {
            transition: transform 0.3s ease;
          }
          
          .scale-on-hover:hover {
            transform: scale(1.05);
          }
          
          .highlight-box {
            position: relative;
            overflow: hidden;
          }
          
          .highlight-box::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.7s;
          }
          
          .highlight-box:hover::after {
            left: 100%;
          }
        </style>
      `}} />

      <NavBar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden"
          style={{
            background: "radial-gradient(circle at center, #fff2e6, #ffffff)"
          }}>
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-gradient-to-r from-amber-300 to-amber-100 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/5 w-64 h-64 rounded-full bg-gradient-to-r from-red-300 to-amber-100 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-6 transform hover:scale-110 transition-transform duration-300">
              <Logo variant="default" showText={false} className="mx-auto" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Give Your Resume the <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-600">Roast</span> It Deserves
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Upload. Pick Your Heat. Get Sizzled Feedback.
            </p>
            <SignedIn>
              <Button 
                onClick={() => navigate('/roaster')}
                ref={ctaButtonRef}
                className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
              >
                <span className="mr-2 group-hover:translate-x-1 transition-transform duration-200">Try Now</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  ref={ctaButtonRef}
                  className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <span className="mr-2 group-hover:translate-x-1 transition-transform duration-200">Get Started</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </section>
        
        {/* Enhanced Demo Carousel */}
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-amber-300 filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-red-300 filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <button 
                onClick={handleDemoControlClick}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-500 transition-colors"
              >
                {demoPlaying ? (
                  <>
                    <span>Pause Demo</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Play Demo</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </>
                )}
              </button>
            </div>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">Experience the magic of our resume roaster in three simple steps</p>
            
            <div 
              ref={demoRef}
              className="max-w-4xl mx-auto h-[500px] relative overflow-hidden rounded-xl shadow-2xl border border-gray-100 bg-white"
            >
              {/* Demo Step 1 - Upload Resume */}
              <div className="demo-step absolute inset-0 bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                  <div className="md:w-1/2">
                    <div className="relative anim-element">
                      <div className="absolute -top-6 -left-6 bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">1</div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white flex flex-col items-center justify-center h-64 w-full relative hover:border-amber-500 transition-colors duration-300">
                        <FileText size={48} className="text-gray-400 mb-4 animate-float" />
                        <p className="text-center text-gray-500 mb-2 anim-element">Drag and drop your resume here</p>
                        <p className="text-center text-gray-400 text-sm anim-element">or click to browse files</p>
                        
                        {/* File type indicators */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 mt-4 anim-element" style={{ animationDelay: "0.4s" }}>
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-medium">PDF</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">DOC</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">DOCX</span>
                        </div>
                        
                        {/* Upload success animation */}
                        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center opacity-0 anim-element" style={{ animationDelay: "1s" }}>
                          <div className="bg-green-100 rounded-full p-4">
                            <Check size={32} className="text-green-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="anim-element" style={{ animationDelay: "0.3s" }}>
                      <h3 className="text-2xl font-medium text-center md:text-left mb-2">Upload your resume</h3>
                      <p className="text-gray-500 md:text-left">Simply drag and drop your resume file or click to select from your device. We accept PDF, DOC, and DOCX formats.</p>
                      <div className="mt-4 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          <span className="text-sm text-gray-600">Secure upload</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          <span className="text-sm text-gray-600">Data privacy guaranteed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          <span className="text-sm text-gray-600">Fast processing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Demo Step 2 - Intensity Selection */}
              <div className="demo-step absolute inset-0 bg-gradient-to-br from-white to-amber-50 flex items-center justify-center p-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                  <div className="md:w-1/2">
                    <div className="relative anim-element">
                      <div className="absolute -top-6 -left-6 bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">2</div>
                      <div className="w-full flex flex-col items-center">
                        <div className="text-center mb-6">
                          <h4 className="text-xl font-medium mb-2 anim-element">Select Intensity</h4>
                          <p className="text-gray-500 text-sm anim-element" style={{ animationDelay: "0.2s" }}>How honest do you want us to be?</p>
                        </div>
                        
                        {/* Intensity options with advanced animation */}
                        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                          <div className="intensity-option anim-element cursor-pointer" style={{ animationDelay: "0.3s" }}>
                            <div className="border-2 border-gray-200 hover:border-amber-400 rounded-lg p-4 text-center scale-on-hover transition-all duration-300">
                              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                                <FlameKindling size={20} className="text-amber-400" />
                              </div>
                              <h5 className="font-medium">Mild</h5>
                              <p className="text-xs text-gray-500">Gentle feedback</p>
                            </div>
                          </div>
                          
                          <div className="intensity-option anim-element cursor-pointer" style={{ animationDelay: "0.5s" }}>
                            <div className="border-2 border-amber-500 rounded-lg p-4 text-center bg-amber-50 scale-on-hover transition-all duration-300 shadow-md">
                              <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center mx-auto mb-2">
                                <FlameKindling size={20} className="text-white" />
                              </div>
                              <h5 className="font-medium text-amber-600">Medium</h5>
                              <p className="text-xs text-amber-600/70">Balanced critique</p>
                            </div>
                          </div>
                          
                          <div className="intensity-option anim-element cursor-pointer" style={{ animationDelay: "0.7s" }}>
                            <div className="border-2 border-gray-200 hover:border-red-500 rounded-lg p-4 text-center scale-on-hover transition-all duration-300">
                              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
                                <FlameKindling size={20} className="text-red-500" />
                              </div>
                              <h5 className="font-medium">Savage</h5>
                              <p className="text-xs text-gray-500">Brutal honesty</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Intensity slider */}
                        <div className="w-full max-w-md mt-6 anim-element" style={{ animationDelay: "0.9s" }}>
                          <div className="h-2 w-full bg-gray-200 rounded-full relative">
                            <div className="h-2 w-1/2 bg-gradient-to-r from-amber-300 via-amber-500 to-red-500 rounded-full"></div>
                            <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-white rounded-full border border-amber-500 shadow-md transform -translate-x-1/2 -translate-y-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="anim-element" style={{ animationDelay: "0.4s" }}>
                      <h3 className="text-2xl font-medium text-center md:text-left mb-2">Select your heat level</h3>
                      <p className="text-gray-500 md:text-left">Choose how direct and critical you want our feedback to be. From constructive guidance to brutal honesty, you control the intensity.</p>
                      
                      <div className="mt-4 space-y-3">
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg anim-element" style={{ animationDelay: "0.6s" }}>
                          <div className="flex">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-200 text-amber-700 rounded mr-2">MEDIUM</span>
                            <p className="text-sm italic text-amber-700">"Your resume lacks impact statements. Try quantifying your achievements."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Demo Step 3 - Results & Feedback */}
              <div className="demo-step absolute inset-0 bg-gradient-to-br from-white to-red-50 flex items-center justify-center p-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                  <div className="md:w-1/2">
                    <div className="relative anim-element">
                      <div className="absolute -top-6 -left-6 bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">3</div>
                      
                      {/* Animated result cards */}
                      <div className="w-full py-4 relative">
                        <div className="relative h-64 mx-auto">
                          {/* Result card 1 */}
                          <div className="absolute top-0 left-0 md:-left-6 w-64 bg-white rounded-lg border border-gray-200 shadow-md p-4 anim-element transform -rotate-6 z-10" style={{ animationDelay: "0.3s" }}>
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                              </div>
                              <h4 className="font-bold text-gray-800">Strengths</h4>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1 pl-4">
                              <li className="anim-element" style={{ animationDelay: "0.4s" }}>• Strong technical skills section</li>
                              <li className="anim-element" style={{ animationDelay: "0.5s" }}>• Clear work history chronology</li>
                              <li className="anim-element" style={{ animationDelay: "0.6s" }}>• Good contact information</li>
                            </ul>
                          </div>
                          
                          {/* Result card 2 */}
                          <div className="absolute top-8 left-4 md:-left-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg p-4 anim-element z-20" style={{ animationDelay: "0.6s" }}>
                            <div className="flex items-center mb-2">
                              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </div>
                              <h4 className="font-bold text-gray-800">Weaknesses</h4>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1 pl-4">
                              <li className="anim-element animate-typing" style={{ animationDelay: "0.7s" }}>• Missing quantifiable achievements</li>
                              <li className="anim-element animate-typing" style={{ animationDelay: "0.9s" }}>• Generic objective statement</li>
                              <li className="anim-element animate-typing" style={{ animationDelay: "1.1s" }}>• Too much industry jargon</li>
                            </ul>
                          </div>
                          
                          {/* Result card 3 - Score card with animated meter */}
                          <div className="absolute top-16 left-8 md:left-2 w-64 bg-white rounded-lg border border-amber-200 shadow-xl p-4 anim-element z-30" style={{ animationDelay: "0.9s" }}>
                            <div className="text-center mb-3">
                              <h4 className="font-bold text-gray-800">Resume Score</h4>
                            </div>
                            
                            <div className="flex justify-center mb-2">
                              <div className="w-32 h-32 relative">
                                <svg viewBox="0 0 36 36" className="w-full h-full">
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                    fill="none" 
                                    stroke="#eee" 
                                    strokeWidth="3" 
                                    strokeDasharray="100, 100" />
                                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                    fill="none" 
                                    stroke="url(#gradient)" 
                                    strokeWidth="3" 
                                    strokeDasharray="65, 100" 
                                    className="anim-element" 
                                    style={{ animationDelay: "1s", transition: "stroke-dasharray 1s ease-in-out" }} />
                                  <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" stopColor="#f97316" />
                                      <stop offset="100%" stopColor="#ef4444" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div>
                                    <div className="text-3xl font-bold counter-animate anim-element" style={{ animationDelay: "1.2s" }}>65%</div>
                                    <div className="text-xs text-gray-500">Good</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Action button */}
                            <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-red-600 text-white rounded-md text-sm font-medium hover:from-amber-600 hover:to-red-700 transition-all duration-300 anim-element" style={{ animationDelay: "1.3s" }}>
                              View Detailed Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="anim-element" style={{ animationDelay: "0.4s" }}>
                      <h3 className="text-2xl font-medium text-center md:text-left mb-2">Get honest feedback</h3>
                      <p className="text-gray-500 md:text-left">Receive detailed insights with actionable improvements for your resume. Our AI analyzes your strengths and weaknesses, providing specific recommendations.</p>
                      
                      <div className="mt-4 space-y-3">
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg anim-element" style={{ animationDelay: "0.7s" }}>
                          <h5 className="font-medium text-amber-800 mb-1 text-sm">Improvement Suggestion:</h5>
                          <p className="text-sm text-gray-700">Instead of "Managed team projects", try "Led cross-functional team of 8 to deliver $1.2M project under budget and 2 weeks ahead of schedule"</p>
                        </div>
                        
                        <div className="flex justify-end">
                          <div className="flex items-center gap-2 anim-element" style={{ animationDelay: "0.9s" }}>
                            <Award size={18} className="text-amber-500" />
                            <span className="text-sm font-medium">Generate sharable badge</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-3">
              {[1, 2, 3].map((step) => (
                <button 
                  key={step}
                  onClick={() => {
                    if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
                    demoStepRef.current = step;
                    demoIntervalRef.current = setInterval(() => {
                      const currStep = demoStepRef.current;
                      if (demoRef.current) {
                        const demoSteps = demoRef.current.querySelectorAll('.demo-step');
                        demoSteps.forEach((el) => el.classList.remove('active'));
                        if (demoSteps[currStep - 1]) demoSteps[currStep - 1].classList.add('active');
                      }
                      demoStepRef.current = currStep < 3 ? currStep + 1 : 1;
                    }, 5000);
                    if (demoRef.current) {
                      const demoSteps = demoRef.current.querySelectorAll('.demo-step');
                      demoSteps.forEach((el) => el.classList.remove('active'));
                      if (demoSteps[step - 1]) demoSteps[step - 1].classList.add('active');
                    }
                  }}
                  className={`w-10 h-2 rounded-full transition-all duration-300 ${demoStepRef.current === step ? 'bg-amber-500 scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to demo step ${step}`}
                ></button>
              ))}
            </div>
          </div>
        </section>
        
        {/* New Resume Tips Library Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block p-2 bg-amber-100 rounded-lg mb-4">
                <BookOpen size={24} className="text-amber-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Resume Tips Library</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Browse our collection of expert resume tips and resources to improve your job application materials</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Power Words for Resumes",
                  description: "Discover 100+ impactful action verbs and power words that make your resume stand out to recruiters and hiring managers.",
                  icon: <FileSearch size={24} />,
                  tag: "Most Popular"
                },
                {
                  title: "ATS-Friendly Templates",
                  description: "Download professionally designed resume templates that pass through Applicant Tracking Systems without formatting issues.",
                  icon: <FileText size={24} />,
                  tag: "Free Download"
                },
                {
                  title: "Industry-Specific Examples",
                  description: "Browse resume samples for different industries and job roles to understand what works best for your career path.",
                  icon: <List size={24} />,
                  tag: "Pro Tips"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  ref={(el) => featureRefs.current[index + 3] = el}
                  className="bg-white p-6 border border-gray-100 rounded-lg shadow-md transform translate-y-10 opacity-0 transition-all duration-700 highlight-box hover:shadow-lg"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-amber-500">
                    {item.icon}
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">{item.tag}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <button className="text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center gap-1 group">
                    Explore
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                className="border-amber-500 text-amber-600 hover:bg-amber-50"
              >
                View All Resources
              </Button>
            </div>
          </div>
        </section>
        
        {/* New Resume Format Checker Tool */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block p-2 bg-amber-100 rounded-lg mb-4">
                  <FileSearch size={24} className="text-amber-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Resume Format Checker</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">Ensure your resume follows industry best practices with our free formatting guide</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-4">Format Checklist</h3>
                      
                      {[
                        "Clear section headings",
                        "Consistent font styles",
                        "Proper spacing and margins",
                        "Bullet points for achievements",
                        "Contact information at the top",
                        "PDF file format for submission"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 mb-3">
                          <div className="w-5 h-5 rounded-full border border-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="text-amber-500" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-4">Common Mistakes</h3>
                      
                      {[
                        "Inconsistent formatting",
                        "Inappropriate email address",
                        "Too many pages (keep to 1-2)",
                        "Tiny or unusual fonts",
                        "Lack of white space",
                        "Missing contact information"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 mb-3">
                          <div className="w-5 h-5 rounded-full border border-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-medium text-lg mb-4">Download Free Templates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        "Professional Template",
                        "Creative Template",
                        "Executive Template"
                      ].map((template, i) => (
                        <div key={i} className="border border-gray-200 rounded p-4 text-center hover:border-amber-500 hover:shadow-md transition-all duration-300 cursor-pointer">
                          <FileText size={24} className="mx-auto mb-2 text-gray-400" />
                          <p className="text-sm font-medium">{template}</p>
                          <span className="text-xs text-gray-500">ATS-friendly</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <Button className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700">
                      Download Complete Guide
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features & Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div 
                ref={(el) => featureRefs.current[0] = el}
                className="bg-white p-6 rounded-lg shadow-md transform translate-y-10 opacity-0 transition-all duration-700"
              >
                <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19.071 13.142L13.414 18.8a2 2 0 0 1-2.828 0l-5.657-5.657a6 6 0 0 1 0-8.485 5.998 5.998 0 0 1 8.485 0l.707.707.707-.707a5.998 5.998 0 0 1 8.485 0 6 6 0 0 1 0 8.485z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Choose Your Heat</h3>
                <p className="text-gray-600">Select Mild, Medium, or Savage intensity before roasting. Control exactly how brutally honest you want your feedback to be.</p>
              </div>
              
              {/* Feature 2 */}
              <div 
                ref={(el) => featureRefs.current[1] = el}
                className="bg-white p-6 rounded-lg shadow-md transform translate-y-10 opacity-0 transition-all duration-700 delay-100"
              >
                <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"/>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Witty, Actionable Roasts</h3>
                <p className="text-gray-600">Get top-3 weaknesses with real "so what?" follow-ups. AI-powered analysis identifies clichés and offers constructive improvement suggestions.</p>
              </div>
              
              {/* Feature 3 */}
              <div 
                ref={(el) => featureRefs.current[2] = el}
                className="bg-white p-6 rounded-lg shadow-md transform translate-y-10 opacity-0 transition-all duration-700 delay-200"
              >
                <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-red-600 w-12 h-12 rounded-full flex items-center justify-center text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wide">Shiny Badge Export</h3>
                <p className="text-gray-600">Generate a glittery, animated badge with your roast level & custom tagline. Share your achievement and spread the word about your resume roasting journey.</p>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <SignedIn>
                <Button 
                  onClick={() => navigate('/roaster')} 
                  ref={ctaButtonRef}
                  className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 px-6 py-3 text-lg rounded-lg shadow-lg group"
                >
                  <span className="mr-2">🔥 Ready to Get Roasted? Try Now</span>
                  <ChevronRight size={20} className="inline-block group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button 
                    className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 px-6 py-3 text-lg rounded-lg shadow-lg group"
                  >
                    <span className="mr-2">🔥 Ready to Get Roasted? Sign In</span>
                    <ChevronRight size={20} className="inline-block group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What People Are Saying</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah J.",
                  role: "UX Designer",
                  comment: "Got my resume roasted at 'Savage' level and landed 3 interviews the next week. Brutal but effective!"
                },
                {
                  name: "Alex T.",
                  role: "Software Engineer",
                  comment: "The AI caught buzzword overload I didn't even notice. My resume is now half the length but twice as impactful."
                },
                {
                  name: "Miguel R.",
                  role: "Marketing Specialist",
                  comment: "Downloaded my 'Medium Heat Veteran' badge and used it in my portfolio. Conversation starter in every interview!"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <div className="flex-shrink-0 ml-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <div className="flex-shrink-0 ml-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <div className="flex-shrink-0 ml-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <div className="flex-shrink-0 ml-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-red-600 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Logo variant="default" showText={true} className="h-8" />
              <p className="text-sm text-muted-foreground mt-2">Give your resume the critique it deserves.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-medium mb-2">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Features</a></li>
                  <li><a href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Pricing</a></li>
                  <li><a href="/roaster" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Try It</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Blog</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Guides</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">About</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Careers</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Privacy</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover-bounce">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 Resume Roaster. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover-bounce">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover-bounce">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover-bounce">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
