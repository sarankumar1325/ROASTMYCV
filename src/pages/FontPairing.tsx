
import React from 'react';
import NavBar from '../components/NavBar';
import FontPairingGuide from '../components/FontPairingGuide';

const FontPairingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <FontPairingGuide />
      </main>
    </div>
  );
};

export default FontPairingPage;
