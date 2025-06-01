
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Copy, Check } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const ColorPaletteGenerator: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colorPalettes = [
    {
      name: "Corporate Blue",
      description: "Professional and trustworthy",
      colors: ["#003366", "#0066CC", "#4D94FF", "#B3D9FF", "#E6F3FF"],
      textColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#003366", "#003366"]
    },
    {
      name: "Elegant Gray",
      description: "Modern and sophisticated",
      colors: ["#2C2C2C", "#4A4A4A", "#6B6B6B", "#9E9E9E", "#E0E0E0"],
      textColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#2C2C2C", "#2C2C2C"]
    },
    {
      name: "Forest Green",
      description: "Natural and growth-oriented",
      colors: ["#1B4332", "#2D5016", "#40531B", "#74A942", "#B7E4C7"],
      textColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#1B4332", "#1B4332"]
    },
    {
      name: "Burgundy Professional",
      description: "Sophisticated and authoritative",
      colors: ["#4A1B2E", "#7A2D4A", "#A64D79", "#D87CAC", "#F0BCD4"],
      textColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#4A1B2E", "#4A1B2E"]
    },
    {
      name: "Navy & Gold",
      description: "Luxurious and executive",
      colors: ["#1B2951", "#2E4374", "#4A6FA5", "#FFD700", "#FFF8DC"],
      textColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#1B2951", "#1B2951"]
    },
    {
      name: "Monochrome",
      description: "Clean and minimalist",
      colors: ["#000000", "#333333", "#666666", "#CCCCCC", "#FFFFFF"],
      textColors: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#000000", "#000000"]
    }
  ];

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Palette className="h-8 w-8" />
            Professional Color Palettes
          </h1>
          <p className="text-gray-600">Choose the perfect color scheme for your resume design</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorPalettes.map((palette, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{palette.name}</CardTitle>
                <p className="text-sm text-gray-600">{palette.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {palette.colors.map((color, colorIndex) => (
                    <div 
                      key={colorIndex}
                      className="flex items-center justify-between p-3 rounded-lg border"
                      style={{ backgroundColor: color, color: palette.textColors[colorIndex] }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded border-2 border-white shadow"
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-mono text-sm">{color}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(color)}
                        className="h-8 w-8 p-0"
                        style={{ color: palette.textColors[colorIndex] }}
                      >
                        {copiedColor === color ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2">Usage Tips:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: palette.colors[0] }}
                      />
                      <span>Headers & Name</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: palette.colors[1] }}
                      />
                      <span>Section Titles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: palette.colors[2] }}
                      />
                      <span>Accents & Links</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: palette.colors[4] }}
                      />
                      <span>Background</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Color Psychology in Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Best Practices:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Use 2-3 colors maximum for professional look</li>
                  <li>• Ensure high contrast for readability</li>
                  <li>• Keep body text in dark colors (black/dark gray)</li>
                  <li>• Use accent colors sparingly for emphasis</li>
                  <li>• Consider industry standards and culture</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Color Meanings:</h4>
                <ul className="space-y-2 text-sm">
                  <li><Badge className="mr-2 bg-blue-600">Blue</Badge> Trust, stability, professionalism</li>
                  <li><Badge className="mr-2 bg-gray-600">Gray</Badge> Sophistication, neutrality, balance</li>
                  <li><Badge className="mr-2 bg-green-600">Green</Badge> Growth, harmony, freshness</li>
                  <li><Badge className="mr-2 bg-purple-600">Purple</Badge> Creativity, luxury, innovation</li>
                  <li><Badge className="mr-2 bg-red-600">Red</Badge> Energy, passion, confidence</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
