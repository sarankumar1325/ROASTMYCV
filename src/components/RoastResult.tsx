
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Share, Linkedin, Twitter, Facebook } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import InsightPanel from "./InsightPanel";

interface RoastResultProps {
  result: string;
  roastLevel: number;
  onReset: () => void;
}

const RoastResult: React.FC<RoastResultProps> = ({ result, roastLevel, onReset }) => {
  useEffect(() => {
    // Auto-scroll to the result
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Split result into sections by line breaks, ensuring proper formatting
  const resultSections = result
    .split('\n\n')
    .filter(Boolean)
    .map(section => section.replace(/\*/g, '')); // Remove any asterisks
  
  const getTemperatureColor = (level: number) => {
    if (level < 30) return "text-yellow-400";
    if (level < 70) return "text-orange-500";
    return "text-red-600";
  };

  const handleShare = (platform: string) => {
    const shareText = encodeURIComponent("Check out my resume roast results!");
    let shareUrl = "";
    
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(window.location.href)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    } else {
      // Copy link to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied!",
          description: "Share link has been copied to clipboard",
        });
      });
    }
  };
  
  return (
    <div className="flex flex-col animate-fade-in gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Resume Roast Results</h2>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share size={16} />
                Share
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="end">
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare('twitter')} 
                  className="hover:bg-blue-100"
                >
                  <Twitter size={18} className="text-blue-500" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare('facebook')} 
                  className="hover:bg-blue-100"
                >
                  <Facebook size={18} className="text-blue-600" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare('linkedin')} 
                  className="hover:bg-blue-100"
                >
                  <Linkedin size={18} className="text-blue-700" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button onClick={onReset} variant="outline">Upload Another</Button>
        </div>
      </div>
      
      <Card className="mb-6 overflow-hidden border-2 animate-scale-in">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-red-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Roast Level</CardTitle>
            <div className="flex items-center gap-2">
              <Thermometer size={24} className={getTemperatureColor(roastLevel) + " animate-pulse"} />
              <span className="text-xl font-bold">{roastLevel}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Slider
            defaultValue={[roastLevel]}
            max={100}
            step={1}
            disabled
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Mild</span>
            <span>Medium</span>
            <span>Savage</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-6">
            {resultSections.map((section, index) => (
              <Card 
                key={index} 
                className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                  opacity: 0,
                  animation: "fade-in 0.5s ease-out forwards"
                }}
              >
                <CardContent className="p-6">
                  <p className="whitespace-pre-line">{section}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <InsightPanel roastLevel={roastLevel} result={result} />
        </div>
      </div>
    </div>
  );
};

export default RoastResult;
