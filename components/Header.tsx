
import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './Button';
import { UserMenu } from './UserMenu';

interface HeaderProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignupClick }) => {
  const { isLoggedIn, isLoading } = useAuth();

  return (
    <header className="relative text-center py-10 md:py-16">
      <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2">
        <ThemeSwitcher />
        {!isLoading && (
            <div className="flex items-center gap-2">
                {isLoggedIn ? (
                    <UserMenu />
                ) : (
                    <>
                        <Button variant="secondary" onClick={onLoginClick} className="hidden md:inline-flex">Login</Button>
                        <Button onClick={onSignupClick}>Sign Up</Button>
                    </>
                )}
            </div>
        )}
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-sky-600 dark:text-sky-400">
        Smart Photo Studio
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-4">
        Your one-stop AI-powered photo editing toolkit.
      </p>
    </header>
  );
};
