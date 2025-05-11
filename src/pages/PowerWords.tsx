
import React from 'react';
import NavBar from '../components/NavBar';
import ResumePowerWords from '../components/ResumePowerWords';

const PowerWords: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ResumePowerWords />
      </main>
    </div>
  );
};

export default PowerWords;
