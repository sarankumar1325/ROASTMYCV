import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Share2, Copy, Download, Award, AlertTriangle, CheckCircle, FileText, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import InsightPanel from "./InsightPanel";
import BadgeGenerator from "./BadgeGenerator";
import AudioFeedback from "./AudioFeedback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RoastResultProps {
  result: string;
  roastLevel: number;
  onReset: () => void;
}

const RoastResult: React.FC<RoastResultProps> = ({ result, roastLevel, onReset }) => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  useEffect(() => {
    // Auto-scroll to the result
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Set up intersection observer for reveal animations
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Apply observers to all result cards
    const cards = document.querySelectorAll('.result-card');
    cards.forEach((card) => {
      if (observerRef.current) observerRef.current.observe(card);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Clean the markdown formatting from the result text
  const cleanFormattedText = (text: string): string => {
    if (!text) return '';
    
    // Remove markdown formatting (asterisks)
    let cleanedText = text.replace(/\*\*([^*]+)\*\*/g, '$1');
    cleanedText = cleanedText.replace(/\*([^*]+)\*/g, '$1');
    
    // Remove consecutive blank lines (more than 2 newlines)
    cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');
    
    // Trim trailing whitespace at the end
    cleanedText = cleanedText.trim();
    
    return cleanedText;
  };

  // Improved function to split and format results
  const formatResults = () => {
    if (!result) return [];
    
    const cleanResult = cleanFormattedText(result);
    
    // Define section markers to identify different parts of the roast
    const sectionMarkers = [
      { title: 'Overall Impression', keywords: ['overall impression', 'first impression'], icon: 'Thermometer' },
      { title: 'Top Weaknesses', keywords: ['top 3 weaknesses', 'weaknesses', 'weakness'], icon: 'AlertTriangle' },
      { title: 'Clichés & Overused Phrases', keywords: ['cliché', 'overused', 'phrases'], icon: 'Copy' },
      { title: 'Rating', keywords: ['rating', 'rate', 'score'], icon: 'Award' },
      { title: 'Improvement Suggestions', keywords: ['suggest', 'improve', 'constructive'], icon: 'CheckCircle' },
      { title: 'Profile Tone', keywords: ['tone', 'voice', 'profile'], icon: 'Award' },
      { title: 'Achievement Clarity', keywords: ['achievement', 'accomplishment'], icon: 'Award' },
    ];
    
    // First, try to identify sections using headings or strong patterns
    const lines = cleanResult.split('\n');
    const sections: {title: string; content: string; icon: string}[] = [];
    let currentSection: {title: string; content: string; icon: string} | null = null;
    
    // Process line by line to identify sections
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines
      if (!line) continue;
      
      // Check if this line is a section header
      const isSectionHeader = 
        (line.endsWith(':') && line.length < 50) || 
        (i > 0 && lines[i-1].trim() === '' && line.length < 50 && !line.startsWith('•') && !line.startsWith('-') && !line.match(/^\d+\./));
      
      if (isSectionHeader) {
        // Save previous section if exists
        if (currentSection && currentSection.content.trim()) {
          sections.push(currentSection);
        }
        
        // Try to match with predefined sections
        let matchedSection = false;
        for (const marker of sectionMarkers) {
          if (marker.keywords.some(keyword => line.toLowerCase().includes(keyword))) {
            currentSection = { 
              title: marker.title, 
              content: line + '\n\n', 
              icon: marker.icon 
            };
            matchedSection = true;
            break;
          }
        }
        
        // If no match found, create a custom section
        if (!matchedSection) {
          const title = line.endsWith(':') ? line.slice(0, -1) : line;
          currentSection = { 
            title, 
            content: line + '\n\n', 
            icon: 'Award'  // Default icon
          };
        }
      } else if (currentSection) {
        // Add to current section content
        currentSection.content += line + '\n';
      } else {
        // If no current section, start with intro section
        currentSection = { 
          title: 'Introduction', 
          content: line + '\n', 
          icon: 'Thermometer' 
        };
      }
    }
    
    // Add the last section if it exists
    if (currentSection && currentSection.content.trim()) {
      sections.push(currentSection);
    }
    
    // If we couldn't identify sections properly, fall back to simpler approach
    if (sections.length <= 1) {
      // Split by double newlines to separate major sections
      const rawSections = cleanResult
        .split('\n\n')
        .filter(Boolean);
      
      // Clear sections array
      sections.length = 0;
      
      // Try to identify section types based on content
      for (const text of rawSections) {
        let matched = false;
        for (const marker of sectionMarkers) {
          if (marker.keywords.some(keyword => text.toLowerCase().includes(keyword))) {
            sections.push({ 
              title: marker.title, 
              content: text, 
              icon: marker.icon 
            });
            matched = true;
            break;
          }
        }
        
        if (!matched) {
          sections.push({ 
            title: 'Analysis', 
            content: text, 
            icon: 'Award' 
          });
        }
      }
    }
    
    return sections;
  };
  
  const resultSections = formatResults();
  
  // Clean the displayed result text
  const displayedResult = cleanFormattedText(result);
  
  const getTemperatureColor = (level: number) => {
    if (level < 30) return "text-yellow-400";
    if (level < 70) return "text-orange-500";
    return "text-red-600";
  };

  const handleShare = (platform: string) => {
    const shareText = encodeURIComponent("Check out my resume roast results!");
    let shareUrl = "";
    
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    } else {
      // Copy link to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link copied!",
          description: "Share link has been copied to clipboard",
        });
      });
    }
  };
  
  const getIconForSection = (iconName: string) => {
    switch (iconName) {
      case 'Thermometer':
        return <Thermometer size={18} />;
      case 'AlertTriangle':
        return <AlertTriangle size={18} />;
      case 'Copy':
        return <Copy size={18} />;
      case 'Award':
        return <Award size={18} />;
      case 'CheckCircle':
        return <CheckCircle size={18} />;
      default:
        return <Award size={18} />;
    }
  };
  
  // Format the content to properly display lists and numbered items
  const formatContent = (content: string) => {
    // Clean any markdown first
    const cleanedContent = cleanFormattedText(content);
    
    // Process numbered lists and bullet points
    const lines = cleanedContent.split('\n');
    let inList = false;
    let formattedContent = '';
    
    lines.forEach((line, index) => {
      // Check for numbered list items (e.g., "1." or "1)")
      const numberedMatch = line.match(/^\s*(\d+[\.\)])\s*/);
      // Check for bullet points
      const bulletMatch = line.match(/^\s*[\•\-]\s*/);
      
      if (numberedMatch || bulletMatch) {
        if (!inList) {
          // Start a new list
          formattedContent += '<ul class="list-disc pl-5 space-y-1">\n';
          inList = true;
        }
        
        // Add list item
        formattedContent += `<li class="mb-1">${line.replace(/^\s*(\d+[\.\)]|\•|\-)\s*/, '')}</li>\n`;
      } else {
        // End list if we were in one
        if (inList) {
          formattedContent += '</ul>\n';
          inList = false;
        }
        
        // Add regular paragraph with spacing
        if (line.trim()) {
          formattedContent += `<p class="mb-2">${line}</p>\n`;
        } else if (index > 0 && lines[index - 1].trim()) {
          // Add spacing between paragraphs
          formattedContent += '<br />\n';
        }
      }
    });
    
    // Close any open list
    if (inList) {
      formattedContent += '</ul>\n';
    }
    
    return formattedContent;
  };
  
  return (
    <div ref={resultRef} className="flex flex-col animate-fade-in gap-6 pt-20">
      {/* Header section with actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Resume Roast Results</h2>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 group">
                <Share2 size={16} className="group-hover:rotate-12 transition-transform duration-200" />
                Share
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="end">
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare('twitter')} 
                  className="hover:bg-blue-100 hover:scale-105 transition-transform duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" className="text-blue-500">
                    <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare('facebook')} 
                  className="hover:bg-blue-100 hover:scale-105 transition-transform duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" className="text-blue-600">
                    <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigator.clipboard.writeText(window.location.href)} 
                  className="hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
                >
                  <Copy size={16} className="text-gray-600" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button 
            onClick={onReset} 
            variant="outline"
            className="group transition-all duration-300"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-300">Upload Another</span>
          </Button>
        </div>
      </div>
      
      {/* Full roast content at the top */}
      <Card className="mb-6 overflow-hidden border-2 animate-scale-in">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-red-600 text-white flex flex-row justify-between items-center">
          <CardTitle className="text-xl">Full Roast Content</CardTitle>
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-white" />
            <Volume2 size={20} className="text-white" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="whitespace-pre-wrap prose max-w-none">
              {cleanFormattedText(result)}
            </TabsContent>
            <TabsContent value="audio">
              <AudioFeedback text={cleanFormattedText(result)} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Roast level indicator */}
      <Card className="mb-6 overflow-hidden border-2 animate-scale-in">
        <CardHeader className="bg-gradient-to-r from-amber-500 to-red-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Roast Level</CardTitle>
            <div className="flex items-center gap-2">
              <Thermometer size={24} className={getTemperatureColor(roastLevel) + " animate-pulse"} />
              <span className="text-xl font-bold counter-animate">{roastLevel}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Slider
            defaultValue={[roastLevel]}
            max={100}
            step={1}
            disabled
            className="my-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Mild</span>
            <span>Medium</span>
            <span>Savage</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Badge and Insights at top */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <BadgeGenerator roastLevel={roastLevel} result={result} />
        <InsightPanel roastLevel={roastLevel} result={result} />
      </div>
      
      {/* Roast results in cards - responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formatResults().map((section, index) => (
          <Card 
            key={index} 
            className="result-card overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              transitionDelay: `${index * 100}ms`
            }}
            onClick={() => setActiveSection(section.title)}
          >
            <CardHeader className="border-b bg-gray-50 py-3 px-4">
              <CardTitle className="text-sm uppercase tracking-wide text-gray-700 flex items-center gap-2">
                {getIconForSection(section.icon)}
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="mb-2">
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                </TabsList>
                <TabsContent value="text">
                  <div 
                    className="leading-relaxed text-base"
                    dangerouslySetInnerHTML={{ __html: formatContent(section.content) }}
                  />
                </TabsContent>
                <TabsContent value="audio">
                  <AudioFeedback text={section.content} sectionTitle={section.title} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoastResult;
