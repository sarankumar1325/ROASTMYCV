import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCopy, Search } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface PowerWordCategory {
  category: string;
  words: string[];
}

const powerWords: PowerWordCategory[] = [
  {
    category: 'Leadership',
    words: [
      'Achieved', 'Administered', 'Analyzed', 'Assigned', 'Attained', 'Chaired', 'Consolidated', 'Contracted',
      'Coordinated', 'Delegated', 'Developed', 'Directed', 'Eliminated', 'Emphasized', 'Enforced',
      'Enhanced', 'Established', 'Executed', 'Generated', 'Handled', 'Headed', 'Hired', 'Hosted',
      'Improved', 'Incorporated', 'Increased', 'Initiated', 'Inspected', 'Instituted', 'Led',
      'Managed', 'Merged', 'Motivated', 'Orchestrated', 'Organized', 'Oversaw', 'Pioneered',
      'Planned', 'Presided', 'Prioritized', 'Produced', 'Recommended', 'Reorganized', 'Replaced',
      'Restored', 'Reviewed', 'Scheduled', 'Streamlined', 'Strengthened', 'Supervised'
    ]
  },
  {
    category: 'Communication',
    words: [
      'Addressed', 'Arbitrated', 'Arranged', 'Authored', 'Collaborated', 'Convinced', 'Corresponded',
      'Defined', 'Developed', 'Directed', 'Drafted', 'Edited', 'Enlisted', 'Formulated', 'Influenced',
      'Interpreted', 'Lectured', 'Mediated', 'Moderated', 'Negotiated', 'Persuaded', 'Promoted',
      'Publicized', 'Reconciled', 'Recruited', 'Spoke', 'Translated', 'Wrote', 'Presented', 
      'Articulated', 'Briefed', 'Conveyed', 'Demonstrated', 'Exhibited', 'Expressed', 
      'Interviewed', 'Marketed', 'Pitched'
    ]
  },
  {
    category: 'Analysis',
    words: [
      'Analyzed', 'Assessed', 'Clarified', 'Collected', 'Compared', 'Conducted', 'Critiqued',
      'Detected', 'Determined', 'Diagnosed', 'Evaluated', 'Examined', 'Experimented', 'Explored',
      'Extracted', 'Formulated', 'Gathered', 'Identified', 'Inspected', 'Interpreted', 'Interviewed',
      'Investigated', 'Located', 'Measured', 'Organized', 'Researched', 'Reviewed', 'Summarized',
      'Surveyed', 'Systematized', 'Tested', 'Calculated', 'Compiled', 'Estimated',
      'Forecasted', 'Predicted', 'Quantified', 'Validated', 'Verified'
    ]
  },
  {
    category: 'Technical',
    words: [
      'Assembled', 'Built', 'Calculated', 'Computed', 'Designed', 'Devised', 'Engineered',
      'Fabricated', 'Installed', 'Maintained', 'Operated', 'Overhauled', 'Programmed',
      'Remodeled', 'Repaired', 'Solved', 'Trained', 'Upgraded', 'Adapted', 'Adjusted',
      'Automated', 'Calibrated', 'Conserved', 'Constructed', 'Converted', 'Debugged',
      'Deployed', 'Developed', 'Integrated', 'Manufactured', 'Mapped', 'Optimized',
      'Prototyped', 'Rectified', 'Refactored', 'Restored', 'Standardized', 'Streamlined'
    ]
  },
  {
    category: 'Creative',
    words: [
      'Acted', 'Conceptualized', 'Created', 'Customized', 'Designed', 'Developed', 'Directed',
      'Established', 'Fashioned', 'Founded', 'Illustrated', 'Initiated', 'Instituted',
      'Integrated', 'Introduced', 'Invented', 'Originated', 'Performed', 'Planned', 'Revitalized',
      'Shaped', 'Visualized', 'Authored', 'Composed', 'Conceived', 'Crafted', 'Curated',
      'Enhanced', 'Formed', 'Formulated', 'Generated', 'Incorporated', 'Innovated', 'Launched',
      'Pioneered', 'Produced', 'Proposed', 'Redesigned', 'Refined', 'Remodeled', 'Transformed'
    ]
  },
  {
    category: 'Achievement',
    words: [
      'Accomplished', 'Achieved', 'Added', 'Awarded', 'Completed', 'Demonstrated', 'Earned',
      'Exceeded', 'Expanded', 'Gained', 'Improved', 'Increased', 'Outperformed', 'Reduced',
      'Resolved', 'Restored', 'Spearheaded', 'Succeeded', 'Surpassed', 'Won', 'Accelerated',
      'Advanced', 'Amplified', 'Boosted', 'Capitalized', 'Delivered', 'Doubled', 'Enhanced',
      'Excelled', 'Generated', 'Maximized', 'Optimized', 'Produced', 'Profitable', 'Ranked',
      'Reached', 'Recognized', 'Secured', 'Tripled', 'Yielded'
    ]
  }
];

