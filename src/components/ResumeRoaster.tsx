
import React, { useState, useRef } from 'react';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Thermometer } from "lucide-react";
import RoastResult from "./RoastResult";
import { roastResume } from "../services/resumeService";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const ResumeRoaster: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRoasting, setIsRoasting] = useState(false);
  const [roastLevel, setRoastLevel] = useState(0);
  const [roastResult, setRoastResult] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
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
    }
  };

  const animateUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload progress animation
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setRoastLevel(i);
    }
    
    setIsUploading(false);
    setIsRoasting(true);
    
    setTimeout(() => {
      setIsRoasting(false);
      setShowDialog(true);
    }, 1500);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRoastResume = async () => {
    if (!file) return;

    try {
      setIsRoasting(true);
      setShowDialog(false);
      
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
    } catch (error) {
      setIsRoasting(false);
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
  };

  return (
    <div className="flex flex-col h-full p-6">
      {!roastResult ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-10 w-full max-w-md text-center transition-all duration-300 ease-in-out ${
              file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }`}
            onClick={handleUploadClick}
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
                  <Upload size={48} className="text-gray-400 hover-scale" />
                  <p className="font-medium">Upload your resume</p>
                  <p className="text-sm text-gray-500">Click or drag & drop your PDF</p>
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
                  className="flex-1"
                  disabled={isUploading || isRoasting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleRoastResume} 
                  className="flex-1 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 animate-enter"
                  disabled={isUploading || isRoasting || !file}
                >
                  <Thermometer size={18} className="mr-2" />
                  Roast It!
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <RoastResult result={roastResult} roastLevel={roastLevel} onReset={resetForm} />
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ready to roast your resume?</DialogTitle>
            <DialogDescription>
              Our AI will analyze your resume and give you brutally honest feedback. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRoastResume}
              className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700"
            >
              <Thermometer size={18} className="mr-2" />
              Roast It!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeRoaster;
