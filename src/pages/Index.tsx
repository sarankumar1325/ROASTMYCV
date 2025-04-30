
import React from 'react';
import ChatContainer from '../components/ChatContainer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold text-center">Gemini AI Chatbot</h1>
      </header>
      <main className="flex-1 container mx-auto max-w-4xl flex flex-col">
        <div className="flex-1 flex flex-col mt-4 mb-4 border rounded-lg shadow-sm overflow-hidden">
          <ChatContainer />
        </div>
      </main>
      <footer className="border-t p-4 text-center text-sm text-muted-foreground">
        Powered by Google Generative AI and LangChain
      </footer>
    </div>
  );
};

export default Index;
