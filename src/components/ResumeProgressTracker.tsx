
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Check, ChevronRight, Clock, Save } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const ResumeProgressTracker: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'step1',
      title: 'Create Basic Format',
      description: 'Set up the overall structure and format of your resume',
      completed: false
    },
    {
      id: 'step2',
      title: 'Add Contact Information',
      description: 'Include your name, phone, email, and professional profiles',
      completed: false
    },
    {
      id: 'step3',
      title: 'Add Work Experience',
      description: 'List your work history with achievements and responsibilities',
      completed: false
    },
    {
      id: 'step4',
      title: 'Add Education',
      description: 'Include your educational background and certifications',
      completed: false
    },
    {
      id: 'step5',
      title: 'Add Skills',
      description: 'Highlight your relevant technical and soft skills',
      completed: false
    },
    {
      id: 'step6',
      title: 'Format and Proofread',
      description: 'Check formatting consistency and proofread for errors',
      completed: false
    },
    {
      id: 'step7',
      title: 'Get Feedback',
      description: 'Use our Resume Roaster to receive professional feedback',
      completed: false
    },
  ]);
  
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;
  
  const toggleStep = (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId 
        ? { ...step, completed: !step.completed } 
        : step
    ));
  };
  
  const saveProgress = () => {
    // In a real app, this would save to localStorage or a database
    const now = new Date().toLocaleTimeString();
    setLastSaved(now);
    toast({
      title: "Progress Saved",
      description: `Your resume progress has been saved at ${now}.`,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Resume Progress Tracker</h2>
          <p className="text-gray-500">
            Keep track of your resume creation progress with this checklist
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Your Progress:</span>
            <span className="text-sm">{completedSteps}/{steps.length} steps completed</span>
          </div>
          <span className="font-bold text-lg">{Math.round(progress)}%</span>
        </div>
        
        <Progress value={progress} className="h-2 mb-6" />
        
        <div className="space-y-4">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`p-4 border rounded-lg cursor-pointer transition-colors
                ${step.completed 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 hover:bg-gray-50'}`}
              onClick={() => toggleStep(step.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center
                    ${step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'border border-gray-300 text-gray-400'}`}
                  >
                    {step.completed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                  <span className={`font-medium ${step.completed ? 'line-through text-gray-500' : ''}`}>
                    {step.title}
                  </span>
                </div>
                <button 
                  className={`text-xs px-2 py-1 rounded
                    ${step.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStep(step.id);
                  }}
                >
                  {step.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1 ml-9">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          {lastSaved ? (
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last saved: {lastSaved}
            </div>
          ) : (
            <div></div>
          )}
          
          <Button 
            onClick={saveProgress}
            className="flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            Save Progress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeProgressTracker;
