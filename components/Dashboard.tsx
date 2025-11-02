import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from '../contexts/HistoryContext';
import { ImageComparisonSlider } from './ImageComparisonSlider';

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { history } = useHistory();

    if (!user) return null;

    return (
        <section className="my-8">
            <div className="text-center mb-8">
                 <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome back!</h2>
                 <p className="text-gray-600 dark:text-gray-400 mt-2">Here are your recent edits from this session.</p>
            </div>

            {history.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {history.map(item => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-transparent dark:border-gray-700">
                           <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-200">{item.toolTitle}</h3>
                           <div className="rounded-lg overflow-hidden">
                                <ImageComparisonSlider before={item.originalImageUrl} after={item.processedImageUrl} />
                           </div>
                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">{new Date(item.timestamp).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400">You haven't edited any images yet. Your saved edits will appear here!</p>
                </div>
            )}
        </section>
    );
};