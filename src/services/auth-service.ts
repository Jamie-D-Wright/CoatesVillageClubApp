/**
 * Authentication Service
 * Manages JWT tokens in localStorage, user authentication state, and role-based access
 */

export enum UserRole {
  Member = 'Member',
  Volunteer = 'Volunteer',
  Committee = 'Committee',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const TOKEN_KEY = 'club_auth_token';

class AuthService {
  /**
   * Authenticate user with email and password
   * TODO: Replace mock implementation with actual API call
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock implementation - replace with actual API call
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    // Mock successful login with different roles based on email
    let role = UserRole.Member;
    if (credentials.email.includes('committee')) {
      role = UserRole.Committee;
    } else if (credentials.email.includes('volunteer')) {
      role = UserRole.Volunteer;
    }

    const mockUser: User = {
      id: '123',
      email: credentials.email,
      firstName: 'Test',
      lastName: 'User',
      role,
    };

    // Create a simple JWT-like token (mock)
    const mockToken = btoa(JSON.stringify({
      user: mockUser,
      exp: Date.now() + 3600000, // 1 hour
    }));

    // Store token in localStorage
    localStorage.setItem(TOKEN_KEY, mockToken);

    return {
      token: mockToken,
      user: mockUser,
    };
  }

  /**
   * Logout current user and clear token
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: null } }));
  }

  /**
   * Get current authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = this.decodeToken(token);
      // Check if token is expired
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  }

  /**
   * Get current user from token
   */
  getCurrentUser(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = this.decodeToken(token);
      if (decoded.exp <= Date.now()) {
        // Token expired, clear it
        this.logout();
        return null;
      }
      return decoded.user;
    } catch {
      return null;
    }
  }

  /**
   * Get current user's role
   */
  getRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user?.role ?? null;
  }

  /**
   * Check if current user has a specific role
   */
  hasRole(role: UserRole): boolean {
    return this.getRole() === role;
  }

  /**
   * Check if current user is Committee member
   */
  isCommittee(): boolean {
    return this.hasRole(UserRole.Committee);
  }

  /**
   * Check if current user is Volunteer or higher
   */
  isVolunteerOrHigher(): boolean {
    const role = this.getRole();
    return role === UserRole.Volunteer || role === UserRole.Committee;
  }

  /**
   * Decode JWT token (mock implementation)
   * TODO: Replace with proper JWT library when using real tokens
   */
  private decodeToken(token: string): { user: User; exp: number } {
    return JSON.parse(atob(token));
  }
}

// Export singleton instance
export const authService = new AuthService();
