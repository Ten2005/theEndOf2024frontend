import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Clock, Images } from 'lucide-react';
import type { TATSession } from '@/lib/types';

interface SessionListProps {
  sessions: TATSession[];
  onSelectSession: (session: TATSession) => void;
}

export function SessionList({ sessions, onSelectSession }: SessionListProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">セッション履歴</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left h-auto p-4"
              onClick={() => onSelectSession(session)}
            >
              <div className="flex items-start gap-4">
                <Images className="w-5 h-5 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {session.time_stamp.toLocaleString()}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}