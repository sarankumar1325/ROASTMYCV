
import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, BarChart, TrendingUp, TrendingDown } from "lucide-react";

interface InsightPanelProps {
  roastLevel: number;
  result: string;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ roastLevel, result }) => {
  const [animatedStrengths, setAnimatedStrengths] = useState(0);
  const [animatedImprovements, setAnimatedImprovements] = useState(0);
  
  const insights = useMemo(() => {
    // Extract insights based on the roast result
    const weaknesses = result.toLowerCase().includes('weakness') ? true : false;
    const overused = result.toLowerCase().includes('cliché') || result.toLowerCase().includes('overused') ? true : false;
    
    // Calculate metrics based on roast level
    const strengths = Math.max(2, Math.floor(5 - (roastLevel / 20)));
    const improvements = Math.max(2, Math.ceil(roastLevel / 20));
    
    return {
      strengths,
      weaknesses,
      overused,
      improvements,
    };
  }, [result, roastLevel]);
  
  useEffect(() => {
    // Delay start of animation for visual effect
    setTimeout(() => {
      // Animate the counters
      let strengthsCounter = 0;
      let improvementsCounter = 0;
      
      const strengthsInterval = setInterval(() => {
        strengthsCounter += 1;
        setAnimatedStrengths(strengthsCounter);
        
        if (strengthsCounter >= insights.strengths) {
          clearInterval(strengthsInterval);
        }
      }, 150);
      
      const improvementsInterval = setInterval(() => {
        improvementsCounter += 1;
        setAnimatedImprovements(improvementsCounter);
        
        if (improvementsCounter >= insights.improvements) {
          clearInterval(improvementsInterval);
        }
      }, 150);
      
      return () => {
        clearInterval(strengthsInterval);
        clearInterval(improvementsInterval);
      };
    }, 500);
  }, [insights.strengths, insights.improvements]);
  
  return (
    <Card className="animate-fade-in">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          Resume Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all duration-300 hover:bg-green-100 group">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp size={16} className="text-green-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-green-600">Strengths</span>
                </div>
                <span className="text-2xl font-bold text-green-600 counter-animate">{animatedStrengths}</span>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex flex-col items-center hover:shadow-md transition-all duration-300 hover:bg-amber-100 group">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingDown size={16} className="text-amber-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-amber-600">To Improve</span>
                </div>
                <span className="text-2xl font-bold text-amber-600 counter-animate">{animatedImprovements}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Quick Analysis</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 group bg-white p-3 rounded-md border hover:border-primary transition-colors duration-200 hover:bg-gray-50">
                {insights.weaknesses ? (
                  <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                )}
                <span>
                  {insights.weaknesses 
                    ? "Weaknesses identified in your resume" 
                    : "Strong structure with few weaknesses"}
                </span>
              </li>
              <li className="flex items-start gap-2 group bg-white p-3 rounded-md border hover:border-primary transition-colors duration-200 hover:bg-gray-50">
                {insights.overused ? (
                  <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                )}
                <span>
                  {insights.overused 
                    ? "Contains clichés or overused phrases" 
                    : "Good use of original language"}
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium mb-2 flex items-center gap-1 text-blue-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              Next Steps
            </h3>
            <p className="text-sm text-blue-700">
              Use these insights to refine your resume. 
              Focus on addressing the roast points to improve
              your chances of landing interviews. Remember to download 
              your badge for sharing!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightPanel;
