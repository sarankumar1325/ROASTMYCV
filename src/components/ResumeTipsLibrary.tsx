
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  FileText, 
  Check, 
  Clock, 
  Award, 
  AlertTriangle, 
  Briefcase,
  GraduationCap,
  BarChart,
  Heart,
  Download,
  Share2,
  Bookmark,
  Save
} from 'lucide-react';

interface TipCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
}

const TipCard: React.FC<TipCardProps> = ({ title, description, icon, tag }) => (
  <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start mb-3">
      <div className="bg-amber-50 w-10 h-10 rounded-full flex items-center justify-center text-amber-500">
        {icon}
      </div>
      {tag && (
        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
          {tag}
        </span>
      )}
    </div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const ResumeTipsLibrary: React.FC = () => {
  const [savedGuides, setSavedGuides] = useState<string[]>([]);
  const [personalNotes, setPersonalNotes] = useState<string>('');
  const [isNotesSaved, setIsNotesSaved] = useState<boolean>(false);
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedNotesFromStorage = localStorage.getItem('resumePersonalNotes');
    if (savedNotesFromStorage) {
      setPersonalNotes(savedNotesFromStorage);
      setIsNotesSaved(true);
    }
    
    const savedGuidesFromStorage = localStorage.getItem('savedResumeGuides');
    if (savedGuidesFromStorage) {
      setSavedGuides(JSON.parse(savedGuidesFromStorage));
    }
  }, []);
  
  const handleDownload = () => {
    // Create printable version of the guide
    const printContent = `
      RESUME TIPS LIBRARY GUIDE
      =========================
      
      RESUME ESSENTIALS
      -----------------
      • Clear Formatting: Use consistent fonts, spacing, and formatting. Aim for a clean, professional look that's easy to scan in 6 seconds.
      • Keep It Concise: Limit your resume to 1-2 pages. Be ruthless about including only relevant information for the specific job.
      • Quantify Achievements: Use numbers and percentages to demonstrate impact: 'Increased sales by 27%' is better than 'Increased sales significantly.'
      • Avoid Clichés: Skip overused phrases like 'team player' or 'detail-oriented.' Show these qualities through specific examples instead.
      • Tailor to Each Job: Customize your resume for each application by matching your skills and experience to the job description.
      • ATS-Friendly Format: Use a simple layout with standard section headings and common fonts to ensure compatibility with Applicant Tracking Systems.
      
      QUICK CHECKLIST
      --------------
      ✓ Contact information is up-to-date and professional
      ✓ Resume is tailored to the specific job description
      ✓ Achievements are quantified with numbers when possible
      ✓ Format is clean, consistent and easy to scan
      ✓ Spelling and grammar are perfect
      ✓ File is saved as a PDF unless otherwise specified
      
      KEY SECTIONS
      -----------
      Work Experience:
      - Use reverse chronological order (most recent first)
      - Include company name, location, job title, and dates
      - Focus on achievements rather than responsibilities
      - Start bullet points with strong action verbs
      
      Education:
      - List degrees in reverse chronological order
      - Include institution name, location, degree, and graduation date
      - Add relevant coursework, honors, or projects if recent graduate
      - Only include GPA if it's impressive (3.5+)
      
      Skills:
      - Separate technical skills from soft skills
      - Match keywords from the job description
      - Be specific (e.g., "Adobe Photoshop" not just "Design Software")
      - Consider including proficiency levels for technical skills
      
      Optional Sections:
      - Projects: Highlight relevant personal or professional projects
      - Certifications: Include relevant professional certifications
      - Volunteer Experience: If relevant to the job or shows transferable skills
      - Publications/Presentations: For academic or research positions
      
      Compiled by ResumeRoaster.com
    `;
    
    try {
      // Create blob and download
      const blob = new Blob([printContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Resume_Tips_Guide.txt';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
      toast({
        title: "Guide Downloaded!",
        description: "Your resume tips guide has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the guide. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const saveGuide = (guideName: string) => {
    if (savedGuides.includes(guideName)) {
      const newSavedGuides = savedGuides.filter(name => name !== guideName);
      setSavedGuides(newSavedGuides);
      localStorage.setItem('savedResumeGuides', JSON.stringify(newSavedGuides));
      toast({
        title: "Guide Removed",
        description: `"${guideName}" removed from your saved guides.`,
      });
    } else {
      const newSavedGuides = [...savedGuides, guideName];
      setSavedGuides(newSavedGuides);
      localStorage.setItem('savedResumeGuides', JSON.stringify(newSavedGuides));
      toast({
        title: "Guide Saved!",
        description: `"${guideName}" added to your saved guides.`,
      });
    }
  };
  
  const shareGuide = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Resume Tips Library',
        text: 'Check out this helpful resume tips guide!',
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Guide Shared!",
          description: "Thanks for sharing our resume tips guide.",
        });
      })
      .catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Resume guide link copied to clipboard.",
      });
    }
  };

  const saveNotes = () => {
    localStorage.setItem('resumePersonalNotes', personalNotes);
    setIsNotesSaved(true);
    toast({
      title: "Notes Saved!",
      description: "Your personal notes have been saved.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-block p-2 bg-amber-100 rounded-lg mb-4">
          <BookOpen className="text-amber-500 h-6 w-6" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Resume Tips Library</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Expert advice to help you craft a winning resume that gets you noticed by recruiters and hiring managers
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-4 max-w-4xl mx-auto">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => saveGuide("Resume Tips Library")}
            className="flex items-center gap-1"
          >
            <Bookmark className="h-4 w-4" fill={savedGuides.includes("Resume Tips Library") ? "currentColor" : "none"} />
            {savedGuides.includes("Resume Tips Library") ? "Saved" : "Save Guide"}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={shareGuide}
            className="flex items-center gap-1"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="essentials" className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-amber-50">
            <TabsTrigger value="essentials" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Essentials
            </TabsTrigger>
            <TabsTrigger value="sections" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Key Sections
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Skills & Keywords
            </TabsTrigger>
            <TabsTrigger value="mistakes" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Common Mistakes
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="essentials" className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Resume Essentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TipCard
                icon={<FileText size={18} />}
                title="Clear Formatting"
                description="Use consistent fonts, spacing, and formatting. Aim for a clean, professional look that's easy to scan in 6 seconds."
                tag="Must Have"
              />
              <TipCard
                icon={<Clock size={18} />}
                title="Keep It Concise"
                description="Limit your resume to 1-2 pages. Be ruthless about including only relevant information for the specific job."
              />
              <TipCard
                icon={<Award size={18} />}
                title="Quantify Achievements"
                description="Use numbers and percentages to demonstrate impact: 'Increased sales by 27%' is better than 'Increased sales significantly.'"
                tag="High Impact"
              />
              <TipCard
                icon={<AlertTriangle size={18} />}
                title="Avoid Clichés"
                description="Skip overused phrases like 'team player' or 'detail-oriented.' Show these qualities through specific examples instead."
              />
              <TipCard
                icon={<Check size={18} />}
                title="Tailor to Each Job"
                description="Customize your resume for each application by matching your skills and experience to the job description."
                tag="Essential"
              />
              <TipCard
                icon={<FileText size={18} />}
                title="ATS-Friendly Format"
                description="Use a simple layout with standard section headings and common fonts to ensure compatibility with Applicant Tracking Systems."
              />
            </div>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
            <h4 className="font-bold mb-3 flex items-center">
              <Check size={18} className="text-green-500 mr-2" />
              Quick Checklist
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Contact information is up-to-date and professional",
                "Resume is tailored to the specific job description",
                "Achievements are quantified with numbers when possible",
                "Format is clean, consistent and easy to scan",
                "Spelling and grammar are perfect",
                "File is saved as a PDF unless otherwise specified"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full border border-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-green-500" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sections" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-amber-50 w-10 h-10 rounded-full flex items-center justify-center text-amber-500 mr-3">
                  <Briefcase size={18} />
                </div>
                <h3 className="font-bold">Work Experience</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Use reverse chronological order (most recent first)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Include company name, location, job title, and dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Focus on achievements rather than responsibilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Start bullet points with strong action verbs</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-amber-50 w-10 h-10 rounded-full flex items-center justify-center text-amber-500 mr-3">
                  <GraduationCap size={18} />
                </div>
                <h3 className="font-bold">Education</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">List degrees in reverse chronological order</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Include institution name, location, degree, and graduation date</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Add relevant coursework, honors, or projects if recent graduate</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Only include GPA if it's impressive (3.5+)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-amber-50 w-10 h-10 rounded-full flex items-center justify-center text-amber-500 mr-3">
                  <BarChart size={18} />
                </div>
                <h3 className="font-bold">Skills</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Separate technical skills from soft skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Match keywords from the job description</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Be specific (e.g., "Adobe Photoshop" not just "Design Software")</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Consider including proficiency levels for technical skills</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-amber-50 w-10 h-10 rounded-full flex items-center justify-center text-amber-500 mr-3">
                  <Heart size={18} />
                </div>
                <h3 className="font-bold">Optional Sections</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Projects: Highlight relevant personal or professional projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Certifications: Include relevant professional certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Volunteer Experience: If relevant to the job or shows transferable skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">Publications/Presentations: For academic or research positions</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Power Words & Keywords</h3>
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <p className="mb-4 text-sm">
                Using the right action verbs and industry keywords can significantly improve your resume's impact and ATS ranking.
                Here are some powerful options categorized by skill type:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-amber-700">Leadership & Management</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Directed", "Orchestrated", "Spearheaded", "Oversaw", "Mentored", "Cultivated", "Fostered", "Guided", "Transformed"].map((word, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-800 rounded text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2 text-amber-700">Achievement & Results</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Achieved", "Delivered", "Generated", "Increased", "Maximized", "Exceeded", "Improved", "Reduced", "Streamlined"].map((word, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-800 rounded text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2 text-amber-700">Communication & Collaboration</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Negotiated", "Persuaded", "Presented", "Facilitated", "Collaborated", "Partnered", "Mediated", "Influenced", "Consulted"].map((word, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-800 rounded text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2 text-amber-700">Innovation & Creativity</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Designed", "Developed", "Created", "Pioneered", "Conceptualized", "Initiated", "Established", "Formulated", "Revitalized"].map((word, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-800 rounded text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2 text-amber-700">Technical Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Programmed", "Engineered", "Implemented", "Integrated", "Optimized", "Debugged", "Calibrated", "Automated", "Administered"].map((word, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-800 rounded text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-2 text-amber-700">Analysis & Research</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Analyzed", "Evaluated", "Researched", "Identified", "Assessed", "Monitored", "Surveyed", "Examined", "Diagnosed"].map((word, i) => (
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-800 rounded text-xs">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold mb-3">Using Keywords Effectively</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Incorporate keywords naturally throughout your resume, not just in the skills section</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Study the job description and company website to identify industry-specific terminology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Include both spelled-out terms and acronyms where relevant (e.g., "Search Engine Optimization (SEO)")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Use variations of keywords to cover different ATS search terms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="mistakes" className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Common Resume Mistakes to Avoid</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border border-red-100 shadow-sm">
                <h4 className="font-medium text-red-800 mb-3">Formatting & Structure Mistakes</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Using overly creative or complex designs that confuse ATS systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Including tiny fonts, unusual typefaces, or excessive colors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Making your resume too long (more than 2 pages for most positions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Inconsistent formatting, spacing, or bullet styles</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-red-100 shadow-sm">
                <h4 className="font-medium text-red-800 mb-3">Content & Language Mistakes</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Listing job duties without achievements or results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Using generic phrases like "responsible for" or "duties included"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Including irrelevant personal information (age, marital status, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Spelling and grammar errors (automatic rejection for many recruiters)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-red-100 shadow-sm">
                <h4 className="font-medium text-red-800 mb-3">Strategic Mistakes</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Using a generic resume for all job applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Including an objective statement instead of a career summary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Failing to address employment gaps or career changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Leaving off important sections like skills or education</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-red-100 shadow-sm">
                <h4 className="font-medium text-red-800 mb-3">Professional Mistakes</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Using an unprofessional email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Including references directly on your resume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Using first-person pronouns (I, me, my) throughout your resume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Lying or exaggerating about qualifications or experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 text-center">
        <Button 
          className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 flex items-center gap-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          Download Complete Guide (TXT)
        </Button>
      </div>
      
      {/* Personal notes feature */}
      <div className="mt-8 max-w-4xl mx-auto">
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <FileText className="text-amber-500 h-5 w-5" />
            Personal Resume Notes
          </h3>
          <textarea 
            className="w-full p-3 border border-amber-200 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-amber-300"
            placeholder="Add your personal notes about your resume here..."
            value={personalNotes}
            onChange={(e) => {
              setPersonalNotes(e.target.value);
              setIsNotesSaved(false);
            }}
          />
          <div className="flex justify-end mt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={saveNotes}
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              {isNotesSaved ? "Saved" : "Save Notes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTipsLibrary;
