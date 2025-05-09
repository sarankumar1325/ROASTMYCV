
import React from 'react';
import NavBar from '../components/NavBar';
import ResumeProgressTracker from '../components/ResumeProgressTracker';

const Progress: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ResumeProgressTracker />
      </main>
    </div>
  );
};

export default Progress;
