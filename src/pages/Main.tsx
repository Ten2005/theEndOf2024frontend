import { MessageSquare, FileText, MessageCircle } from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import { BackgroundGrid } from '@/components/BackgroundGrid';

export function Main() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundGrid />
      
      <div className="relative container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
        <h1 className="
        text-2xl font-serif font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient-x
        sm:text-4xl md:text-5xl lg:text-6xl
        ">
          Art&Innovation
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2 w-full max-w-5xl perspective-1000">
          <div className="animate-float-slow">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="TAT×Chat"
              description="TATによる無意識情報の抽出、及び対話による悩み意識の明確化を検証。"
              href="/chat"
              glowColor="from-blue-500/20"
            />
          </div>
          <div className="animate-float-delayed">
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Review"
              description="分析結果を確認し内省を促す。"
              href="/review"
              glowColor="from-purple-500/20"
            />
          </div>
          <div className="animate-float-delayed">
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8" />}
              title="Ten Ox-Herding Pictures"
              description="十牛図を用いて自己探究を促進。"
              href="/ten-ox-herding"
              glowColor="from-purple-500/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}