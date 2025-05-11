
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { FileText, Search, Download, Save, Link, Upload } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';

// Ensure the PDF.js worker is correctly set up
const pdfjsVersion = '3.11.174';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

const ResumeKeywordAnalyzer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState<string>('');
  const [resumeContent, setResumeContent] = useState<string>('');
  const [matchingKeywords, setMatchingKeywords] = useState<string[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false);
  const [savedAnalyses, setSavedAnalyses] = useState<{name: string, matching: string[], missing: string[]}[]>([]);
  const [analysisName, setAnalysisName] = useState<string>('');
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Common industry keywords to check against
  const industryKeywords = {
    tech: [
      "javascript", "react", "node", "python", "java", "agile", "cloud", "aws", 
      "azure", "devops", "ci/cd", "api", "rest", "microservices", "docker", 
      "kubernetes", "machine learning", "artificial intelligence", "data science"
    ],
    marketing: [
      "seo", "content marketing", "social media", "analytics", "campaign", 
      "brand", "digital marketing", "ppc", "conversion", "engagement", "kpi", 
      "growth", "strategy", "audience", "roi"
    ],
    finance: [
      "accounting", "budgeting", "financial analysis", "forecasting", "audit", 
      "taxation", "investment", "portfolio", "compliance", "risk assessment", 
      "financial reporting", "business valuation", "reconciliation"
    ],
    general: [
      "leadership", "communication", "teamwork", "project management", 
      "problem-solving", "analytical", "strategic thinking", "detail-oriented", 
      "time management", "organization", "customer service"
    ]
  };

  // Load saved analyses from localStorage on component mount
  React.useEffect(() => {
    const savedAnalysesFromStorage = localStorage.getItem('resumeKeywordAnalyses');
    if (savedAnalysesFromStorage) {
      try {
        setSavedAnalyses(JSON.parse(savedAnalysesFromStorage));
      } catch (error) {
        console.error('Error parsing saved analyses:', error);
      }
    }
  }, []);
  
  const extractKeywords = (text: string): string[] => {
    // Convert to lowercase and remove special characters
    const cleanedText = text.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Create a set of all keywords from all categories
    const allKeywords = new Set([
      ...industryKeywords.tech, 
      ...industryKeywords.marketing, 
      ...industryKeywords.finance, 
      ...industryKeywords.general
    ]);
    
    // Filter keywords found in the text
    const foundKeywords = Array.from(allKeywords).filter(keyword => 
      cleanedText.includes(keyword.toLowerCase())
    );
    
    return foundKeywords;
  };
  
  const analyzeResume = () => {
    if (!jobDescription || !resumeContent) {
      toast({
        title: "Missing Content",
        description: "Please provide both a job description and your resume content.",
        variant: "destructive"
      });
      return;
    }
    
    // Extract keywords from job description
    const jobKeywords = extractKeywords(jobDescription);
    
    // Extract keywords from resume
    const resumeKeywords = extractKeywords(resumeContent);
    
    // Find matching keywords
    const matching = jobKeywords.filter(keyword => 
      resumeKeywords.includes(keyword)
    );
    
    // Find missing keywords
    const missing = jobKeywords.filter(keyword => 
      !resumeKeywords.includes(keyword)
    );
    
    setMatchingKeywords(matching);
    setMissingKeywords(missing);
    setIsAnalyzed(true);
    
    toast({
      title: "Analysis Complete",
      description: `Found ${matching.length} matching keywords and ${missing.length} missing keywords.`,
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoadingFile(true);
    
    try {
      if (file.type === 'application/pdf') {
        // Handle PDF file
        const fileData = new Uint8Array(await file.arrayBuffer());
        const pdfDocument = await pdfjs.getDocument({ data: fileData }).promise;
        
        let fullText = '';
        
        // Extract text from each page
        for (let i = 1; i <= pdfDocument.numPages; i++) {
          const page = await pdfDocument.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + ' ';
        }
        
        setResumeContent(fullText);
        toast({
          title: "Resume Uploaded",
          description: `Successfully extracted text from "${file.name}"`,
        });
      } else if (file.type === 'text/plain' || file.type === 'application/msword' || 
                 file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Handle text/Word files
        const text = await file.text();
        setResumeContent(text);
        toast({
          title: "Resume Uploaded",
          description: `Successfully loaded text from "${file.name}"`,
        });
      } else {
        toast({
          title: "Unsupported File",
          description: "Please upload a PDF, TXT, DOC or DOCX file.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error Processing File",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingFile(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const saveAnalysis = () => {
    if (!analysisName) {
      toast({
        title: "Name Required",
        description: "Please provide a name for this analysis.",
        variant: "destructive"
      });
      return;
    }
    
    const newAnalysis = {
      name: analysisName,
      matching: matchingKeywords,
      missing: missingKeywords
    };
    
    const updatedAnalyses = [...savedAnalyses, newAnalysis];
    setSavedAnalyses(updatedAnalyses);
    
    // Save to localStorage
    localStorage.setItem('resumeKeywordAnalyses', JSON.stringify(updatedAnalyses));
    
    toast({
      title: "Analysis Saved",
      description: `"${analysisName}" has been saved to your analyses.`,
    });
    
    setAnalysisName('');
  };

  const loadAnalysis = (analysis: { name: string, matching: string[], missing: string[] }) => {
    setMatchingKeywords(analysis.matching);
    setMissingKeywords(analysis.missing);
    setIsAnalyzed(true);
    
    toast({
      title: "Analysis Loaded",
      description: `"${analysis.name}" has been loaded.`,
    });
  };

  const deleteAnalysis = (index: number, name: string) => {
    const updatedAnalyses = [...savedAnalyses];
    updatedAnalyses.splice(index, 1);
    setSavedAnalyses(updatedAnalyses);
    
    // Update localStorage
    localStorage.setItem('resumeKeywordAnalyses', JSON.stringify(updatedAnalyses));
    
    toast({
      title: "Analysis Deleted",
      description: `"${name}" has been removed from your saved analyses.`,
    });
  };
  
  const downloadReport = () => {
    if (!isAnalyzed) {
      toast({
        title: "No Analysis",
        description: "Please analyze your resume first.",
        variant: "destructive"
      });
      return;
    }
    
    const report = `
RESUME KEYWORD ANALYSIS REPORT
=============================

MATCHING KEYWORDS (${matchingKeywords.length})
-------------------
${matchingKeywords.join(', ')}

MISSING KEYWORDS (${missingKeywords.length})
------------------
${missingKeywords.join(', ')}

RECOMMENDATIONS
--------------
• Consider including the missing keywords in your resume if they're relevant to your experience
• Use the exact terminology found in the job description
• Place important keywords near the top of your resume
• Include keywords in context, not just as a list
• Customize your resume for each job application

Generated by ResumeRoaster.com
    `;
    
    try {
      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Keyword_Analysis_Report.txt';
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
      toast({
        title: "Report Downloaded!",
        description: "Your keyword analysis report has been downloaded.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the report. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block p-2 bg-purple-100 rounded-lg mb-4">
            <Search className="text-purple-500 h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Resume Keyword Analyzer</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find out how well your resume matches the keywords in a job description to increase your chances of getting past ATS systems
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-medium mb-2">Job Description</label>
            <Textarea 
              placeholder="Paste the job description here..." 
              className="h-60"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block font-medium mb-2">Your Resume</label>
            <div className="flex flex-col gap-2">
              <Textarea 
                placeholder="Paste your resume content here or upload a resume file..." 
                className="h-60"
                value={resumeContent}
                onChange={(e) => setResumeContent(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1"
                  disabled={isLoadingFile}
                >
                  <Upload className="h-4 w-4" />
                  {isLoadingFile ? 'Loading...' : 'Upload Resume'}
                </Button>
                <span className="text-xs text-gray-500">
                  Supported formats: PDF, TXT, DOC, DOCX
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
          <Button 
            onClick={analyzeResume}
            className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Analyze Keywords
          </Button>
        </div>
        
        {isAnalyzed && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-8">
            <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-700 mb-2 flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Matching Keywords ({matchingKeywords.length})
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {matchingKeywords.length > 0 ? (
                    matchingKeywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No matching keywords found.</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-amber-700 mb-2 flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Missing Keywords ({missingKeywords.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.length > 0 ? (
                    missingKeywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Great job! No missing keywords.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Name this analysis..."
                    value={analysisName}
                    onChange={(e) => setAnalysisName(e.target.value)}
                    className="w-48"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={saveAnalysis}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    Save Analysis
                  </Button>
                </div>
                
                <Button 
                  onClick={downloadReport}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {savedAnalyses.length > 0 && (
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 mb-8">
            <h3 className="font-bold mb-3">Your Saved Analyses</h3>
            <div className="space-y-2">
              {savedAnalyses.map((analysis, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-100">
                  <span className="font-medium">{analysis.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500">
                      <span className="text-green-600">{analysis.matching.length} matches</span>
                      {" • "}
                      <span className="text-amber-600">{analysis.missing.length} missing</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => loadAnalysis(analysis)} 
                      className="text-blue-600"
                    >
                      Load
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteAnalysis(index, analysis.name)} 
                      className="text-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8 bg-purple-50 p-6 rounded-lg border border-purple-100">
          <h3 className="font-bold mb-3">Keyword Optimization Tips</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Use exact keywords from the job description when possible</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Include both the spelled out term and acronym where relevant (e.g., "Search Engine Optimization (SEO)")</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Place important keywords near the top of your resume</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Use keywords naturally in context, rather than keyword stuffing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span>Keep your formatting simple to ensure ATS compatibility</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeKeywordAnalyzer;
