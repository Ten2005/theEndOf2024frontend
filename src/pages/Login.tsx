import { Card } from '@/components/ui/card';
import { AuthTabs } from '@/components/auth/AuthTabs';

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Art&Innovation</h1>
        <AuthTabs />
      </Card>
    </div>
  );
}