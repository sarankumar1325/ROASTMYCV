
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, Volume1, VolumeX, RefreshCw, Pause, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { textToSpeech, availableVoices, VoiceOptions } from "@/services/audioService";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AudioFeedbackProps {
  text: string;
  sectionTitle?: string;
}

const AudioFeedback: React.FC<AudioFeedbackProps> = ({ text, sectionTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOptions>(availableVoices[5]); // Celeste voice by default

  const generateAudio = async () => {
    try {
      setIsLoading(true);
      
      // Format the text for speech
      const speechText = sectionTitle 
        ? `${sectionTitle}. ${text}` 
        : text;
      
      // Generate audio
      const url = await textToSpeech(speechText, selectedVoice.voiceId);
      
      if (url) {
        setAudioUrl(url);
        
        // Create audio element
        const audio = new Audio(url);
        setAudioElement(audio);
        
        // Add event listeners
        audio.addEventListener('ended', () => {
          setIsPlaying(false);
        });
        
        // Auto-play after generating
        audio.play();
        setIsPlaying(true);
        
        toast({
          title: "Audio ready",
          description: "Your resume feedback is now playing",
        });
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        title: "Audio generation failed",
        description: "There was an issue creating the audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayback = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const handleVoiceChange = (value: string) => {
    const voice = availableVoices.find(v => v.voiceId === value) || availableVoices[0];
    setSelectedVoice(voice);
    // Reset audio if it exists
    if (audioUrl) {
      if (audioElement) {
        audioElement.pause();
      }
      setIsPlaying(false);
      setAudioUrl(null);
    }
  };

  return (
    <div className="flex flex-col space-y-3 p-4 bg-white rounded-lg border shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isPlaying ? (
            <Volume2 size={20} className="text-primary animate-pulse" />
          ) : audioUrl ? (
            <Volume1 size={20} className="text-gray-500" />
          ) : (
            <VolumeX size={20} className="text-gray-400" />
          )}
          <span className="font-medium">Audio Feedback</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={selectedVoice.voiceId} onValueChange={handleVoiceChange}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Voices</SelectLabel>
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.voiceId} value={voice.voiceId} className="text-sm">
                    {voice.displayName} - {voice.description}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        {!audioUrl ? (
          <Button 
            onClick={generateAudio} 
            disabled={isLoading || !text}
            className="w-full bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700"
          >
            {isLoading ? (
              <>
                <RefreshCw size={16} className="mr-2 animate-spin" />
                Generating audio...
              </>
            ) : (
              <>Listen to feedback</>
            )}
          </Button>
        ) : (
          <div className="w-full flex space-x-2">
            <Button 
              onClick={togglePlayback} 
              variant="outline"
              className="flex-1"
            >
              {isPlaying ? (
                <>
                  <Pause size={16} className="mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play size={16} className="mr-2" />
                  Play
                </>
              )}
            </Button>
            <Button 
              onClick={generateAudio} 
              disabled={isLoading}
              variant="outline"
              className="flex-1"
            >
              <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>
        )}
      </div>
      
      {audioUrl && (
        <div className="text-xs text-gray-500 italic mt-1">
          Audio available in {selectedVoice.displayName} voice
        </div>
      )}
    </div>
  );
};

export default AudioFeedback;
