
import React from 'react';
import NavBar from '../components/NavBar';
import ResumeTimelineBuilder from '../components/ResumeTimelineBuilder';

const TimelineBuilder: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ResumeTimelineBuilder />
      </main>
    </div>
  );
};

export default TimelineBuilder;
