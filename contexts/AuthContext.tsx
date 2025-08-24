import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import { AuthContextType, AuthState, loginSchema, signupSchema, StoredUser } from "../types/auth";

// --------- Provider Props ---------
interface AuthProviderProps {
  children: ReactNode;
}

// --------- Storage Keys ---------
const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'auth_token',
  USERS: 'users', // Store all registered users
} as const;

// --------- Context ---------
const AuthContext = createContext<AuthContextType | undefined>(undefined) as React.Context<AuthContextType>;

// --------- Provider ---------
export const AuthProvider = ({ children }: AuthProviderProps): React.JSX.Element => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const [error, setError] = useState<string | null>(null);

  // Load user from storage on app start
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
        ]);

        if (storedUser && storedToken) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (err) {
        console.error('Error loading user from storage:', err);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUserFromStorage();
  }, []);

  const clearAuthError = () => setError(null);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Validate input with Zod
      const validatedData = loginSchema.parse({ email, password });

      // Get stored users
      const storedUsers = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Find user by email and password
      const user = users.find((u: StoredUser) => u.email === validatedData.email && u.password === validatedData.password);
      
      if (user) {
        // Remove password before setting user state
        const { password, ...userWithoutPassword } = user;
        
        // Generate a new token for this session
        const token = `token_${Date.now()}_${Math.random().toString(36).substr(36, 9)}`;

        // Store current user and token
        await Promise.all([
          AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userWithoutPassword)),
          AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
        ]);

        setAuthState({
          user: userWithoutPassword,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle Zod validation errors
        const errorMessage = err.issues.map((e: z.ZodIssue) => e.message).join(", ");
        setError(errorMessage);
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Login failed';
        setError(errorMessage);
      }
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw err;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Validate input with Zod
      const validatedData = signupSchema.parse({ name, email, password });

      // Check if user already exists
      const storedUsers = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      if (users.find((u: StoredUser) => u.email === validatedData.email)) {
        throw new Error("User with this email already exists");
      }

      // Create new user with credentials
      const newUser: StoredUser = {
        id: Date.now().toString(),
        name: validatedData.name,
        email: validatedData.email,
        createdAt: new Date().toISOString(),
        password: validatedData.password,
      };

      // Add to users list and store
      const updatedUsers = [...users, newUser];
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

      // Generate a token and log in the new user
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(36, 9)}`;

      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser)),
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token),
      ]);

      setAuthState({
        user: newUser,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle Zod validation errors
        const errorMessage = err.issues.map((e: z.ZodIssue) => e.message).join(", ");
        setError(errorMessage);
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Signup failed';
        setError(errorMessage);
      }
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw err;
    }
  };

  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Clear storage
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
      ]);

      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      setError(null);
    } catch (err) {
      console.error('Error during logout:', err);
      // Even if storage clearing fails, reset the state
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState, 
        login, 
        signup, 
        logout, 
        error,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// --------- Hook ---------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
