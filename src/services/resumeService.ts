
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
        metadata: { size: file.size, type: file.type }
      })
      .select('*')
      .single();
    
    if (error) throw error;
    
    return data;
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
    return data || [];
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
    return data;
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
