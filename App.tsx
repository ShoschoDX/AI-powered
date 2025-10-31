
import React from 'react';
import { Header } from './components/Header';
import { ToolCard } from './components/ToolCard';
import { QualityEnhancer } from './components/QualityEnhancer';
import { TOOLS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 to-white dark:from-slate-900 dark:to-sky-950 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <QualityEnhancer />

        <div className="my-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">More AI Photo Tools</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Explore other powerful features to perfect your images.</p>
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
    </div>
  );
};

export default App;