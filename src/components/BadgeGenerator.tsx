
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Share, Award } from "lucide-react";
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
        
        setIsGenerating(false);
        toast({
          title: "Badge created!",
          description: "Your badge has been downloaded."
        });
      }, 500); // Small delay for animation
    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Failed to generate badge",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card className="overflow-hidden animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-red-600 text-white">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award size={18} />
          Your Roast Badge
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div 
          ref={badgeRef}
          className={`border-8 border-double rounded-lg p-6 bg-gradient-to-r from-amber-50 to-red-50 flex flex-col items-center justify-center text-center ${isGenerating ? 'scale-105 opacity-90' : ''} transition-all duration-300`}
        >
          <div className="bg-gradient-to-r from-amber-600 to-red-600 text-white p-2 rounded-full w-16 h-16 mb-2 flex items-center justify-center">
            <span className="text-2xl font-bold">{roastLevel}%</span>
          </div>
          <h3 className="text-xl font-bold mt-2">{tagline}</h3>
          <p className="text-sm text-gray-600 mt-1">Resume Roast Achievement</p>
        </div>
        
        <div className="mt-4 flex justify-center gap-2">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 flex items-center gap-2"
            disabled={isGenerating}
          >
            <Download size={16} />
            Download Badge
          </Button>
          <Button variant="outline" onClick={() => {
            navigator.clipboard.writeText(`I just got my resume roasted! My level: ${roastLevel}% - ${tagline}`);
            toast({
              title: "Copied to clipboard!",
              description: "Share your badge with friends."
            });
          }}>
            <Share size={16} className="mr-2" />
            Copy Text
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeGenerator;
