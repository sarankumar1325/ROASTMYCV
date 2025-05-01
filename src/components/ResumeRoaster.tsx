
import React, { useState, useRef, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Thermometer } from "lucide-react";
import RoastResult from "./RoastResult";
import { roastResume } from "../services/resumeService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import IntensitySelector from "./IntensitySelector";

const ResumeRoaster: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRoasting, setIsRoasting] = useState(false);
  const [roastLevel, setRoastLevel] = useState(0);
  const [selectedIntensity, setSelectedIntensity] = useState<string>("");
  const [roastResult, setRoastResult] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showIntensitySelector, setShowIntensitySelector] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showRoastAnimation, setShowRoastAnimation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };
  
  const validateAndSetFile = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }
    
    setFile(selectedFile);
    animateUpload();
  };

  const animateUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload progress animation
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setRoastLevel(i);
    }
    
    setIsUploading(false);
    // Show intensity selector after upload completes
    setShowIntensitySelector(true);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleIntensitySelect = (intensity: string, level: number) => {
    setSelectedIntensity(intensity);
    setRoastLevel(level);
    
    // Hide intensity selector and start roasting process
    setShowIntensitySelector(false);
    setShowDialog(true);
  };

  const handleRoastResume = async () => {
    if (!file) return;

    try {
      setIsRoasting(true);
      setShowDialog(false);
      
      // Play the toast animation
      setShowRoastAnimation(true);
      
      // Wait for toast animation to complete before starting progress
      setTimeout(async () => {
        setShowRoastAnimation(false);
        
        // Simulate roasting progress
        for (let i = 0; i <= 100; i += 5) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setRoastLevel(i);
        }
        
        const result = await roastResume(file);
        setRoastResult(result);
        
        setTimeout(() => {
          setIsRoasting(false);
        }, 500);
        
        toast({
          title: "Roasting complete",
          description: "Your resume has been thoroughly roasted!",
        });
      }, 2000); // Time for animation to complete
      
    } catch (error) {
      setIsRoasting(false);
      setShowRoastAnimation(false);
      toast({
        title: "Roasting failed",
        description: "Failed to roast your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFile(null);
    setRoastResult(null);
    setRoastLevel(0);
    setSelectedIntensity("");
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <div className="flex flex-col h-full p-6 pt-20">
      {!roastResult ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-6">
          {/* Toast animation */}
          {showRoastAnimation && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="relative">
                <div className="animate-bounce bg-white rounded-lg p-4 shadow-lg">
                  <FileText size={48} className="text-gray-700" />
                </div>
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                  style={{
                    animation: 'toaster-animation 2s forwards'
                  }}
                >
                  <div className="bg-gradient-to-r from-amber-500 to-red-600 p-6 rounded-lg shadow-lg">
                    <Thermometer size={32} className="text-white animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div 
            className={`border-2 border-dashed rounded-lg p-10 w-full max-w-md text-center transition-all duration-300 ease-in-out ${
              isDragging ? 'border-primary bg-primary/5' : 
              file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }`}
            onClick={handleUploadClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf"
            />
            
            <div className="flex flex-col items-center gap-3">
              {file ? (
                <>
                  <FileText size={48} className="text-green-500 animate-pulse" />
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </>
              ) : (
                <>
                  <Upload size={48} className={`${isDragging ? 'text-primary scale-110' : 'text-gray-400'} hover-scale transition-all duration-300`} />
                  <p className="font-medium">Upload your resume</p>
                  <p className="text-sm text-gray-500">
                    {isDragging ? "Drop your file here" : "Click or drag & drop your PDF"}
                  </p>
                </>
              )}
            </div>
          </div>
          
          {file && (
            <div className="w-full max-w-md">
              {(isUploading || isRoasting) && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      {isUploading ? "Uploading..." : "Preparing the roast..."}
                    </span>
                    <span className="text-sm font-medium">{roastLevel}%</span>
                  </div>
                  <Progress value={roastLevel} className="h-2" />
                </div>
              )}
              
              <div className="flex gap-4">
                <Button 
                  onClick={resetForm} 
                  variant="outline" 
                  className="flex-1 group"
                  disabled={isUploading || isRoasting}
                >
                  <span className="group-hover:scale-105 transition-transform duration-200">Cancel</span>
                </Button>
                
                {selectedIntensity && !isRoasting && !isUploading && (
                  <Button 
                    onClick={handleRoastResume} 
                    className="flex-1 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 animate-enter group"
                  >
                    <Thermometer size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Roast It!</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <RoastResult result={roastResult} roastLevel={roastLevel} onReset={resetForm} />
      )}

      {/* Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ready to roast your resume?</DialogTitle>
            <DialogDescription>
              Our AI will analyze your resume and give you brutally honest feedback with {selectedIntensity.toLowerCase()} intensity. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowDialog(false)}
              className="group"
            >
              <span className="group-hover:scale-105 transition-transform duration-200">Cancel</span>
            </Button>
            <Button 
              onClick={handleRoastResume}
              className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 group"
            >
              <Thermometer size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
              <span className="group-hover:translate-x-1 transition-transform duration-200">Roast It!</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Intensity Selector */}
      <IntensitySelector 
        open={showIntensitySelector} 
        onClose={() => setShowIntensitySelector(false)}
        onSelectIntensity={handleIntensitySelect}
      />
    </div>
  );
};

export default ResumeRoaster;
