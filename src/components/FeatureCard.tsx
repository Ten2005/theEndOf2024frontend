import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  glowColor?: string;
}

export function FeatureCard({ icon, title, description, href, glowColor = "from-primary/20" }: FeatureCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group relative h-full bg-secondary/50 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/30 transition-all duration-500">
      {/* Glow Effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
        `bg-gradient-to-r ${glowColor} to-transparent`
      )} />

      {/* Content */}
      <div className="relative p-8 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
        </div>

        <p className="text-lg text-muted-foreground mb-8 flex-grow">
          {description}
        </p>

        <Button 
          className="w-full bg-primary/10 hover:bg-primary/90 group-hover:scale-105 transition-all duration-300"
          onClick={() => navigate(href)}
        >
          開始する
        </Button>
      </div>
    </Card>
  );
}