
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

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
    // Extract text from PDF (in production, would use proper PDF parsing)
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
    
    Be creative, funny, but also provide genuinely useful feedback. Here's the resume text:
    
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

// Mock function to extract text from PDF
// In a production app, this would use a proper PDF parsing library
const extractTextFromPDF = async (file: File): Promise<string> => {
  // This is a mock function that simulates extracting text from a PDF
  // In a real application, you would use a library like pdf.js or a backend service
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock resume text for demonstration
  return `
  JOHN DOE
  123 Main Street | Anytown, USA | (555) 123-4567 | john.doe@email.com
  
  PROFESSIONAL SUMMARY
  Results-driven professional with a proven track record of success in fast-paced environments.
  Team player with excellent communication skills who thinks outside the box.
  
  EXPERIENCE
  Senior Manager | ABC Company | Jan 2020 - Present
  • Spearheaded initiatives that increased revenue by 25%
  • Managed a team of 10 professionals
  • Leveraged synergies to optimize workflow processes
  
  Project Lead | XYZ Corporation | Mar 2017 - Dec 2019
  • Utilized best practices to enhance customer satisfaction
  • Implemented innovative solutions that reduced costs by 15%
  • Collaborated with cross-functional teams to drive results
  
  EDUCATION
  MBA, Business Administration | University of Somewhere | 2015
  BS, Computer Science | College of Elsewhere | 2012
  
  SKILLS
  • Microsoft Office Suite
  • Leadership
  • Communication
  • Detail-oriented
  • Problem-solving
  `;
};
