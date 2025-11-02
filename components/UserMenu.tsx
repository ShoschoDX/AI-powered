import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const UserMenu: React.FC = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="sr-only">Open user menu</span>
                <UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    Welcome, {user.nickname}!
                </span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20">
                    <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-600 space-y-2">
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-gray-50">Full Name:</p>
                            <p className="truncate" title={user.fullName}>{user.fullName}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-gray-900 dark:text-gray-50">Nickname:</p>
                            <p className="truncate" title={user.nickname}>{user.nickname}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-gray-900 dark:text-gray-50">Email:</p>
                            <p className="truncate" title={user.email}>{user.email}</p>
                        </div>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile Settings</a>
                    <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};
