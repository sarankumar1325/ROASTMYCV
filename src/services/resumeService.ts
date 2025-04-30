
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import * as pdfjsLib from 'pdfjs-dist';

// Load the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// API Key - in a real application, this should be stored securely
const API_KEY = "AIzaSyC74WevNjWdIdIhdJ9iG_MCSZbEhBxjrtg";

// Initialize the chat model with appropriate settings for resume analysis
const chatModel = new ChatGoogleGenerativeAI({
  apiKey: API_KEY,
  modelName: "gemini-2.0-flash",
  maxOutputTokens: 1024,
  temperature: 0.7,
});

export const roastResume = async (file: File): Promise<string> => {
  try {
    // Extract text from PDF
    const resumeText = await extractTextFromPDF(file);
    
    // Create a prompt for Gemini to roast the resume
    const prompt = `
    I want you to act as a brutally honest resume critic with a sense of humor.
    
    I'll provide you with resume text, and I want you to:
    
    1. Give an overall impression of the resume in a slightly roasting tone
    2. Point out the top 3 weaknesses in the resume in a humorous way
    3. Identify any clichés or overused phrases
    4. Rate the resume on a scale of 1-10 and explain your rating
    5. Provide 2-3 constructive suggestions for improvement
    
    Be creative and funny, but also provide genuinely useful feedback. 
    Important: Do not use asterisks (*) for formatting - use line breaks and clear sections instead.
    
    Here's the resume text:
    
    ${resumeText}
    `;
    
    // Get response from model
    const response = await chatModel.invoke([
      new HumanMessage(prompt)
    ]);
    
    return response.content as string;
  } catch (error) {
    console.error("Error roasting resume:", error);
    return "Sorry, I encountered an error while roasting your resume. Please try again.";
  }
};

// Real function to extract text from PDF
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
    
    console.log("Extracted PDF text:", fullText.substring(0, 100) + "...");
    return fullText;
  } catch (error) {
    console.error("Error extracting PDF text:", error);
    throw new Error("Failed to extract text from PDF");
  }
};
