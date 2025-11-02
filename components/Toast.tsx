import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, show, onDismiss }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000); // Auto-dismiss after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [show, onDismiss]);

    if (!show) return null;

    return (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white py-3 px-5 rounded-lg shadow-lg z-50 animate-slide-in-up">
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button onClick={onDismiss} className="ml-4 text-gray-400 hover:text-white">&times;</button>
            </div>
            <style>{`
                @keyframes slide-in-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-in-up {
                    animation: slide-in-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
