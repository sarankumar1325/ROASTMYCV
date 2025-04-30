
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { sendMessage, Message } from '../services/chatService';
import { toast } from "@/hooks/use-toast";

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = { content: text, isUser: true };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    
    try {
      // Add the new message to the history and send to API
      const updatedMessages = [...messages, newUserMessage];
      const response = await sendMessage(updatedMessages);
      
      // Add bot response to chat
      setMessages((prev) => [...prev, { content: response, isUser: false }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response from the chatbot",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground pt-10">
            Send a message to start chatting with AI
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage 
              key={index} 
              message={msg.content} 
              isUser={msg.isUser} 
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
