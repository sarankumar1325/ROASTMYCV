
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  // Create a friendly error message element
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #e11d48;">Missing Clerk Publishable Key</h2>
        <p>To run this application, you need to provide your Clerk Publishable Key.</p>
        <h3>How to fix this:</h3>
        <ol>
          <li>Sign up for a free account at <a href="https://clerk.com?utm_source=lovable" style="color: #e11d48;">https://clerk.com</a></li>
          <li>Create a new application in the Clerk dashboard</li>
          <li>Copy your Publishable Key from the API Keys section</li>
          <li>Add the key to your project settings in Lovable</li>
        </ol>
        <p>In Lovable, go to <strong>Project → Settings → Environment Variables</strong> and add:</p>
        <code style="display: block; background: #f1f1f1; padding: 10px; border-radius: 4px; margin: 10px 0;">VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key</code>
        <p>Then refresh this page.</p>
      </div>
    `;
  }
  // Still throw the error for the console, but the user will see a helpful message
  throw new Error('Missing Clerk Publishable Key');
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
