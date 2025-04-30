
import React from 'react';

type ChatMessageProps = {
  message: string;
  isUser: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`px-4 py-3 rounded-lg max-w-[80%] ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
