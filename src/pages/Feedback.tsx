import { BackgroundGrid } from '@/components/BackgroundGrid';
import { AuthGuard } from '@/components/AuthGuard';
import { useAuth } from '@/contexts/AuthContext';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const questions = [
  "何回目の対話に対する評価ですか？",
  "1. TAT図（または動画）はどのような感情を引き起こしましたか？",
  "2. TAT図（または動画）は想像力を刺激するものでしたか？",
  "3. 物語生成は楽しく、気軽に行えましたか？",
  "4. 物語を考える際に負担やストレスを感じましたか？",
  "5. 作った物語には自分の無意識的な思考や感情が反映されていると思いますか？",
  "6. 物語生成を通じて、新しい自分の一面に気づきましたか？",
  "7. Chatbotの質問は、自分の物語をさらに深く考えるきっかけになりましたか？",
  "8. 各Chatbotのアプローチは、それぞれ異なる視点を提供していましたか？",
  "9. 感情の変化の可視化は分かりやすかったですか？",
  "10. AIの感情推定が実際の気持ちと一致していましたか？",
  "11. 性格分析の内容は納得できるものでしたか？",
  "12. 分析結果は、自分の考えや価値観について新しい視点を提供していましたか？",
  "13. 提供されたアドバイスは、役に立つと感じましたか？",
  "14. アドバイスの内容が自分の状況に適していると感じましたか？",
  "15. フィードバックの流れ（感情→性格→アドバイス）はスムーズでしたか？",
  "16. 自分の心の状態を知るのに役立ちましたか？",
  "17. 十牛図を知っていましたか？",
  "18. 今回の体験で十牛図を理解することができましたか？",
  "19. 自分が十牛図のどの段階にいるかを示されることは有益でしたか？",
  "20. 十牛図のどの段階にいるかの判定が納得できましたか？",
  "21. 自分が十牛図の次の段階に進みたいと思いますか？",
  "22. 純粋なゲームやエンターテイメントとしても楽しめそうですか？"
];

export function Feedback() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scores, setScores] = useState<{[key: number]: string}>({});
  const url = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8000'
    : 'https://the-end-of-2024-38ff56ee0179.herokuapp.com';

  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const response = await fetch(url + '/feedback', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.id,
          scores: Object.values(scores).map(score => parseInt(score))
        })
      });

      if (!response.ok) {
        throw new Error('フィードバックの送信に失敗しました');
      }

      toast({
        title: "送信完了",
        description: "フィードバックありがとうございました",
      });

      navigate('/main');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        variant: "destructive",
        title: "エラー",
        description: "フィードバックの送信に失敗しました",
      });
    }
  };

  return (
    <AuthGuard>
      <div className="relative min-h-screen overflow-hidden bg-background">
        <BackgroundGrid />
        
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

        <div className="relative container mx-auto px-2 sm:px-4 min-h-screen flex flex-col items-center justify-center py-16 sm:py-0">
          <h1 className="
            text-2xl font-serif font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient-x
            sm:text-4xl md:text-5xl lg:text-6xl
          ">
            フィードバック
          </h1>

          <div className="w-full max-w-2xl space-y-6 sm:space-y-8">
            {questions.map((question, index) => (
              <div key={index} className="bg-card p-4 sm:p-6 rounded-lg shadow-lg">
                <p className="text-base sm:text-lg mb-4 text-foreground">{question}</p>
                <RadioGroup
                  value={scores[index]}
                  onValueChange={(value) => setScores(prev => ({...prev, [index]: value}))}
                  className="flex flex-wrap gap-4 sm:gap-6 justify-center"
                >
                  {[1, 2, 3, 4, 5].map((score) => (
                    <div key={score} className="flex flex-col items-center space-y-1 sm:space-y-2">
                      <RadioGroupItem
                        value={score.toString()}
                        id={`q${index}-score${score}`}
                        className="peer"
                      />
                      <Label
                        htmlFor={`q${index}-score${score}`}
                        className="text-muted-foreground peer-data-[state=checked]:text-primary"
                      >
                        {score}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <div className="flex justify-center mt-8">
              <Button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                disabled={Object.keys(scores).length !== questions.length}
              >
                送信
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </AuthGuard>
  );
}

export default Feedback;
