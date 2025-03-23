
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/lib/api';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName?: string;
  isAgency: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load user data if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Error loading user:', err);
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authAPI.login(email, password);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Logged in successfully!",
        duration: 3000,
      });
      navigate('/settings');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      toast({
        title: "Error",
        description: err.response?.data?.message || 'Login failed',
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authAPI.register(userData);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Registered successfully!",
        duration: 3000,
      });
      navigate('/settings');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      toast({
        title: "Error",
        description: err.response?.data?.message || 'Registration failed',
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
