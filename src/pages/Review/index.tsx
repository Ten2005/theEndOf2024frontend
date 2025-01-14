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
import { GPTAnalysis } from '@/components/GPTAnalysis';
import { TATAnalysis } from '@/components/TATAnalysis';
import type { TATSession, EmotionData, Message } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewData {
  id: string;
  user_id: string;
  time_stamp: Date;
  content: Message[];
  emotions: {
      joy: number;
      sadness: number;
      anger: number;
      fear: number;
    }
}

export function Review() {
  const navigate = useNavigate();
  const [selectedSession, setSelectedSession] = useState<TATSession | null>(null);
  const [sessions, setSessions] = useState<TATSession[]>([]);
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const url = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8000'
    : 'https://the-end-of-2024-38ff56ee0179.herokuapp.com';

  useEffect(() => {
    console.log('Selected Session:', selectedSession);
    console.log('Contents:', selectedSession?.contents);
    if (!user) {
      navigate('/login');
    }
    if (user) {
      // Get sessions data from FastAPI
      fetch(url + '/review', {
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
        .then(allData => {
          console.log('API Response:', allData);
          setAnalysis(allData.user_data[0].GPT_analysis);
          const formattedSessions = allData.log_data.map((data: ReviewData) => ({
            id: data.id,
            time_stamp: data.time_stamp,
            contents: data.content
          }));
          console.log('Formatted Sessions:', formattedSessions);
          setSessions(formattedSessions);
          setEmotionData(allData.log_data.map((data: ReviewData) => ({
            time_stamp: data.time_stamp,
            joy: data.emotions.joy,
            sadness: data.emotions.sadness,
            anger: data.emotions.anger,
            fear: data.emotions.fear
          })));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching sessions:', error);
        });
    }
  }, [navigate, user, url]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 py-8 w-full">
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
        <EmotionGraph
        data={emotionData}
        />
        <SessionList 
          sessions={sessions}
          onSelectSession={setSelectedSession}
        />
        <GPTAnalysis
          analysis={analysis}
        />
        <TATAnalysis/>
      </div>

      <Dialog
      open={!!selectedSession}
      onOpenChange={() => setSelectedSession(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogTitle>
            セッション詳細 - {selectedSession?.time_stamp?.toLocaleString()}
          </DialogTitle>
          
          {selectedSession && Array.isArray(selectedSession.contents) && selectedSession.contents.length > 0 && (
            <Tabs defaultValue="image-1" className="w-full">
              <TabsList className="w-full justify-start">
                {Array.from({ length: Math.ceil(selectedSession.contents.length / 7) }, (_, index) => (
                  <TabsTrigger key={index} value={`image-${index + 1}`}>
                    画像 {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Array.from({ length: Math.ceil(selectedSession.contents.length / 7) }, (_, imageIndex) => (
                <TabsContent key={imageIndex} value={`image-${imageIndex + 1}`}>
                  <ScrollArea className="h-[60vh]">
                    <div className="space-y-4 pr-4">
                      {selectedSession.contents
                        .slice(imageIndex * 7, (imageIndex + 1) * 7)
                        .map((message: Message, index) => (
                          <Card
                            key={index}
                            className={`p-4 ${
                              message.role === 'user' ? 'ml-auto bg-primary/10' : 'bg-secondary'
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