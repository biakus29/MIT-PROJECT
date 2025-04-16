
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'DIRECTOR' | 'SECRETARY' | 'TEACHER';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'directeur@ecole.com',
    password: 'password123',
    role: 'DIRECTOR' as UserRole,
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Claire',
    email: 'secretaire@ecole.com',
    password: 'password123',
    role: 'SECRETARY' as UserRole,
  },
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'professeur@ecole.com',
    password: 'password123',
    role: 'TEACHER' as UserRole,
  },
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for saved authentication on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real application, this would be an API call
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Save to state and local storage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      // Redirect based on role
      switch (foundUser.role) {
        case 'DIRECTOR':
          navigate('/director/dashboard');
          break;
        case 'SECRETARY':
          navigate('/secretary/dashboard');
          break;
        case 'TEACHER':
          navigate('/teacher/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
