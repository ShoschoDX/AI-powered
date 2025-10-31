
import React from 'react';
import { Header } from './components/Header';
import { ToolCard } from './components/ToolCard';
import { TOOLS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 to-white text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Smart Photo Studio. Powered by Generative AI.</p>
      </footer>
    </div>
  );
};

export default App;
