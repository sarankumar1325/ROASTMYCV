
import React from 'react';
import NavBar from '../components/NavBar';
import TechnicalReport from '../components/TechnicalReport';

const TechnicalReportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1">
        <TechnicalReport />
      </main>
    </div>
  );
};

export default TechnicalReportPage;
