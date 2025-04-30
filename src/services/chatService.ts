
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

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
    // Format messages for LangChain using appropriate message classes
    const langchainMessages = messages.map((msg) => 
      msg.isUser 
        ? new HumanMessage(msg.content) 
        : new AIMessage(msg.content)
    );

    // Get response from model
    const response = await chatModel.invoke(langchainMessages);

    return response.content as string;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};
