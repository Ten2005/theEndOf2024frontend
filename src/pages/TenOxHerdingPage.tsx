import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const oxHerdingStages = [
  {
    level: 1,
    title: "尋牛 (Seeking the Ox)",
    description: "初心者レベル。自己探求の始まり。自分の本質や目的を見出そうとする最初の段階。",
    imageUrl: "/images/1.png"
  },
  {
    level: 2,
    title: "見跡 (Seeing the Tracks)",
    description: "初級者レベル。自己の痕跡を発見し、潜在的な可能性に気づき始める。",
    imageUrl: "/images/2.png"
  },
  {
    level: 3,
    title: "見牛 (Glimpsing the Ox)",
    description: "中級者レベル初期。自己の本質を部分的に認識し始める。",
    imageUrl: "/images/3.png"
  },
  {
    level: 4,
    title: "得牛 (Catching the Ox)",
    description: "中級者レベル中期。自己の本質を捕らえ始め、コントロールし始める。",
    imageUrl: "/images/4.png"
  },
  {
    level: 5,
    title: "牧牛 (Herding the Ox)",
    description: "中級者レベル後期。自己の本質を徐々に理解し、コントロールする能力を高める。",
    imageUrl: "/images/5.png"
  },
  {
    level: 6,
    title: "騎牛帰家 (Riding the Ox Home)",
    description: "上級者レベル初期。自己の本質を深く理解し、内なる平和を感じ始める。",
    imageUrl: "/images/6.png"
  },
  {
    level: 7,
    title: "忘牛存人 (Ox Forgotten, Self Remains)",
    description: "上級者レベル中期。自己と本質の区別が曖昧になり、より高次の意識に近づく。",
    imageUrl: "/images/7.png"
  },
  {
    level: 8,
    title: "人牛倶忘 (Both Ox and Self Forgotten)",
    description: "上級者レベル後期。自己と本質の概念を超越し、純粋な意識状態に達する。",
    imageUrl: "/images/8.png"
  },
  {
    level: 9,
    title: "返本還源 (Returning to the Origin)",
    description: "熟達者レベル。究極の悟りと、すべてのものとの根本的なつながりを理解する。",
    imageUrl: "/images/9.png"
  },
  {
    level: 10,
    title: "入鄽垂手 (Entering the Marketplace with Helping Hands)",
    description: "マスターレベル。悟りを得た後、慈悲と知恵を持って世界に貢献する。",
    imageUrl: "/images/1.png"
  }
];

export const TenOxHerdingPage: React.FC = () => {
  const navigate = useNavigate();
  const userLevel = 1;
  const userAdvice = "ここにユーザーのアドバイスを表示します。";
  const [selectedStage, setSelectedStage] = useState<typeof oxHerdingStages[0] | null>(null);
  const [imagePositions, setImagePositions] = useState<Array<{x: number, y: number, vx: number, vy: number}>>(
    oxHerdingStages.map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: 0.5 * (Math.random() > 0.5 ? 1 : -1),
      vy: 0.5 * (Math.random() > 0.5 ? 1 : -1)
    }))
  );

  useEffect(() => {
    const updatePositions = () => {
      setImagePositions(prev => prev.map(pos => {
        const newX = pos.x + pos.vx;
        const newY = pos.y + pos.vy;
        let newVx = pos.vx;
        let newVy = pos.vy;
        
        if (newX <= 0 || newX >= window.innerWidth - 100) {
          newVx = -newVx;
        }
        if (newY <= 0 || newY >= window.innerHeight - 100) {
          newVy = -newVy;
        }
        
        return {
          x: Math.max(0, Math.min(window.innerWidth - 100, newX)),
          y: Math.max(0, Math.min(window.innerHeight - 100, newY)),
          vx: newVx,
          vy: newVy
        };
      }));
    };

    const interval = setInterval(updatePositions, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <button
        onClick={() => navigate('/main')}
        className="absolute top-4 left-4 px-4 py-2 bg-primary/10 hover:bg-primary/20 
          text-primary rounded-lg transition-colors duration-200 
          flex items-center gap-2 z-50"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
        </svg>
        ホームに戻る
      </button>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-foreground text-8xl font-bold mb-4">十牛図</h1>
          <p className="text-muted-foreground text-4xl font-bold">Ten Bulls</p>
        </div>
      </div>
      {oxHerdingStages.map((stage, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            left: imagePositions[index].x,
            top: imagePositions[index].y,
          }}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: stage.level === userLevel ? [
              '0 0 10px rgba(59, 130, 246, 0.5)', 
              '0 0 20px rgba(59, 130, 246, 0.7)', 
              '0 0 10px rgba(59, 130, 246, 0.5)'
            ] : [
              '0 0 10px rgba(255, 255, 255, 0.1)',
              '0 0 20px rgba(255, 255, 255, 0.2)',
              '0 0 10px rgba(255, 255, 255, 0.1)'
            ]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          onClick={() => setSelectedStage(stage)}
          className={`cursor-pointer rounded-full ${stage.level === userLevel ? 'opacity-100' : 'opacity-50'}`}
        >
          <img 
            src={stage.imageUrl} 
            alt={stage.title}
            className={`w-24 h-24 rounded-full object-cover border-2 shadow-lg
              ${stage.level === userLevel ? 'border-blue-500' : 'border-white'}`}
            style={{
              background: stage.level === userLevel 
                ? `linear-gradient(45deg, rgb(59, 130, 246), transparent)`
                : `linear-gradient(45deg, white, transparent)`,
              animation: `${stage.level === userLevel ? 'glowingBlueBorder' : 'glowingWhiteBorder'} 2s ease-in-out infinite`,
            }}
          />
        </motion.div>
      ))}

      <style>{`
        @keyframes glowingBlueBorder {
          0% {
            box-shadow: 0 0 5px rgb(59, 130, 246),
                       0 0 10px rgb(59, 130, 246),
                       0 0 15px rgb(59, 130, 246);
          }
          50% {
            box-shadow: 0 0 10px rgb(59, 130, 246),
                       0 0 20px rgb(59, 130, 246),
                       0 0 30px rgb(59, 130, 246);
          }
          100% {
            box-shadow: 0 0 5px rgb(59, 130, 246),
                       0 0 10px rgb(59, 130, 246),
                       0 0 15px rgb(59, 130, 246);
          }
        }

        @keyframes glowingWhiteBorder {
          0%, 50%, 100% {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.3),
                       0 0 10px rgba(255, 255, 255, 0.2),
                       0 0 15px rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>

      {selectedStage && (
        <Dialog open={!!selectedStage} onOpenChange={() => setSelectedStage(null)}>
          <DialogContent className="sm:max-w-[600px] bg-background">
            <DialogHeader>
              <DialogTitle className="text-foreground">{selectedStage.title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src={selectedStage.imageUrl} 
                alt={selectedStage.title} 
                className="w-48 h-48 rounded-full object-cover"
              />
              <DialogDescription className="text-muted-foreground">
                <p className="mb-4">{selectedStage.description}</p>
                {selectedStage.level === userLevel && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                    <h4 className="text-primary font-semibold mb-2">アドバイス:</h4>
                    <p>{userAdvice}</p>
                  </div>
                )}
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TenOxHerdingPage;
