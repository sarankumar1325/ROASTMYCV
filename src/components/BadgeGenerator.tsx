
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
  
  const handleDownload = async () => {
    if (!badgeRef.current) return;
    
    setIsGenerating(true);
    toast({
      title: "Generating badge",
      description: "Creating your shareable badge..."
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
            description: "Your badge has been downloaded."
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
          </div>
          
          {/* Overlay effects that show during animation */}
          {showAnimation && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/0 via-amber-200/30 to-amber-200/0 animate-shimmer"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl">✨</div>
              <div className="absolute -bottom-2 left-1/4 transform -translate-x-1/2 text-3xl">✨</div>
              <div className="absolute -bottom-4 right-1/4 transform -translate-x-1/2 text-2xl">✨</div>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 flex items-center gap-2 group"
            disabled={isGenerating}
          >
            <Download size={16} className="group-hover:translate-y-1 transition-transform duration-200" />
            {isGenerating ? "Generating..." : "Download Badge"}
          </Button>
          
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(`I just got my resume roasted! My level: ${roastLevel}% - ${tagline} #ResumeRoast`);
            toast({
              title: "Copied to clipboard!",
              description: "Share your badge with friends."
            });
          }} className="group">
            <Copy size={16} className="mr-2 group-hover:scale-110 transition-transform duration-200" />
            Copy Text
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
    </Card>
  );
};

export default BadgeGenerator;
