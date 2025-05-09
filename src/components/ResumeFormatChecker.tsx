
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Check, X, FileText, Layout, FileSpreadsheet, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

// Initial checklist data
const initialFormatChecklist: ChecklistItem[] = [
  { id: "f1", label: "Clear section headings", description: "Use bold, slightly larger font for section titles", checked: false },
  { id: "f2", label: "Consistent font styles", description: "Stick to 1-2 professional fonts (e.g., Arial, Calibri)", checked: false },
  { id: "f3", label: "Proper spacing & margins", description: "0.5-1 inch margins with enough white space", checked: false },
  { id: "f4", label: "Bullet points for achievements", description: "Use bullets for readability, not paragraphs", checked: false },
  { id: "f5", label: "Contact information at top", description: "Name, phone, email, LinkedIn (optional)", checked: false },
  { id: "f6", label: "PDF file format for submission", description: "Preserve formatting across all systems", checked: false },
  { id: "f7", label: "Reverse chronological order", description: "Most recent experience first", checked: false },
  { id: "f8", label: "No graphics or tables", description: "May cause ATS compatibility issues", checked: false }
];

const initialContentChecklist: ChecklistItem[] = [
  { id: "c1", label: "Quantified achievements", description: "Numbers, percentages, or specific outcomes", checked: false },
  { id: "c2", label: "Action verbs start bullet points", description: "Led, Created, Implemented, etc.", checked: false },
  { id: "c3", label: "Relevant keywords included", description: "Match skills from job description", checked: false },
  { id: "c4", label: "No spelling/grammar errors", description: "Proofread multiple times", checked: false },
  { id: "c5", label: "No first person pronouns", description: "Avoid I, me, my throughout resume", checked: false },
  { id: "c6", label: "No clichés or fluff", description: "Team player, detail-oriented, etc.", checked: false },
  { id: "c7", label: "Appropriate length", description: "1 page for <10 years experience, 2 max", checked: false },
  { id: "c8", label: "Tailored to specific job", description: "Customized for the role, not generic", checked: false }
];

const ResumeFormatChecker: React.FC = () => {
  const [formatChecklist, setFormatChecklist] = useState<ChecklistItem[]>(initialFormatChecklist);
  const [contentChecklist, setContentChecklist] = useState<ChecklistItem[]>(initialContentChecklist);
  const { toast } = useToast();

  const formatScore = (formatChecklist.filter(item => item.checked).length / formatChecklist.length) * 100;
  const contentScore = (contentChecklist.filter(item => item.checked).length / contentChecklist.length) * 100;
  const overallScore = (formatScore + contentScore) / 2;

  const handleFormatItemToggle = (id: string) => {
    setFormatChecklist(currentList => 
      currentList.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleContentItemToggle = (id: string) => {
    setContentChecklist(currentList => 
      currentList.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const resetChecklist = () => {
    setFormatChecklist(initialFormatChecklist);
    setContentChecklist(initialContentChecklist);
    toast({
      title: "Checklist Reset",
      description: "All progress has been cleared.",
    });
  };

  const generateReport = () => {
    toast({
      title: "Report Generated",
      description: "Check your downloads folder for the PDF report.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-block p-2 bg-amber-100 rounded-lg mb-4">
          <FileText size={24} className="text-amber-500" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Resume Format Checker</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Use this tool to ensure your resume follows industry best practices for formatting and content
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <h3 className="font-bold text-lg">Resume Quality Score</h3>
            
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Formatting</span>
                  <span className="text-sm font-medium">{Math.round(formatScore)}%</span>
                </div>
                <Progress value={formatScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Content</span>
                  <span className="text-sm font-medium">{Math.round(contentScore)}%</span>
                </div>
                <Progress value={contentScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span className="text-sm font-medium">{Math.round(overallScore)}%</span>
                </div>
                <Progress 
                  value={overallScore} 
                  className={`h-3 ${
                    overallScore >= 80 ? 'bg-green-500' :
                    overallScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`} 
                />
              </div>
            </div>
            
            {overallScore < 60 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">Your resume needs significant improvement to meet industry standards.</p>
              </div>
            )}
            
            {overallScore >= 60 && overallScore < 80 && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">Your resume is on the right track but could use some refinements.</p>
              </div>
            )}
            
            {overallScore >= 80 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg flex items-start gap-3">
                <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800">Great job! Your resume meets or exceeds most industry standards.</p>
              </div>
            )}
          </div>
          
          <Tabs defaultValue="format" className="w-full">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="format" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  Format & Structure
                </TabsTrigger>
                <TabsTrigger value="content" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  Content & Language
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="format" className="p-6">
              <div className="space-y-4">
                {formatChecklist.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-3 border rounded-lg flex items-start gap-3 cursor-pointer transition-colors ${
                      item.checked ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleFormatItemToggle(item.id)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.checked ? 'bg-green-100 border border-green-500' : 'border border-gray-300'
                    }`}>
                      {item.checked && <Check size={14} className="text-green-500" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.label}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="p-6">
              <div className="space-y-4">
                {contentChecklist.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-3 border rounded-lg flex items-start gap-3 cursor-pointer transition-colors ${
                      item.checked ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleContentItemToggle(item.id)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.checked ? 'bg-green-100 border border-green-500' : 'border border-gray-300'
                    }`}>
                      {item.checked && <Check size={14} className="text-green-500" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.label}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
            <button 
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
              onClick={resetChecklist}
            >
              <X size={14} />
              <span>Reset Checklist</span>
            </button>
            
            <div className="flex gap-3">
              <Button variant="outline" className="text-amber-600 border-amber-600">
                <Layout size={16} className="mr-2" />
                View Templates
              </Button>
              <Button className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700" onClick={generateReport}>
                <FileSpreadsheet size={16} className="mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
          <h3 className="font-bold text-lg mb-4">Resume Templates</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Professional Template", tag: "Most Popular" },
              { name: "Creative Template", tag: "ATS-Friendly" },
              { name: "Executive Template", tag: "New" },
            ].map((template, i) => (
              <div 
                key={i} 
                className="border border-gray-200 rounded-lg p-4 hover:border-amber-500 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  <div className="h-32 bg-gray-100 rounded flex items-center justify-center mb-3">
                    <FileText size={24} className="text-gray-400" />
                  </div>
                  <span className="absolute top-2 right-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    {template.tag}
                  </span>
                </div>
                <h4 className="font-medium text-sm">{template.name}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">DOCX, PDF</span>
                  <button className="text-amber-600 hover:text-amber-800 text-xs font-medium">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFormatChecker;
