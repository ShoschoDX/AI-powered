import React, { useState } from 'react';
import { Button } from './Button';

interface UpgradeBannerProps {
    onSignupClick: () => void;
}

export const UpgradeBanner: React.FC<UpgradeBannerProps> = ({ onSignupClick }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-sky-100 dark:bg-sky-900/50 border border-sky-200 dark:border-sky-800 rounded-lg p-6 my-12 text-center relative">
            <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 text-sky-600 dark:text-sky-300 hover:text-sky-800 dark:hover:text-sky-100"
                aria-label="Dismiss"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-2xl font-bold text-sky-800 dark:text-sky-200">Unlock More Features!</h3>
            <p className="text-sky-700 dark:text-sky-300 mt-2 mb-4">Sign up for a free account to save your edit history and access more powerful tools.</p>
            <Button onClick={onSignupClick}>Create Free Account</Button>
        </div>
    );
};
