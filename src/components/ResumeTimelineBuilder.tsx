
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Download,
  ClipboardCopy
} from 'lucide-react';

interface TimelineItem {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'experience' | 'project' | 'certification';
}

const ResumeTimelineBuilder: React.FC = () => {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [currentType, setCurrentType] = useState<'education' | 'experience' | 'project' | 'certification'>('experience');
  
  const addNewItem = () => {
    const newItem: TimelineItem = {
      id: `item-${Date.now()}`,
      startDate: '',
      endDate: '',
      title: '',
      organization: '',
      description: '',
      type: currentType
    };
    
    setItems([...items, newItem]);
  };
  
  const updateItem = (id: string, field: keyof TimelineItem, value: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Timeline item has been removed.",
    });
  };
  
  const moveItemUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setItems(newItems);
  };
  
  const moveItemDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setItems(newItems);
  };
  
  const copyToClipboard = () => {
    const formattedText = items
      .sort((a, b) => {
        // Sort by type first, then by date (newest first)
        if (a.type !== b.type) {
          return a.type.localeCompare(b.type);
        }
        return b.startDate.localeCompare(a.startDate);
      })
      .map(item => {
        return `
${item.title.toUpperCase()} | ${item.organization}
${item.startDate} - ${item.endDate}
${item.description}
        `.trim();
      })
      .join('\n\n');
    
    navigator.clipboard.writeText(formattedText);
    toast({
      title: "Copied to Clipboard",
      description: "Timeline content has been copied to your clipboard.",
    });
  };
  
  const downloadAsText = () => {
    // Group items by type
    const grouped: Record<string, TimelineItem[]> = {};
    
    items.forEach(item => {
      if (!grouped[item.type]) {
        grouped[item.type] = [];
      }
      grouped[item.type].push(item);
    });
    
    // Format the text with sections
    let formattedText = "";
    
    // Experience section
    if (grouped['experience']?.length) {
      formattedText += "PROFESSIONAL EXPERIENCE\n\n";
      grouped['experience']
        .sort((a, b) => b.startDate.localeCompare(a.startDate)) // Sort by date (newest first)
        .forEach(item => {
          formattedText += `${item.title} | ${item.organization}\n`;
          formattedText += `${item.startDate} - ${item.endDate}\n`;
          formattedText += `${item.description}\n\n`;
        });
    }
    
    // Education section
    if (grouped['education']?.length) {
      formattedText += "EDUCATION\n\n";
      grouped['education']
        .sort((a, b) => b.startDate.localeCompare(a.startDate))
        .forEach(item => {
          formattedText += `${item.title} | ${item.organization}\n`;
          formattedText += `${item.startDate} - ${item.endDate}\n`;
          formattedText += `${item.description}\n\n`;
        });
    }
    
    // Projects section
    if (grouped['project']?.length) {
      formattedText += "PROJECTS\n\n";
      grouped['project']
        .sort((a, b) => b.startDate.localeCompare(a.startDate))
        .forEach(item => {
          formattedText += `${item.title} | ${item.organization}\n`;
          formattedText += `${item.startDate} - ${item.endDate}\n`;
          formattedText += `${item.description}\n\n`;
        });
    }
    
    // Certifications section
    if (grouped['certification']?.length) {
      formattedText += "CERTIFICATIONS\n\n";
      grouped['certification']
        .sort((a, b) => b.startDate.localeCompare(a.startDate))
        .forEach(item => {
          formattedText += `${item.title} | ${item.organization}\n`;
          formattedText += `${item.startDate} - ${item.endDate}\n`;
          formattedText += `${item.description}\n\n`;
        });
    }
    
    // Create and download the file
    const blob = new Blob([formattedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-timeline.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Timeline Downloaded",
      description: "Your resume timeline has been downloaded as a text file.",
    });
  };
  
  const filteredItems = items.filter(item => item.type === currentType);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-block p-2 bg-blue-100 rounded-lg mb-4">
          <Calendar className="text-blue-500 h-6 w-6" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Resume Timeline Builder</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Organize your career history, education, and achievements chronologically for your resume
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <Tabs value={currentType} onValueChange={(value) => setCurrentType(value as any)} className="w-full mb-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="project">Projects</TabsTrigger>
            <TabsTrigger value="certification">Certifications</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mb-8">
          <Button 
            onClick={addNewItem}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add {currentType.charAt(0).toUpperCase() + currentType.slice(1)} Item
          </Button>
        </div>
        
        <div className="space-y-6 mb-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No items added yet. Click the button above to add your first {currentType} item.</p>
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`start-date-${item.id}`}>Start Date</Label>
                    <Input 
                      id={`start-date-${item.id}`}
                      type="text" 
                      placeholder="MM/YYYY or Present" 
                      value={item.startDate}
                      onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`end-date-${item.id}`}>End Date</Label>
                    <Input 
                      id={`end-date-${item.id}`}
                      type="text" 
                      placeholder="MM/YYYY or Present" 
                      value={item.endDate}
                      onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor={`title-${item.id}`}>
                      {item.type === 'education' ? 'Degree/Program' : 
                       item.type === 'experience' ? 'Job Title' :
                       item.type === 'project' ? 'Project Name' : 'Certification Name'}
                    </Label>
                    <Input 
                      id={`title-${item.id}`}
                      type="text" 
                      value={item.title}
                      onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`organization-${item.id}`}>
                      {item.type === 'education' ? 'School/University' : 
                       item.type === 'experience' ? 'Company' :
                       item.type === 'project' ? 'Organization' : 'Issuing Organization'}
                    </Label>
                    <Input 
                      id={`organization-${item.id}`}
                      type="text" 
                      value={item.organization}
                      onChange={(e) => updateItem(item.id, 'organization', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor={`description-${item.id}`}>Description</Label>
                  <textarea 
                    id={`description-${item.id}`}
                    rows={3}
                    placeholder="Enter achievements, responsibilities, or details"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  ></textarea>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => moveItemUp(index)}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => moveItemDown(index)}
                      disabled={index === filteredItems.length - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="flex justify-end gap-4">
            <Button 
              variant="outline"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              <ClipboardCopy className="h-4 w-4" />
              Copy to Clipboard
            </Button>
            <Button 
              onClick={downloadAsText}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download as Text
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeTimelineBuilder;
