
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// API Key - in a real application, this should be stored securely
const API_KEY = "AIzaSyC74WevNjWdIdIhdJ9iG_MCSZbEhBxjrtg";

// Initialize the chat model
const chatModel = new ChatGoogleGenerativeAI({
  apiKey: API_KEY,
  modelName: "gemini-2.0-flash", // Using modelName instead of model
  maxOutputTokens: 1024, // Using maxOutputTokens instead of maxTokens
  temperature: 0.7,
});

export type Message = {
  content: string;
  isUser: boolean;
};

export const sendMessage = async (
  messages: Message[]
): Promise<string> => {
  try {
    // Convert messages to a single conversation string for the model
    const conversationText = messages.map((msg) => 
      `${msg.isUser ? 'Human' : 'Assistant'}: ${msg.content}`
    ).join('\n\n');

    // Get response from model using string input
    const response = await chatModel.invoke(conversationText);

    return response.content as string;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};
