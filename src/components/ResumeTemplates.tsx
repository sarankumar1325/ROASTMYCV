
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  Download, 
  Eye, 
  FileText,
  Filter
} from 'lucide-react';

interface TemplateProps {
  id: string;
  name: string;
  category: 'modern' | 'professional' | 'creative' | 'simple';
  description: string;
  imageUrl: string;
}

const templates: TemplateProps[] = [
  {
    id: 'template1',
    name: 'Clean Professional',
    category: 'professional',
    description: 'A clean, professional template perfect for traditional industries.',
    imageUrl: 'https://placehold.co/600x800/e2e8f0/1e293b?text=Professional+Template',
  },
  {
    id: 'template2',
    name: 'Modern Minimalist',
    category: 'modern',
    description: 'A sleek, minimalist design with a modern touch.',
    imageUrl: 'https://placehold.co/600x800/f0fdf4/166534?text=Modern+Template',
  },
  {
    id: 'template3',
    name: 'Creative Portfolio',
    category: 'creative',
    description: 'A creative layout for designers and artists to showcase their work.',
    imageUrl: 'https://placehold.co/600x800/fef2f2/991b1b?text=Creative+Template',
  },
  {
    id: 'template4',
    name: 'Simple Classic',
    category: 'simple',
    description: 'A timeless, simple design that works for any profession.',
    imageUrl: 'https://placehold.co/600x800/f8fafc/0f172a?text=Simple+Template',
  },
  {
    id: 'template5',
    name: 'Tech Specialist',
    category: 'modern',
    description: 'Designed specifically for IT and tech professionals.',
    imageUrl: 'https://placehold.co/600x800/f0f9ff/0369a1?text=Tech+Template',
  },
  {
    id: 'template6',
    name: 'Executive Pro',
    category: 'professional',
    description: 'For senior executives and management professionals.',
    imageUrl: 'https://placehold.co/600x800/f5f5f4/1c1917?text=Executive+Template',
  },
];

const ResumeTemplates: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = currentCategory === 'all' || template.category === currentCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  const handleDownload = (templateId: string, templateName: string) => {
    // In a real app, this would download the actual template
    // For this demo, we'll just show a toast
    toast({
      title: "Template Downloaded!",
      description: `${templateName} template has been downloaded.`,
    });
  };
  
  const handlePreview = (templateId: string) => {
    // In a real app, this would open a preview modal
    // For this demo, we'll just show a toast
    toast({
      title: "Preview Coming Soon",
      description: "Template preview functionality will be available soon!",
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-block p-2 bg-blue-100 rounded-lg mb-4">
          <FileText className="text-blue-500 h-6 w-6" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Resume Templates</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Browse our collection of professionally designed resume templates. 
          Download and customize to create a resume that stands out.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search templates..." 
              className="w-full px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium">Filter:</span>
            <Tabs value={currentCategory} onValueChange={setCurrentCategory} className="w-full">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="modern">Modern</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
                <TabsTrigger value="simple">Simple</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="relative pb-[133%] overflow-hidden">
              <img 
                src={template.imageUrl} 
                alt={`${template.name} template`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{template.name}</h3>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded capitalize">
                  {template.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 flex items-center justify-center gap-1"
                  onClick={() => handlePreview(template.id)}
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700" 
                  size="sm"
                  onClick={() => handleDownload(template.id, template.name)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-2">Can't find what you're looking for?</p>
        <Button 
          variant="outline"
          onClick={() => {
            toast({
              title: "Coming Soon!",
              description: "Custom template requests will be available in the future.",
            });
          }}
        >
          Request a Custom Template
        </Button>
      </div>
    </div>
  );
};

export default ResumeTemplates;
