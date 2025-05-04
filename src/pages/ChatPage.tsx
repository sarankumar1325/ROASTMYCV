
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { 
  getChatSession, 
  getMessages, 
  sendMessage, 
  createChatSession,
  touchChatSession
} from '@/services/chatService';
import type { Message } from '@/types/database';

const ChatPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [chatSession, setChatSession] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  // Load or create chat session
  useEffect(() => {
    const loadOrCreateSession = async () => {
      try {
        if (sessionId) {
          // Load existing session
          const session = await getChatSession(sessionId);
          if (!session) {
            navigate('/chat');
            return;
          }
          setChatSession(session);
          
          // Load messages
          const sessionMessages = await getMessages(sessionId);
          setMessages(sessionMessages);
        } else {
          // Create new session
          const newSession = await createChatSession("New Chat Session");
          if (newSession) {
            navigate(`/chat/${newSession.id}`);
          } else {
            throw new Error('Failed to create chat session');
          }
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load chat session',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadOrCreateSession();
  }, [sessionId, navigate, toast]);
  
  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !chatSession || sending) {
      return;
    }
    
    setSending(true);
    
    try {
      // Add user message to UI immediately for better UX
      const optimisticUserMessage: Message = {
        id: `temp-${Date.now()}`,
        chat_session_id: chatSession.id,
        sender: 'user',
        content: newMessage,
        timestamp: new Date().toISOString(),
        metadata: {}
      };
      
      setMessages(prev => [...prev, optimisticUserMessage]);
      setNewMessage('');
      
      // Show AI is typing
      const optimisticAiMessage: Message = {
        id: `temp-${Date.now() + 1}`,
        chat_session_id: chatSession.id,
        sender: 'ai',
        content: 'Thinking...',
        timestamp: new Date().toISOString(),
        metadata: { isLoading: true }
      };
      
      setMessages(prev => [...prev, optimisticAiMessage]);
      
      // Send to API
      await sendMessage(chatSession.id, optimisticUserMessage.content);
      
      // Update chat session timestamp
      await touchChatSession(chatSession.id);
      
      // Reload messages to get the real AI response
      const updatedMessages = await getMessages(chatSession.id);
      setMessages(updatedMessages);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading chat...</div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto max-w-4xl flex flex-col pt-6 pb-16 px-4">
        <div className="flex-1 flex flex-col space-y-4 mb-4">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center text-muted-foreground">
                <h3 className="text-lg font-medium">Start a new conversation</h3>
                <p>Send a message to begin chatting with the AI assistant.</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <Card className={`max-w-[85%] ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <CardContent className="p-4">
                    {message.metadata?.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>
        
        <div className="sticky bottom-4 bg-background pt-4">
          <Separator className="mb-4" />
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={sending}
              className="flex-1"
            />
            <Button type="submit" disabled={sending || !newMessage.trim()}>
              Send
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
