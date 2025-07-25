import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/AuthGuard';
import { Toaster } from '@/components/ui/toaster';
import { Home } from '@/pages/Home';
import { Main } from '@/pages/Main';
import { Chat } from '@/pages/Chat';
import { Review } from '@/pages/Review';
import { Login } from '@/pages/Login';
import { TenOxHerdingPage } from '@/pages/TenOxHerdingPage';
import { Feedback } from '@/pages/Feedback';
import { Admin } from '@/pages/Admin';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<AuthGuard><Main /></AuthGuard>} />
          <Route path="/chat" element={<AuthGuard><Chat /></AuthGuard>} />
          <Route path="/review" element={<AuthGuard><Review /></AuthGuard>} />
          <Route path="/ten-ox-herding" element={<AuthGuard><TenOxHerdingPage /></AuthGuard>} />
          <Route path="/feedback" element={<AuthGuard><Feedback /></AuthGuard>} />
          <Route path="/admin" element={<AuthGuard><Admin /></AuthGuard>} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}