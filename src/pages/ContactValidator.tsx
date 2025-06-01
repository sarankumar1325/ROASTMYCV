
import React from 'react';
import NavBar from '../components/NavBar';
import ContactValidator from '../components/ContactValidator';

const ContactValidatorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ContactValidator />
      </main>
    </div>
  );
};

export default ContactValidatorPage;
