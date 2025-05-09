
import React from 'react';
import NavBar from '../components/NavBar';
import ResumeKeywordAnalyzer from '../components/ResumeKeywordAnalyzer';

const KeywordAnalyzer: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ResumeKeywordAnalyzer />
      </main>
    </div>
  );
};

export default KeywordAnalyzer;
