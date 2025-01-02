import { ArrowRight, Palette, MessageSquareText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-6 md:space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Palette className="w-8 h-8 md:w-12 md:h-12 text-primary animate-pulse" />
            <MessageSquareText className="w-8 h-8 md:w-12 md:h-12 text-primary animate-pulse delay-300" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Art&Innovation
          </h1>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
            TAT×Chat
          </h2>
          
          <div className="mt-8 md:mt-12">
            <Button 
              size="lg" 
              className="group text-base md:text-lg px-6 py-4 md:px-8 md:py-6 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl w-full md:w-auto"
              onClick={() => navigate('/main')}
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-radial from-accent/20 to-transparent opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}