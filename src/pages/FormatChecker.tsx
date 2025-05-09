
import React from 'react';
import NavBar from '../components/NavBar';
import ResumeFormatChecker from '../components/ResumeFormatChecker';

const FormatChecker: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ResumeFormatChecker />
      </main>
    </div>
  );
};

export default FormatChecker;