// Add more specific words by industry
const industrySpecificWords: Record<string, string[]> = {
  'technology': [
    'Programmed', 'Developed', 'Implemented', 'Debugged', 'Configured', 'Deployed', 'Architected',
    'Engineered', 'Integrated', 'Streamlined', 'Optimized', 'Automated', 'Maintained', 'Refactored',
    'Migrated', 'Scaled', 'Troubleshot', 'Designed', 'Documented', 'Analyzed'
  ],
  'finance': [
    'Budgeted', 'Forecasted', 'Reconciled', 'Allocated', 'Audited', 'Balanced', 'Calculated',
    'Financed', 'Projected', 'Marketed', 'Invested', 'Appraised', 'Underwrote', 'Diversified',
    'Economized', 'Leveraged', 'Maximized', 'Reduced', 'Researched', 'Yielded'
  ],
  'marketing': [
    'Advertised', 'Branded', 'Campaigned', 'Converted', 'Engaged', 'Fashioned', 'Generated',
    'Influenced', 'Launched', 'Marketed', 'Positioned', 'Promoted', 'Publicized', 'Targeted',
    'Transformed', 'Boosted', 'Captivated', 'Established', 'Strategized', 'Visualized'
  ],
  'healthcare': [
    'Administered', 'Assessed', 'Diagnosed', 'Educated', 'Facilitated', 'Implemented', 'Integrated',
    'Monitored', 'Performed', 'Prescribed', 'Rehabilitated', 'Screened', 'Treated', 'Improved',
    'Coordinated', 'Evaluated', 'Expedited', 'Maintained', 'Provided', 'Resolved'
  ],
  'education': [
    'Advised', 'Coached', 'Communicated', 'Coordinated', 'Developed', 'Educated', 'Enabled',
    'Encouraged', 'Evaluated', 'Facilitated', 'Guided', 'Informed', 'Instructed', 'Mentored',
    'Stimulated', 'Taught', 'Trained', 'Assessed', 'Motivated', 'Cultivated'
  ]
};

const ResumePowerWords: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Leadership');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const handleCopyToClipboard = (word: string) => {
    navigator.clipboard.writeText(word);
    toast({
      title: "Copied to Clipboard",
      description: `"${word}" has been copied to your clipboard.`,
    });
  };
  
  // Determine which word list to show
  const wordsToShow = selectedIndustry 
    ? industrySpecificWords[selectedIndustry] 
    : powerWords.find(category => category.category === selectedCategory)?.words || [];
  
  // Filter based on search term if there is one
  const filteredWords = searchTerm 
    ? wordsToShow.filter(word => 
        word.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : wordsToShow;
    
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Resume Power Words</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Strengthen your resume with impactful action verbs and power words that highlight your achievements
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="relative w-full">
            <Input 
              type="text" 
              placeholder="Search for power words..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-4 bg-gray-50 border-b">
            <h3 className="font-medium">Browse by Category</h3>
          </div>
          
          <Tabs 
            value={selectedIndustry ? 'industry' : 'general'} 
            onValueChange={(value) => {
              if (value === 'general') {
                setSelectedIndustry(null);
              } else {
                // Keep industry selected if already on industry tab
                if (selectedIndustry === null && value === 'industry') {
                  setSelectedIndustry('technology');
                }
              }
            }}
            className="w-full"
          >
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="general">General Categories</TabsTrigger>
                <TabsTrigger value="industry">Industry Specific</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="general" className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {powerWords.map((category) => (
                  <button
                    key={category.category}
                    className={`py-2 px-4 rounded-md text-sm transition-colors ${
                      selectedCategory === category.category
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.category);
                      setSelectedIndustry(null);
                    }}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="industry" className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(industrySpecificWords).map((industry) => (
                  <button
                    key={industry}
                    className={`py-2 px-4 rounded-md text-sm transition-colors ${
                      selectedIndustry === industry
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => {
                      setSelectedIndustry(industry);
                    }}
                  >
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="font-medium">
              {selectedIndustry 
                ? `${selectedIndustry.charAt(0).toUpperCase() + selectedIndustry.slice(1)} Power Words` 
                : `${selectedCategory} Power Words`}
            </h3>
            <span className="text-sm text-gray-500">{filteredWords.length} words</span>
          </div>
          
          <div className="p-6">
            {filteredWords.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredWords.map((word) => (
                  <div 
                    key={word} 
                    className="relative group flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200 hover:border-blue-400 transition-colors"
                  >
                    <span>{word}</span>
                    <button 
                      onClick={() => handleCopyToClipboard(word)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy to clipboard"
                    >
                      <ClipboardCopy size={14} className="text-gray-500 hover:text-blue-600" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No matching power words found. Try a different search term.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePowerWords;
