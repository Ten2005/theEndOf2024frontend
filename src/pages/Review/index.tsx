'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { EmotionGraph } from '@/components/EmotionGraph';
import { SessionList } from '@/components/SessionList';
import type { TATSession, ImageSession, EmotionData, Session } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';

export function Review() {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState<TATSession | null>(null);
  const [sessions, setSessions] = useState<TATSession[]>([]);
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const url = 'https://the-end-of-2024-38ff56ee0179.herokuapp.com';

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (user) {
      // Get sessions data from FastAPI
      fetch(url + '/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch sessions');
          }
          return response.json();
        })
        .then(data => {
          // Handle the sessions data
          // Convert ISO timestamp to desired format
          console.log(data);
          setSessions(data.map((session: Session) => ({
            id: session.id,
            timestamp: session.time_stamp,
            imageSessions: session.image_sessions
          })));
          setEmotionData(data.map((session: Session) => ({
            timestamp: session.time_stamp,
            joy: session.emotions.joy,
            sadness: session.emotions.sadness,
            anger: session.emotions.anger,
            fear: session.emotions.fear
          })));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching sessions:', error);
        });
    }
  }, [navigate, user]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">セッション分析</h1>
        <Button
          variant="ghost"
          onClick={() => navigate('/main')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          メインメニューへ戻る
        </Button>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-2">
        <EmotionGraph data={emotionData} />
        <SessionList 
          sessions={sessions}
          onSelectSession={setSelectedSession}
        />
      </div>

      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-4xl">
          <DialogTitle>
            セッション詳細 - {selectedSession?.time_stamp?.toLocaleString()}
          </DialogTitle>
          
          {selectedSession && (
            <Tabs defaultValue={`image-1`} className="w-full">
              <TabsList className="w-full justify-start">
                {selectedSession.imageSessions.map((session, index) => (
                  <TabsTrigger key={index} value={`image-${index + 1}`}>
                    画像 {session.imageNumber}
                  </TabsTrigger>
                ))}
              </TabsList>

              {selectedSession.imageSessions.map((imageSession: ImageSession, index) => (
                <TabsContent key={index} value={`image-${index + 1}`}>
                  <ScrollArea className="h-[60vh]">
                    <div className="space-y-4 pr-4">
                      {imageSession.messages.map((message, msgIndex) => (
                        <Card
                          key={msgIndex}
                          className={`p-4 ${
                            message.isUser ? 'ml-auto bg-primary/10' : 'bg-secondary'
                          } max-w-[80%]`}
                        >
                          {message.content}
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}