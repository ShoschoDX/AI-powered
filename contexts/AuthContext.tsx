import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { useHistory } from './HistoryContext';

// Interfaces
interface User {
  fullName: string;
  nickname: string;
  email: string;
}

// Mock User for storage (with password)
interface StoredUser extends User {
    password_hash: string; // just storing plain text for this simulation
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  signup: (fullName: string, nickname: string, email: string, pass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { clearHistory } = useHistory();
  
  const USERS_DB_KEY = 'smart-photo-studio-users-db';
  const CURRENT_USER_KEY = 'smart-photo-studio-user';


  useEffect(() => {
    // Simulate checking for a session token on component mount
    try {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem(CURRENT_USER_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMockDb = (): StoredUser[] => {
      try {
          const db = localStorage.getItem(USERS_DB_KEY);
          return db ? JSON.parse(db) : [];
      } catch (e) {
          return [];
      }
  };

  const saveMockDb = (db: StoredUser[]) => {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
  };


  const login = useCallback(async (email: string, pass: string): Promise<void> => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const db = getMockDb();
    const foundUser = db.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser && foundUser.password_hash === pass) { // Dummy password check
      const userData: User = { email: foundUser.email, fullName: foundUser.fullName, nickname: foundUser.nickname };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
      setUser(userData);
    } else {
      throw new Error("Invalid credentials");
    }
  }, []);

  const signup = useCallback(async (fullName: string, nickname: string, email: string, pass: string): Promise<void> => {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const db = getMockDb();

      const emailExists = db.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
          throw new Error("An account with this email already exists.");
      }
      
      const nicknameExists = db.some(u => u.nickname.toLowerCase() === nickname.toLowerCase());
      if (nicknameExists) {
          throw new Error("This nickname is already taken. Please choose another.");
      }
      
      const newUser: StoredUser = {
          fullName,
          nickname,
          email,
          password_hash: pass // Storing plain text for simulation
      };
      
      db.push(newUser);
      saveMockDb(db);

      const userData: User = { email: newUser.email, fullName: newUser.fullName, nickname: newUser.nickname };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
      setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    clearHistory();
    setUser(null);
  }, [clearHistory]);

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};