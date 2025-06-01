
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Type, Copy, Check } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const FontPairingGuide: React.FC = () => {
  const [copiedFont, setCopiedFont] = useState<string | null>(null);

  const fontPairings = [
    {
      name: "Classic Professional",
      headingFont: "Georgia",
      bodyFont: "Arial",
      description: "Traditional and highly readable",
      headingStyle: { fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 'bold' },
      bodyStyle: { fontFamily: 'Arial, sans-serif', fontSize: '14px' },
      usage: "Conservative industries, traditional companies"
    },
    {
      name: "Modern Minimalist",
      headingFont: "Helvetica Neue",
      bodyFont: "Helvetica Neue",
      description: "Clean and contemporary",
      headingStyle: { fontFamily: 'Helvetica Neue, sans-serif', fontSize: '24px', fontWeight: 'bold' },
      bodyStyle: { fontFamily: 'Helvetica Neue, sans-serif', fontSize: '14px' },
      usage: "Tech, design, startups"
    },
    {
      name: "Creative Professional",
      headingFont: "Montserrat",
      bodyFont: "Open Sans",
      description: "Friendly yet professional",
      headingStyle: { fontFamily: 'Montserrat, sans-serif', fontSize: '24px', fontWeight: 'bold' },
      bodyStyle: { fontFamily: 'Open Sans, sans-serif', fontSize: '14px' },
      usage: "Creative industries, marketing, consulting"
    },
    {
      name: "Executive Authority",
      headingFont: "Times New Roman",
      bodyFont: "Calibri",
      description: "Authoritative and established",
      headingStyle: { fontFamily: 'Times New Roman, serif', fontSize: '24px', fontWeight: 'bold' },
      bodyStyle: { fontFamily: 'Calibri, sans-serif', fontSize: '14px' },
      usage: "Finance, law, government"
    },
    {
      name: "Contemporary Clean",
      headingFont: "Lato",
      bodyFont: "Source Sans Pro",
      description: "Modern and approachable",
      headingStyle: { fontFamily: 'Lato, sans-serif', fontSize: '24px', fontWeight: 'bold' },
      bodyStyle: { fontFamily: 'Source Sans Pro, sans-serif', fontSize: '14px' },
      usage: "Healthcare, education, non-profit"
    },
    {
      name: "Tech Forward",
      headingFont: "Roboto",
      bodyFont: "Roboto",
      description: "Digital-native and efficient",
      headingStyle: { fontFamily: 'Roboto, sans-serif', fontSize: '24px', fontWeight: 'bold' },
      bodyStyle: { fontFamily: 'Roboto, sans-serif', fontSize: '14px' },
      usage: "Technology, engineering, data science"
    }
  ];

  const googleFonts = [
    "Roboto", "Open Sans", "Lato", "Montserrat", "Source Sans Pro", 
    "Roboto Condensed", "Raleway", "Ubuntu", "Merriweather", "Poppins"
  ];

  const systemFonts = [
    "Arial", "Helvetica", "Times New Roman", "Georgia", "Calibri", 
    "Verdana", "Tahoma", "Trebuchet MS", "Palatino", "Garamond"
  ];

  const copyFontName = (fontName: string) => {
    navigator.clipboard.writeText(fontName);
    setCopiedFont(fontName);
    toast({
      title: "Font name copied!",
      description: `"${fontName}" has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedFont(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <Type className="h-8 w-8" />
            Font Pairing Guide
          </h1>
          <p className="text-gray-600">Choose the perfect typography combination for your resume</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {fontPairings.map((pairing, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{pairing.name}</CardTitle>
                    <p className="text-sm text-gray-600">{pairing.description}</p>
                  </div>
                  <Badge variant="outline">{pairing.usage}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div style={pairing.headingStyle} className="mb-2">
                      John Smith
                    </div>
                    <div style={pairing.bodyStyle} className="text-gray-600">
                      Senior Software Engineer
                    </div>
                    <div style={pairing.bodyStyle} className="mt-2 text-sm leading-relaxed">
                      Experienced software engineer with 5+ years developing scalable web applications. 
                      Proficient in React, Node.js, and cloud technologies.
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Heading:</span>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{pairing.headingFont}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyFontName(pairing.headingFont)}
                          className="h-6 w-6 p-0"
                        >
                          {copiedFont === pairing.headingFont ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Body:</span>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{pairing.bodyFont}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyFontName(pairing.bodyFont)}
                          className="h-6 w-6 p-0"
                        >
                          {copiedFont === pairing.bodyFont ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Fonts (Web-Safe)</CardTitle>
              <p className="text-sm text-gray-600">Free fonts that work across all platforms</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {googleFonts.map((font) => (
                  <div key={font} className="flex items-center justify-between p-2 border rounded">
                    <span style={{ fontFamily: font }}>{font}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyFontName(font)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedFont === font ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Fonts (Universal)</CardTitle>
              <p className="text-sm text-gray-600">Fonts available on most computers</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {systemFonts.map((font) => (
                  <div key={font} className="flex items-center justify-between p-2 border rounded">
                    <span style={{ fontFamily: font }}>{font}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyFontName(font)}
                      className="h-8 w-8 p-0"
                    >
                      {copiedFont === font ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Typography Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Font Size Guidelines:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Name: 16-20pt</li>
                  <li>• Section headings: 12-14pt</li>
                  <li>• Body text: 10-12pt</li>
                  <li>• Contact info: 9-11pt</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Readability Tips:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Limit to 2 font families max</li>
                  <li>• Ensure sufficient contrast</li>
                  <li>• Use consistent spacing</li>
                  <li>• Test on different devices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Industry Considerations:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Creative: More font freedom</li>
                  <li>• Corporate: Conservative choices</li>
                  <li>• Tech: Clean, modern fonts</li>
                  <li>• Traditional: Classic serif fonts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FontPairingGuide;
