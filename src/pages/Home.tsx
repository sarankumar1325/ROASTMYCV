import React, { useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import Logo from '../components/Logo';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const demoRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const demoStepRef = useRef(1);
  const demoIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    
    // Demo animation
    const runDemoAnimation = () => {
      if (!demoRef.current) return;
      const step = demoStepRef.current;
      
      const demoSteps = demoRef.current.querySelectorAll('.demo-step');
      demoSteps.forEach((el) => el.classList.remove('active'));
      
      if (demoSteps[step - 1]) {
        demoSteps[step - 1].classList.add('active');
      }
      
      demoStepRef.current = step < 3 ? step + 1 : 1;
    };
    
    // Start demo animation
    runDemoAnimation();
    demoIntervalRef.current = setInterval(runDemoAnimation, 4000);
    
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
  }, []);
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
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
            <Button 
              onClick={() => navigate('/roaster')}
              ref={ctaButtonRef}
              className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <span className="mr-2 group-hover:translate-x-1 transition-transform duration-200">Try Now</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
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
            <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">Experience the magic of our resume roaster in three simple steps</p>
            
            <div 
              ref={demoRef}
              className="max-w-4xl mx-auto h-96 relative overflow-hidden rounded-xl shadow-2xl border border-gray-100 bg-white"
            >
              {/* Demo Step 1 */}
              <div className="demo-step absolute inset-0 bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-8 transition-all duration-700 opacity-0 translate-x-full">
                <div className="flex flex-col items-center justify-center space-y-8">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">1</div>
                    <div className="w-32 h-40 border-2 border-gray-300 rounded-lg bg-white flex items-center justify-center relative animate-float">
                      <div className="absolute inset-4 border border-gray-400 bg-gray-50">
                        <div className="h-2 w-16 bg-gray-400 mx-auto mt-4"></div>
                        <div className="h-1 w-20 bg-gray-300 mx-auto mt-3"></div>
                        <div className="h-1 w-14 bg-gray-300 mx-auto mt-2"></div>
                        <div className="h-1 w-18 bg-gray-300 mx-auto mt-2"></div>
                      </div>
                      
                      {/* Upload Icon Animation */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-2 border-amber-500 flex items-center justify-center opacity-0 animate-upload-appear">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-center mb-2">Upload your resume</h3>
                    <p className="text-gray-500 text-center max-w-xs">Share your resume in PDF format and let our AI analyze it</p>
                  </div>
                </div>
              </div>
              
              {/* Demo Step 2 */}
              <div className="demo-step absolute inset-0 bg-gradient-to-br from-white to-amber-50 flex items-center justify-center p-8 transition-all duration-700 opacity-0 translate-x-full">
                <div className="flex flex-col items-center justify-center space-y-8">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">2</div>
                    <div className="w-40 h-40 relative">
                      <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-amber-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg animate-rotate-slow">
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-800 rounded-t-lg"></div>
                        <div className="w-20 h-24 bg-white animate-toaster-light">
                          <div className="h-full w-full overflow-hidden">
                            {/* Flame animation */}
                            <div className="flame-animation">
                              <div className="flame flame-1"></div>
                              <div className="flame flame-2"></div>
                              <div className="flame flame-3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Heat slider */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-white rounded-full shadow-md flex items-center px-2 opacity-0 animate-fade-slide-up" style={{ animationDelay: "0.7s" }}>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 w-3/4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-full relative">
                            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border border-gray-300 shadow-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-center mb-2">Select your heat level</h3>
                    <p className="text-gray-500 text-center max-w-xs">Choose between mild, medium, or savage roast intensity</p>
                  </div>
                </div>
              </div>
              
              {/* Demo Step 3 */}
              <div className="demo-step absolute inset-0 bg-gradient-to-br from-white to-red-50 flex items-center justify-center p-8 transition-all duration-700 opacity-0 translate-x-full">
                <div className="flex flex-col items-center justify-center space-y-8">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 bg-amber-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">3</div>
                    
                    <div className="w-60 h-48 relative">
                      {/* Result cards stack */}
                      <div className="absolute top-0 left-0 w-48 h-32 bg-white rounded-lg border border-gray-200 shadow-md p-3 transform -rotate-6 animate-float-slow">
                        <div className="h-2 w-16 bg-amber-500 rounded mb-2"></div>
                        <div className="h-1 w-full bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 w-3/4 bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                      <div className="absolute top-4 left-4 w-48 h-32 bg-white rounded-lg border border-gray-200 shadow-md p-3 transform rotate-3 animate-float" style={{ animationDelay: "0.2s" }}>
                        <div className="h-2 w-16 bg-red-500 rounded mb-2"></div>
                        <div className="h-1 w-full bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 w-4/5 bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 w-2/3 bg-gray-200 rounded"></div>
                      </div>
                      <div className="absolute top-8 left-8 w-48 h-32 bg-white rounded-lg border border-gray-200 shadow-lg p-3 animate-pop-in" style={{ animationDelay: "0.4s" }}>
                        <div className="h-2 w-16 bg-gradient-to-r from-amber-500 to-red-600 rounded mb-2"></div>
                        <div className="h-1 w-full bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 w-3/5 bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 w-4/5 bg-gray-200 rounded"></div>
                        
                        {/* Badge overlay */}
                        <div className="absolute -right-3 -top-3 w-12 h-12 bg-gradient-to-br from-amber-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse-scale" style={{ animationDelay: "0.7s" }}>
                          <div className="text-center">
                            <div className="text-xs">85%</div>
                            <div className="text-[8px]">Roasted</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-center mb-2">Get honest feedback</h3>
                    <p className="text-gray-500 text-center max-w-xs">Receive detailed insights with actionable improvements for your resume</p>
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
                    }, 4000);
                    if (demoRef.current) {
                      const demoSteps = demoRef.current.querySelectorAll('.demo-step');
                      demoSteps.forEach((el) => el.classList.remove('active'));
                      if (demoSteps[step - 1]) demoSteps[step - 1].classList.add('active');
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${demoStepRef.current === step ? 'bg-amber-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Go to demo step ${step}`}
                ></button>
              ))}
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
              <Button 
                onClick={() => navigate('/roaster')} 
                ref={ctaButtonRef}
                className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 px-6 py-3 text-lg rounded-lg shadow-lg group"
              >
                <span className="mr-2">🔥 Ready to Get Roasted? Try Now</span>
                <ChevronRight size={20} className="inline-block group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
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
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.6
