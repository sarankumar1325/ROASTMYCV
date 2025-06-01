
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Clock, Target, TrendingUp } from 'lucide-react';

const ResumeAnalytics: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeResume = () => {
    const words = resumeText.trim().split(/\s+/).filter(word => word.length > 0);
    const characters = resumeText.length;
    const charactersNoSpaces = resumeText.replace(/\s/g, '').length;
    const sentences = resumeText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = resumeText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Action words analysis
    const actionWords = [
      'achieved', 'managed', 'led', 'developed', 'created', 'implemented', 'improved',
      'increased', 'decreased', 'optimized', 'designed', 'built', 'launched', 'delivered',
      'coordinated', 'supervised', 'established', 'initiated', 'executed', 'streamlined'
    ];
    
    const foundActionWords = actionWords.filter(word => 
      resumeText.toLowerCase().includes(word)
    );
    
    // Calculate reading time (average 200 words per minute)
    const readingTime = Math.ceil(words.length / 200);
    
    // Industry recommendations
    const getIndustryRec = (wordCount: number) => {
      if (wordCount < 300) return { status: 'short', color: 'yellow' };
      if (wordCount > 800) return { status: 'long', color: 'red' };
      return { status: 'optimal', color: 'green' };
    };
    
    const industryRec = getIndustryRec(words.length);
    
    setAnalysis({
      words: words.length,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      avgWordsPerSentence: sentences > 0 ? Math.round(words.length / sentences) : 0,
      readingTime,
      actionWords: foundActionWords,
      industryRec
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Resume Analytics</h1>
          <p className="text-gray-600">Get detailed insights about your resume's readability and structure</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Resume Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your resume text here for analysis..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[300px] mb-4"
              />
              <Button onClick={analyzeResume} disabled={!resumeText.trim()}>
                Analyze Resume
              </Button>
            </CardContent>
          </Card>

          {analysis && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Text Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">{analysis.words}</div>
                      <div className="text-sm text-gray-600">Words</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">{analysis.characters}</div>
                      <div className="text-sm text-gray-600">Characters</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-2xl font-bold text-purple-600">{analysis.sentences}</div>
                      <div className="text-sm text-gray-600">Sentences</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded">
                      <div className="text-2xl font-bold text-orange-600">{analysis.paragraphs}</div>
                      <div className="text-sm text-gray-600">Paragraphs</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Readability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Reading Time</span>
                    <Badge variant="outline">{analysis.readingTime} min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Avg Words/Sentence</span>
                    <Badge variant="outline">{analysis.avgWordsPerSentence}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Resume Length</span>
                      <Badge variant={analysis.industryRec.color === 'green' ? 'default' : 'destructive'}>
                        {analysis.industryRec.status}
                      </Badge>
                    </div>
                    <Progress 
                      value={Math.min((analysis.words / 600) * 100, 100)} 
                      className="h-2" 
                    />
                    <div className="text-xs text-gray-500">
                      Optimal range: 300-600 words for most industries
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Action Words Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {analysis.actionWords.map((word: string) => (
                      <Badge key={word} variant="secondary">{word}</Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    {analysis.actionWords.length}/20 strong action words detected
                  </div>
                  <Progress value={(analysis.actionWords.length / 20) * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalytics;
