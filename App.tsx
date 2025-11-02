
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ToolCard } from './components/ToolCard';
import { QualityEnhancer } from './components/QualityEnhancer';
import { TOOLS } from './constants';
import { useAuth } from './contexts/AuthContext';
import { LoginModal } from './components/LoginModal';
import { SignupModal } from './components/SignupModal';
import { Toast } from './components/Toast';
import { UpgradeBanner } from './components/UpgradeBanner';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [showGuestToast, setShowGuestToast] = useState(false);
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    // Show guest toast only once per session
    const guestToastShown = sessionStorage.getItem('guestToastShown');
    if (!isLoading && !isLoggedIn && !guestToastShown) {
        const timer = setTimeout(() => {
            setShowGuestToast(true);
            sessionStorage.setItem('guestToastShown', 'true');
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isLoading]);

  const handleSwitchToSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const handleSwitchToLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 to-white dark:from-slate-900 dark:to-sky-950 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Header onLoginClick={() => setLoginOpen(true)} onSignupClick={() => setSignupOpen(true)} />
      
      <main className="container mx-auto px-4 py-8">
        {isLoggedIn && <Dashboard />}

        <QualityEnhancer />

        {!isLoggedIn && !isLoading && <UpgradeBanner onSignupClick={() => setSignupOpen(true)} />}

        <div className="my-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{isLoggedIn ? 'Explore The Tools' : 'AI Photo Tools'}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Explore our powerful features to perfect your images.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Smart Photo Studio. Powered by Generative AI.</p>
      </footer>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setLoginOpen(false)} 
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setSignupOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <Toast 
        show={showGuestToast} 
        onDismiss={() => setShowGuestToast(false)} 
        message="You are using guest mode. Sign up to save your work." 
      />
    </div>
  );
};

export default App;
