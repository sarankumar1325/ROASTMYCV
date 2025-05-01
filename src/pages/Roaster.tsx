
import React from 'react';
import ResumeRoaster from '../components/ResumeRoaster';
import NavBar from '../components/NavBar';

const Roaster: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
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

export default Roaster;
