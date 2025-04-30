
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// API Key - in a real application, this should be stored securely
const API_KEY = "AIzaSyC74WevNjWdIdIhdJ9iG_MCSZbEhBxjrtg";

// Initialize the chat model
const chatModel = new ChatGoogleGenerativeAI({
  apiKey: API_KEY,
  model: "gemini-2.0-flash",
  maxTokens: 1024,
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
    // Format messages for LangChain
    const formattedMessages = messages.map((msg) => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.content,
    }));

    // Get response from model
    const response = await chatModel.invoke(formattedMessages);

    return response.content as string;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Sorry, I encountered an error. Please try again.";
  }
};
