
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-10 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-sky-600">
        Smart Photo Studio
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mt-4">
        Your one-stop AI-powered photo editing toolkit.
      </p>
    </header>
  );
};
