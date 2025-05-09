
import React from 'react';
import NavBar from '../components/NavBar';
import ResumeTemplates from '../components/ResumeTemplates';

const Templates: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ResumeTemplates />
      </main>
    </div>
  );
};

export default Templates;
