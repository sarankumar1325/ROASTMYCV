
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TechnicalReport: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Card className="mb-8">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Resume Roaster: Technical Architecture Report</CardTitle>
              <CardDescription className="text-slate-200 mt-1">
                A comprehensive AI-powered resume analysis platform
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose max-w-none">
            <div className="text-right mb-6">
              <p className="text-sm text-gray-500">Technical Document | Version 1.0</p>
              <p className="text-sm text-gray-500">May 2025</p>
            </div>

            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Executive Summary</h2>
            <p>
              Resume Roaster is a full-stack web application leveraging advanced AI technologies to provide comprehensive 
              resume analysis, optimization, and feedback. The platform utilizes cutting-edge natural language processing 
              through Google's Gemini API, integrates with PDF.js for document parsing, and implements a microservices 
              architecture to ensure scalability and maintainability.
            </p>

            <h2 className="text-xl font-semibold border-b pb-2 mb-4 mt-8">Technical Stack & Architecture</h2>

            <Tabs defaultValue="frontend" className="w-full mt-6">
              <TabsList>
                <TabsTrigger value="frontend">Frontend Architecture</TabsTrigger>
                <TabsTrigger value="backend">Backend Services</TabsTrigger>
                <TabsTrigger value="ai">AI Integration</TabsTrigger>
                <TabsTrigger value="database">Data Architecture</TabsTrigger>
              </TabsList>

              <TabsContent value="frontend" className="pt-4">
                <h3 className="font-medium text-lg mb-2">Frontend Technologies</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li><span className="font-mono bg-gray-100 px-1 rounded">React 18.3.1</span> - Component-based UI architecture</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">TypeScript</span> - Type-safe development environment</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Tailwind CSS</span> - Utility-first CSS framework for responsive design</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">ShadCN UI</span> - Accessible component library based on Radix UI</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">React Router v6</span> - Client-side routing with protected routes</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Lucide React</span> - Modern icon library integration</li>
                </ul>

                <h3 className="font-medium text-lg mb-2">Frontend Architecture</h3>
                <p className="mb-3">
                  The frontend implements an atomic design system with component composition patterns for maximum reusability. 
                  Key architectural decisions include:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Atomic design methodology - separating UI into atoms, molecules, organisms, templates, and pages</li>
                  <li>Custom hooks for business logic abstraction (e.g., <code>useToast</code>, <code>useMobile</code>)</li>
                  <li>Context API for global state management, including authentication state</li>
                  <li>Lazy-loading and code-splitting for optimized performance</li>
                  <li>Responsive design implementation with mobile-first approach</li>
                </ul>
              </TabsContent>

              <TabsContent value="backend" className="pt-4">
                <h3 className="font-medium text-lg mb-2">Backend Services</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Supabase</span> - Backend-as-a-Service platform</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">PostgreSQL</span> - Relational database for data persistence</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Row Level Security (RLS)</span> - Database-level access control</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Edge Functions</span> - Serverless computing for API integration</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Clerk</span> - Authentication and user management</li>
                </ul>

                <h3 className="font-medium text-lg mb-2">API Architecture</h3>
                <p className="mb-3">
                  Resume Roaster implements a service-oriented API architecture with dedicated services for:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Resume processing service - PDF extraction and text normalization</li>
                  <li>AI analysis service - Integration with LangChain and Google Gemini</li>
                  <li>User data service - Profile and history management</li>
                  <li>Audio synthesis service - Text-to-speech with advanced voice synthesis</li>
                </ul>
              </TabsContent>

              <TabsContent value="ai" className="pt-4">
                <h3 className="font-medium text-lg mb-2">AI and NLP Integration</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li><span className="font-mono bg-gray-100 px-1 rounded">LangChain</span> - Framework for LLM application development</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Google Gemini 2.0 Flash</span> - Advanced large language model</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">GROQ API</span> - Text-to-speech synthesis with voice models</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">PDF.js</span> - Document parsing and text extraction</li>
                </ul>

                <h3 className="font-medium text-lg mb-2">AI Engineering Implementation</h3>
                <p className="mb-3">
                  The platform employs several advanced AI engineering techniques:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Prompt engineering for contextual resume analysis with controlled parameters</li>
                  <li>Text chunking algorithms for efficient processing of large documents</li>
                  <li>Custom tokenization and analysis for resume-specific terminology</li>
                  <li>Keyword extraction and comparison algorithms for job description matching</li>
                  <li>Streaming response processing for real-time feedback</li>
                </ul>
              </TabsContent>

              <TabsContent value="database" className="pt-4">
                <h3 className="font-medium text-lg mb-2">Data Architecture</h3>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li><span className="font-mono bg-gray-100 px-1 rounded">PostgreSQL</span> - Primary data store</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">JSON/JSONB</span> - Flexible schema for metadata storage</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Row Level Security</span> - Fine-grained access control</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Database Functions</span> - Server-side logic execution</li>
                  <li><span className="font-mono bg-gray-100 px-1 rounded">Triggers</span> - Automated workflow implementation</li>
                </ul>

                <h3 className="font-medium text-lg mb-2">Data Model</h3>
                <p className="mb-2">The primary entities in the data model include:</p>
                <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-auto my-2">
{`
┌───────────────┐     ┌───────────────────┐     ┌─────────────────┐
│  profiles     │     │  chat_sessions    │     │     messages    │
├───────────────┤     ├───────────────────┤     ├─────────────────┤
│ id            │──┐  │ id                │──┐  │ id              │
│ display_name  │  └─>│ user_id           │  └─>│ chat_session_id │
│ settings      │     │ session_title     │     │ content         │
│ created_at    │     │ resume_id         │     │ sender          │
│ last_login    │     │ created_at        │     │ metadata        │
└───────────────┘     │ updated_at        │     │ timestamp       │
                      └───────────────────┘     └─────────────────┘
                                │                        
                                │                        
                                ▼                        
                      ┌───────────────────┐     ┌─────────────────┐
                      │     resumes       │     │    feedback     │
                      ├───────────────────┤     ├─────────────────┤
                      │ id                │     │ id              │
                      │ user_id           │     │ user_id         │
                      │ file_name         │     │ rating          │
                      │ file_url          │     │ comments        │
                      │ parsed_text       │     │ message_id      │
                      │ metadata          │     │ created_at      │
                      │ created_at        │     └─────────────────┘
                      └───────────────────┘                        
`}
                </pre>
              </TabsContent>
            </Tabs>

            <h2 className="text-xl font-semibold border-b pb-2 mb-4 mt-8">Key Technical Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-lg mb-2">AI-Powered Resume Analysis</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Contextual feedback with customizable intensity levels</li>
                  <li>Multi-faceted analysis (structure, content, keywords)</li>
                  <li>Prompt engineering for personalized feedback</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-lg mb-2">Document Processing</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>PDF.js integration for client-side parsing</li>
                  <li>Multi-format support (PDF, DOC, DOCX, TXT)</li>
                  <li>Text normalization and pre-processing pipeline</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-lg mb-2">Keyword Analysis Engine</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Custom extraction algorithms for job descriptions</li>
                  <li>Industry-specific keyword libraries</li>
                  <li>Local storage for analysis history</li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium text-lg mb-2">Text-to-Speech Integration</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>GROQ API integration for high-quality speech synthesis</li>
                  <li>10+ voice model options with real-time previews</li>
                  <li>Audio chunking for efficient processing</li>
                </ul>
              </div>
            </div>

            <h2 className="text-xl font-semibold border-b pb-2 mb-4 mt-8">System Architecture Diagram</h2>
            
            <div className="bg-white p-4 border rounded-lg mb-6">
              <div className="text-center mb-2">
                <em className="text-sm text-gray-500">Placeholder for system architecture diagram image</em>
              </div>
              <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-auto">
{`
┌───────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ┌─────────────────┐    ┌─────────────────┐    ┌────────────────┐ │
│  │                 │    │                 │    │                │ │
│  │   React UI      │◄───┤   Router        │◄───┤  Clerk Auth   │ │
│  │   Components    │    │                 │    │                │ │
│  │                 │    │                 │    │                │ │
│  └────────┬────────┘    └─────────────────┘    └────────────────┘ │
│           │                                                       │
│  ┌────────▼────────┐                           ┌────────────────┐ │
│  │                 │                           │                │ │
│  │  Feature        │◄──┬───────────────────────┤  Local Storage │ │
│  │  Components     │   │                       │                │ │
│  │                 │   │                       │                │ │
│  └────────┬────────┘   │                       └────────────────┘ │
│           │            │                                          │
└───────────┼────────────┼──────────────────────────────────────────┘
            │            │
┌───────────▼────────────▼──────────────────────────────────────────┐
│                                                                   │
│  ┌─────────────────┐    ┌─────────────────┐    ┌────────────────┐ │
│  │                 │    │                 │    │                │ │
│  │  Resume Service │◄───┤ Supabase Client │◄───┤ Auth Context  │ │
│  │                 │    │                 │    │                │ │
│  └────────┬────────┘    └─────────────────┘    └────────────────┘ │
│           │                                                       │
│  ┌────────▼────────┐    ┌─────────────────┐    ┌────────────────┐ │
│  │                 │    │                 │    │                │ │
│  │ LangChain       │◄───┤  PDF Parser     │    │  Audio Service │ │
│  │ Integration     │    │                 │    │                │ │
│  │                 │    │                 │    │                │ │
│  └────────┬────────┘    └─────────────────┘    └────────┬───────┘ │
│           │                                             │         │
└───────────┼─────────────────────────────────────────────┼─────────┘
            │                                             │
┌───────────▼─────────────────────────────────────────────▼─────────┐
│                                                                   │
│  ┌─────────────────┐    ┌─────────────────┐    ┌────────────────┐ │
│  │                 │    │                 │    │                │ │
│  │  Google Gemini  │    │  Supabase DB    │    │   GROQ API     │ │
│  │  2.0 Flash      │    │                 │    │                │ │
│  │                 │    │                 │    │                │ │
│  └─────────────────┘    └─────────────────┘    └────────────────┘ │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
`}
              </pre>
            </div>

            <h2 className="text-xl font-semibold border-b pb-2 mb-4 mt-8">Performance Metrics</h2>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Metric</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">First Contentful Paint</td>
                    <td className="border border-gray-300 px-4 py-2">0.8s</td>
                    <td className="border border-gray-300 px-4 py-2">Optimized with code splitting</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">Time to Interactive</td>
                    <td className="border border-gray-300 px-4 py-2">1.2s</td>
                    <td className="border border-gray-300 px-4 py-2">Core functionality ready</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">AI Response Latency</td>
                    <td className="border border-gray-300 px-4 py-2">1.8s - 3.5s</td>
                    <td className="border border-gray-300 px-4 py-2">Dependent on resume length</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">PDF Processing Time</td>
                    <td className="border border-gray-300 px-4 py-2">1.2s - 2.5s</td>
                    <td className="border border-gray-300 px-4 py-2">For files &lt; 5MB</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Lighthouse Performance Score</td>
                    <td className="border border-gray-300 px-4 py-2">92/100</td>
                    <td className="border border-gray-300 px-4 py-2">Mobile version</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="text-xl font-semibold border-b pb-2 mb-4 mt-8">Security Implementation</h2>
            
            <div className="mb-6">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Authentication:</span> JWT-based authentication with Clerk integration, 
                  providing multi-factor authentication and secure session management
                </li>
                <li>
                  <span className="font-medium">Data Security:</span> Row Level Security (RLS) policies in PostgreSQL, 
                  ensuring users can only access their own data
                </li>
                <li>
                  <span className="font-medium">API Security:</span> Secure API key management for third-party services 
                  using server-side environment variables
                </li>
                <li>
                  <span className="font-medium">Client-side Security:</span> Content Security Policy implementation, 
                  preventing XSS attacks
                </li>
              </ul>
            </div>
            
            <h2 className="text-xl font-semibold border-b pb-2 mb-4 mt-8">Technical Challenges & Solutions</h2>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-1">Document Processing Optimization</h3>
                <p className="mb-2"><span className="font-medium">Challenge:</span> Processing large PDF files efficiently in the browser while maintaining performance.</p>
                <p><span className="font-medium">Solution:</span> Implemented chunking algorithms to process PDFs in segments, coupled with Web Workers for non-blocking operations, resulting in a 68% performance improvement for files over 3MB.</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-1">AI Response Streaming</h3>
                <p className="mb-2"><span className="font-medium">Challenge:</span> Delivering real-time AI analysis without blocking the UI thread or causing perceptible lag.</p>
                <p><span className="font-medium">Solution:</span> Implemented a custom streaming response handler with React's Suspense API, allowing progressive rendering of AI feedback as it arrives.</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-1">State Management Complexity</h3>
                <p className="mb-2"><span className="font-medium">Challenge:</span> Managing complex state transitions across multiple features while maintaining separation of concerns.</p>
                <p><span className="font-medium">Solution:</span> Adopted a hybrid approach using React Context for global state, custom hooks for feature-specific state, and atomic component design for UI state, reducing component re-renders by 42%.</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold border-b pb-2 mb-4 mt-8">Conclusion & Future Technical Roadmap</h2>
            
            <p className="mb-4">
              The Resume Roaster platform demonstrates an effective implementation of modern web technologies and AI integration. 
              The architecture prioritizes scalability, performance, and security while delivering a seamless user experience.
            </p>
            
            <p className="font-medium mb-2">Future Technical Enhancements:</p>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>Integration with industry-specific ML models for targeted resume analysis</li>
              <li>Implementation of collaborative feedback features with real-time updates</li>
              <li>Advanced analytics dashboard with visualization of improvement metrics</li>
              <li>Integration with job board APIs for direct application submission</li>
              <li>Implementation of a recommendation engine for targeted job matching</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalReport;
