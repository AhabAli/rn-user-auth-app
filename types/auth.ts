import { z } from "zod";

// --------- Auth Types ---------
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// User with password for storage (password is not exposed in the main User interface)
export interface StoredUser extends User {
  password: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
  error: string | null;
}

// --------- Validation Schemas ---------
export const loginSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.email({ message: "Invalid email format" }).toLowerCase().trim(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
