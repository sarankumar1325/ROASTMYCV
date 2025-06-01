
import React from 'react';
import NavBar from '../components/NavBar';
import ResumeAnalytics from '../components/ResumeAnalytics';

const ResumeAnalyticsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ResumeAnalytics />
      </main>
    </div>
  );
};

export default ResumeAnalyticsPage;
