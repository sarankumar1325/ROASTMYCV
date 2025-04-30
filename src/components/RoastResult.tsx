
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer } from "lucide-react";

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
  
  return (
    <div className="flex flex-col animate-fade-in gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Resume Roast Results</h2>
        <Button onClick={onReset} variant="outline">Upload Another</Button>
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
      </Card>
      
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
  );
};

export default RoastResult;
