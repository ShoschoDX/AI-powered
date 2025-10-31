
import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header: React.FC = () => {
  return (
    <header className="relative text-center py-10 md:py-16">
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <ThemeSwitcher />
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
