
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Thermometer, Flame, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IntensitySelectorProps {
  open: boolean;
  onClose: () => void;
  onSelectIntensity: (intensity: string, level: number) => void;
}

const IntensitySelector: React.FC<IntensitySelectorProps> = ({ 
  open, 
  onClose,
  onSelectIntensity 
}) => {
  const { toast } = useToast();
  
  const handleSelectIntensity = (intensity: string, level: number) => {
    onSelectIntensity(intensity, level);
    toast({
      title: `${intensity} intensity selected`,
      description: `Your resume will be roasted with ${intensity.toLowerCase()} intensity`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Select Roast Intensity</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-6">
          <div className="flex flex-col items-center">
            <Button 
              onClick={() => handleSelectIntensity("Mild", 30)}
              variant="outline" 
              className="w-full h-24 flex flex-col items-center justify-center transition-all duration-300 hover:border-yellow-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FileText 
                size={36} 
                className="text-yellow-500 group-hover:scale-110 transition-transform duration-300 relative z-10" 
              />
              <span className="mt-2 font-medium relative z-10">Mild</span>
            </Button>
            <p className="text-xs mt-2 text-muted-foreground text-center">Gentle feedback with constructive tone</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              onClick={() => handleSelectIntensity("Medium", 60)}
              variant="outline" 
              className="w-full h-24 flex flex-col items-center justify-center transition-all duration-300 hover:border-orange-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Thermometer 
                size={36} 
                className="text-orange-500 group-hover:scale-110 transition-transform duration-300 relative z-10" 
              />
              <span className="mt-2 font-medium relative z-10">Medium</span>
              <div className="absolute inset-0 bg-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-bg"></div>
            </Button>
            <p className="text-xs mt-2 text-muted-foreground text-center">Balanced critique with honest insights</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              onClick={() => handleSelectIntensity("Savage", 90)}
              variant="outline" 
              className="w-full h-24 flex flex-col items-center justify-center transition-all duration-300 hover:border-red-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Flame 
                size={36} 
                className="text-red-500 group-hover:scale-110 transition-transform duration-300 relative z-10" 
              />
              <span className="mt-2 font-medium relative z-10">Savage</span>
              <div className="absolute inset-0 bg-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-bg"></div>
            </Button>
            <p className="text-xs mt-2 text-muted-foreground text-center">Brutally honest, no holds barred</p>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground pb-4">
          Choose how intensely you want your resume to be critiqued
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntensitySelector;
