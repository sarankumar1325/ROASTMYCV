
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, BarChart } from "lucide-react";

interface InsightPanelProps {
  roastLevel: number;
  result: string;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ roastLevel, result }) => {
  const insights = useMemo(() => {
    // Extract insights based on the roast result
    const weaknesses = result.toLowerCase().includes('weakness') ? true : false;
    const overused = result.toLowerCase().includes('cliché') || result.toLowerCase().includes('overused') ? true : false;
    
    // Calculate some mock metrics
    const strengths = Math.max(2, Math.floor(5 - (roastLevel / 20)));
    const improvements = Math.max(2, Math.ceil(roastLevel / 20));
    
    return {
      strengths,
      weaknesses,
      overused,
      improvements,
    };
  }, [result, roastLevel]);
  
  return (
    <Card className="sticky top-6 animate-fade-in">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart size={18} />
          Resume Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg flex flex-col items-center">
                <span className="text-sm text-gray-600">Strengths</span>
                <span className="text-2xl font-bold text-green-600">{insights.strengths}</span>
              </div>
              <div className="bg-red-50 p-3 rounded-lg flex flex-col items-center">
                <span className="text-sm text-gray-600">Areas to Improve</span>
                <span className="text-2xl font-bold text-red-600">{insights.improvements}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Quick Analysis</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                {insights.weaknesses ? (
                  <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                )}
                <span>
                  {insights.weaknesses 
                    ? "Weaknesses identified in your resume" 
                    : "Strong structure with few weaknesses"}
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                {insights.overused ? (
                  <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                )}
                <span>
                  {insights.overused 
                    ? "Contains clichés or overused phrases" 
                    : "Good use of original language"}
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Next Steps</h3>
            <p className="text-sm text-gray-600">
              Use these insights to refine your resume. 
              Consider addressing the roast points to improve
              your chances of landing interviews.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightPanel;
