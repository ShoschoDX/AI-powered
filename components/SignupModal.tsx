import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useAuth } from '../contexts/AuthContext';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (fullName.length < 3 || fullName.length > 50) {
        setError("Full Name must be between 3 and 50 characters.");
        return;
    }
    if (nickname.length < 2 || nickname.length > 30) {
        setError("Nickname must be between 2 and 30 characters.");
        return;
    }
    if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await signup(fullName, nickname, email, password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div>
          <label htmlFor="fullName-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            id="fullName-signup"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Enter your real name"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="nickname-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nickname</label>
          <input
            type="text"
            id="nickname-signup"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            placeholder="Enter your display name"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            id="email-signup"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            id="password-signup"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password (min. 8 characters)"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="confirm-password-signup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input
            type="password"
            id="confirm-password-signup"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Re-enter your password"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-gray-800 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Sign Up'}
        </Button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button type="button" onClick={onSwitchToLogin} className="font-medium text-sky-600 hover:text-sky-500">
                Log in
            </button>
        </p>
      </form>
    </Modal>
  );
};
