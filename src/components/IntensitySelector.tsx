
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Thermometer, Flame, FireExtinguisher } from "lucide-react";
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
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="flex flex-col items-center">
            <Button 
              onClick={() => handleSelectIntensity("Mild", 30)}
              variant="outline" 
              className="w-full h-24 flex flex-col items-center justify-center transition-all duration-300 hover:bg-yellow-50 hover:border-yellow-300 group"
            >
              <FireExtinguisher 
                size={36} 
                className="text-yellow-500 group-hover:scale-110 transition-transform duration-300" 
              />
              <span className="mt-2 font-medium">Mild</span>
            </Button>
            <p className="text-xs mt-2 text-muted-foreground text-center">Gentle feedback</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              onClick={() => handleSelectIntensity("Medium", 60)}
              variant="outline" 
              className="w-full h-24 flex flex-col items-center justify-center transition-all duration-300 hover:bg-orange-50 hover:border-orange-300 group"
            >
              <Thermometer 
                size={36} 
                className="text-orange-500 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse" 
              />
              <span className="mt-2 font-medium">Medium</span>
            </Button>
            <p className="text-xs mt-2 text-muted-foreground text-center">Balanced critique</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              onClick={() => handleSelectIntensity("Savage", 90)}
              variant="outline" 
              className="w-full h-24 flex flex-col items-center justify-center transition-all duration-300 hover:bg-red-50 hover:border-red-300 group"
            >
              <Flame 
                size={36} 
                className="text-red-500 group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse" 
              />
              <span className="mt-2 font-medium">Savage</span>
            </Button>
            <p className="text-xs mt-2 text-muted-foreground text-center">Brutally honest</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntensitySelector;
