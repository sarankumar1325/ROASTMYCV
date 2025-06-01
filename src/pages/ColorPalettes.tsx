
import React from 'react';
import NavBar from '../components/NavBar';
import ColorPaletteGenerator from '../components/ColorPaletteGenerator';

const ColorPalettesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ColorPaletteGenerator />
      </main>
    </div>
  );
};

export default ColorPalettesPage;
