
import React from 'react';
import ResumeRoaster from '../components/ResumeRoaster';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b p-4 bg-gradient-to-r from-amber-500 to-red-600">
        <h1 className="text-3xl font-bold text-center text-white">Resume Roaster</h1>
      </header>
      <main className="flex-1 container mx-auto max-w-4xl flex flex-col">
        <div className="flex-1 flex flex-col my-6 border rounded-lg shadow-sm overflow-hidden">
          <ResumeRoaster />
        </div>
      </main>
      <footer className="border-t p-4 text-center text-sm text-muted-foreground">
        Powered by Google Generative AI and LangChain
      </footer>
    </div>
  );
};

export default Index;
