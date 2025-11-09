/**
 * Authentication Context
 * Uses Lit Context API to provide auth state across components
 */

import { createContext } from '@lit/context';
import type { User } from '../services/auth-service';

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
}

export const authContext = createContext<AuthContext>('auth-context');
