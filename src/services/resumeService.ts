
import { supabase } from '@/integrations/supabase/client';
import type { Resume } from '@/types/database';
import * as pdfjsLib from 'pdfjs-dist';

// Load the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const uploadResume = async (file: File): Promise<Resume | null> => {
  try {
    // 1. Extract text from PDF
    const parsedText = await extractTextFromPDF(file);
    
    // 2. Upload file to Supabase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const { data: fileData, error: uploadError } = await supabase
      .storage
      .from('resumes')
      .upload(`public/${fileName}`, file);
    
    if (uploadError) throw uploadError;
    
    // 3. Get public URL
    const { data: urlData } = supabase
      .storage
      .from('resumes')
      .getPublicUrl(`public/${fileName}`);
    
    // 4. Save resume record to the database
    const { data, error } = await supabase
      .from('resumes')
      .insert({
        file_name: file.name,
        file_url: urlData.publicUrl,
        parsed_text: parsedText,
        metadata: { size: file.size, type: file.type },
        user_id: (await supabase.auth.getUser()).data.user?.id
      })
      .select('*')
      .single();
    
    if (error) throw error;
    
    return data as Resume;
  } catch (error) {
    console.error('Error uploading resume:', error);
    return null;
  }
};

export const getResumes = async (): Promise<Resume[]> => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Resume[] || [];
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return [];
  }
};

export const getResume = async (id: string): Promise<Resume | null> => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Resume;
  } catch (error) {
    console.error('Error fetching resume:', error);
    return null;
  }
};

// Function to extract text from PDF
const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    // Convert the File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Iterate through each page to extract text
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const textItems = textContent.items.map((item: any) => item.str).join(' ');
      
      fullText += textItems + '\n\n';
    }
    
    return fullText;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

// Add the missing roastResume function
export const roastResume = async (file: File): Promise<string> => {
  try {
    // Extract text from the PDF
    const resumeText = await extractTextFromPDF(file);
    
    // Mock response for now - in a real application, this would call an AI service
    // You can replace this with actual API calls to an AI service later
    const feedback = generateMockRoastFeedback(resumeText);
    
    return feedback;
  } catch (error) {
    console.error("Error roasting resume:", error);
    throw new Error("Failed to roast resume");
  }
};

// Helper function to generate mock feedback
const generateMockRoastFeedback = (resumeText: string): string => {
  // Check if there's actually content in the resume text
  if (!resumeText || resumeText.trim().length < 100) {
    return "Your resume appears to be quite sparse. It's so empty that even AI can't find enough content to roast!";
  }
  
  // This is just a mock implementation that would be replaced with real AI analysis
  const feedbackPoints = [
    "Your resume reads like it was written by someone who thinks 'attention to detail' is just a fancy phrase to include in the skills section. I found at least three typos in the first paragraph alone.",
    
    "Impressive how you managed to use so many buzzwords while saying absolutely nothing of substance. 'Synergistically leverage cross-functional team dynamics'? Are you applying for a job or trying to win buzzword bingo?",
    
    "Your job descriptions focus way too much on responsibilities and not enough on achievements. Nobody cares that you 'managed email correspondence' – we all do that. What did you actually accomplish?",
    
    "That objective statement is so generic it could apply to literally anyone in any field. Are you a unique professional or just a walking template?",
    
    "I see you listed Microsoft Office as a skill. Congratulations on mastering technology from 1995. Perhaps add 'proficient in turning on computer' while you're at it?",
    
    "Your employment gaps are more mysterious than the Bermuda Triangle. Either explain them or prepare for hiring managers to assume the worst.",
    
    "The layout of this resume makes my circuits hurt. There's no visual hierarchy, the font choices are questionable, and it looks like you're trying to cram 10 pounds of text into a 5-pound bag.",
  ];
  
  // Select a random subset of feedback points
  const selectedPoints = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * feedbackPoints.length);
    selectedPoints.push(feedbackPoints[randomIndex]);
    feedbackPoints.splice(randomIndex, 1);
  }
  
  // Return formatted feedback
  return `# Brutal Resume Roast\n\n${selectedPoints.map(point => `- ${point}`).join('\n\n')}

\n\n## Final Verdict\n\nYour resume needs significant work before it's ready for professional use. Focus on quantifying achievements, removing fluff language, and creating a cleaner design. Or don't, and enjoy explaining to your mom why you're still "between opportunities."`;
};
