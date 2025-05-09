
import { toast } from "@/hooks/use-toast";

// Groq API key
const GROQ_API_KEY = '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';

export interface VoiceOptions {
  voiceId: string;
  displayName: string;
  description: string;
}

// Available voices for the playai-tts model
export const availableVoices: VoiceOptions[] = [
  { voiceId: "Arista-PlayAI", displayName: "Arista", description: "Professional female voice" },
  { voiceId: "Atlas-PlayAI", displayName: "Atlas", description: "Authoritative male voice" },
  { voiceId: "Basil-PlayAI", displayName: "Basil", description: "Friendly male voice" },
  { voiceId: "Briggs-PlayAI", displayName: "Briggs", description: "Confident male voice" },
  { voiceId: "Calum-PlayAI", displayName: "Calum", description: "Engaging male voice" },
  { voiceId: "Celeste-PlayAI", displayName: "Celeste", description: "Warm female voice" },
  { voiceId: "Fritz-PlayAI", displayName: "Fritz", description: "Enthusiastic male voice" },
  { voiceId: "Gail-PlayAI", displayName: "Gail", description: "Supportive female voice" },
  { voiceId: "Mamaw-PlayAI", displayName: "Mamaw", description: "Experienced female voice" },
  { voiceId: "Quinn-PlayAI", displayName: "Quinn", description: "Energetic voice" }
];

/**
 * Convert text to speech using Groq's API
 */
export const textToSpeech = async (text: string, voice: string = "Fritz-PlayAI"): Promise<string> => {
  try {
    // Prepare the audio segments (chunk the text if it's too long)
    const chunks = chunkText(text, 1000); // Chunk into 1000 character segments
    
    // Convert the first chunk to audio (for immediate feedback)
    const response = await fetch('https://api.groq.com/openai/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "playai-tts",
        voice: voice,
        input: chunks[0],
        response_format: "wav"
      })
    });

    if (!response.ok) {
      throw new Error(`Error generating audio: ${response.statusText}`);
    }

    // Convert the response to a blob and create a URL
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    return audioUrl;
  } catch (error) {
    console.error("Error converting text to speech:", error);
    toast({
      title: "Audio generation failed",
      description: "There was an issue creating the audio. Please try again.",
      variant: "destructive",
    });
    return "";
  }
};

/**
 * Chunk text into smaller pieces for API processing
 */
const chunkText = (text: string, maxLength: number): string[] => {
  const chunks: string[] = [];
  
  // Split by sentences to maintain coherence
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
  let currentChunk = "";
  
  for (const sentence of sentences) {
    // If adding this sentence would exceed the max length, save the current chunk and start a new one
    if ((currentChunk + sentence).length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = sentence;
    } else {
      currentChunk += sentence;
    }
  }
  
  // Add the last chunk if it's not empty
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks;
};
