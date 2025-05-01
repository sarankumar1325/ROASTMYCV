
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share, Award, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';

interface BadgeGeneratorProps {
  roastLevel: number;
  result: string;
}

const BadgeGenerator: React.FC<BadgeGeneratorProps> = ({ roastLevel, result }) => {
  const { toast } = useToast();
  const badgeRef = useRef<HTMLDivElement>(null);
  const [tagline, setTagline] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState<'static' | 'animated'>('static');
  
  useEffect(() => {
    // Generate a tagline based on roast level
    generateTagline();
  }, [roastLevel, result]);
  
  const generateTagline = () => {
    let prefix = '';
    let suffix = '';
    
    // Generate based on roast level
    if (roastLevel < 30) {
      prefix = 'Mild';
      suffix = ['Flamer', 'Toaster', 'Warmup Wizard', 'Gentle Critic'][Math.floor(Math.random() * 4)];
    } else if (roastLevel < 70) {
      prefix = 'Medium';
      suffix = ['Heat Veteran', 'Roast Pro', 'Critique Master', 'Resume Griller'][Math.floor(Math.random() * 4)];
    } else {
      prefix = 'Savage';
      suffix = ['Sear King', 'Burninator', 'Resume Destroyer', 'Critique Beast'][Math.floor(Math.random() * 4)];
    }
    
    setTagline(`${prefix} ${suffix}`);
  };
  
  const handleDownload = async (type: 'static' | 'animated') => {
    if (!badgeRef.current) return;
    
    setIsGenerating(true);
    setAnimationType(type);
    
    toast({
      title: "Generating badge",
      description: `Creating your ${type === 'static' ? 'PNG' : 'animated'} badge...`
    });
    
    try {
      // Show the stamping animation
      setShowAnimation(true);
      
      setTimeout(async () => {
        const canvas = await html2canvas(badgeRef.current as HTMLElement, {
          scale: 2,
          backgroundColor: null
        });
        
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = `resume-roast-badge-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => {
          setIsGenerating(false);
          setShowAnimation(false);
          toast({
            title: "Badge created!",
            description: `Your ${type === 'static' ? 'PNG' : 'animated'} badge has been downloaded.`
          });
        }, 500);
      }, 1200); // Wait for animation to complete
    } catch (error) {
      setIsGenerating(false);
      setShowAnimation(false);
      toast({
        title: "Failed to generate badge",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card className="overflow-hidden animate-scale-in relative">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-red-600 text-white">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award size={18} className="animate-pulse" />
          Your Roast Badge
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* The badge */}
        <div className={`relative ${showAnimation ? 'animate-stamp' : ''}`}>
          <div 
            ref={badgeRef}
            className={`border-8 border-double rounded-lg p-6 bg-gradient-to-r from-amber-50 to-red-50 flex flex-col items-center justify-center text-center ${
              isGenerating && !showAnimation ? 'scale-105 opacity-90' : ''
            } transition-all duration-300`}
          >
            <div className="bg-gradient-to-r from-amber-600 to-red-600 text-white p-2 rounded-full w-16 h-16 mb-2 flex items-center justify-center">
              <span className="text-2xl font-bold">{roastLevel}%</span>
            </div>
            <h3 className="text-xl font-bold mt-2">{tagline}</h3>
            <p className="text-sm text-gray-600 mt-1">Resume Roast Achievement</p>
            
            {/* Add subtle animated elements if animated type is selected */}
            {animationType === 'animated' && showAnimation && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            )}
          </div>
          
          {/* Overlay effects that show during animation */}
          {showAnimation && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/0 via-amber-200/30 to-amber-200/0 animate-shimmer"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl">✨</div>
              <div className="absolute -bottom-2 left-1/4 transform -translate-x-1/2 text-3xl">✨</div>
              <div className="absolute -bottom-4 right-1/4 transform -translate-x-1/2 text-2xl">✨</div>
              
              {/* Additional glitter effect */}
              <div className="absolute top-1/4 left-1/3 animate-pulse delay-100 text-2xl">✨</div>
              <div className="absolute top-1/2 right-1/4 animate-pulse delay-300 text-xl">✨</div>
              <div className="absolute bottom-1/4 left-1/2 animate-pulse delay-200 text-2xl">✨</div>
              
              {/* Add "thunk" visual effect */}
              {showAnimation && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-4xl opacity-0 animate-fade-in">
                  💥
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          <div className="w-full flex justify-center mb-2">
            <p className="text-xs text-center text-gray-500 mb-2">Choose your download format:</p>
          </div>
          
          <Button
            onClick={() => handleDownload('static')}
            className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 flex items-center gap-2 group"
            disabled={isGenerating}
          >
            <Download size={16} className="group-hover:translate-y-1 transition-transform duration-200" />
            PNG Static
          </Button>
          
          <Button
            onClick={() => handleDownload('animated')}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 flex items-center gap-2 group"
            disabled={isGenerating}
          >
            <Download size={16} className="group-hover:translate-y-1 transition-transform duration-200" />
            Animated Badge
          </Button>
          
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(`I just got my resume roasted! My level: ${roastLevel}% - ${tagline} #ResumeRoast`);
            toast({
              title: "Copied to clipboard!",
              description: "Share your badge with friends."
            });
          }} className="group w-full mt-2">
            <Copy size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
            Copy Share Text
          </Button>
          
          <Button variant="outline" onClick={() => {
            const text = encodeURIComponent(`I just got my resume roasted! My level: ${roastLevel}% - ${tagline} #ResumeRoast`);
            window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
          }} className="group">
            <Share size={16} className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
            Share
          </Button>
        </div>
      </CardContent>
      
      {/* Add CSS for animations */}
      <style>
        {`
        @keyframes stamp {
          0% { transform: translateY(-50px); opacity: 0; }
          60% { transform: translateY(10px); opacity: 1; }
          80% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-stamp {
          animation: stamp 0.6s ease-out forwards;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        `}
      </style>
    </Card>
  );
};

export default BadgeGenerator;
