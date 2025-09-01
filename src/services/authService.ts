// Authentication service - handles all auth-related operations

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokenData {
  userId: string;
  username: string;
  exp: number;
}

// Storage keys
const STORAGE_KEYS = {
  USER: "user",
  TOKEN: "authToken",
} as const;

// Token utilities
export const generateMockToken = (userData: User): string => {
  return btoa(
    JSON.stringify({
      userId: userData.id,
      username: userData.username,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })
  );
};

export const parseToken = (token: string): AuthTokenData | null => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

export const isTokenValid = (token: string): boolean => {
  const tokenData = parseToken(token);
  if (!tokenData) return false;
  return Date.now() < tokenData.exp;
};

// Storage utilities
export const saveAuthData = (user: User, token: string): void => {
  if (typeof window === "undefined") return;
  
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const getStoredAuthData = (): { user: User; token: string } | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!storedUser || !storedToken) return null;

    const user = JSON.parse(storedUser);
    
    // Validate token
    if (!isTokenValid(storedToken)) {
      clearAuthData();
      return null;
    }

    return { user, token: storedToken };
  } catch (error) {
    console.error("Error parsing stored auth data:", error);
    clearAuthData();
    return null;
  }
};

export const clearAuthData = (): void => {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

// Auth operations
export const authenticateUser = async (
  credentials: LoginCredentials
): Promise<{ user: User; token: string }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Validate credentials
  if (!credentials.username.trim() || !credentials.password.trim()) {
    throw new Error("Username and password are required");
  }

  // For demo purposes, accept any non-empty credentials
  // In a real app, this would make an API call
  const userData: User = {
    id: `user_${Date.now()}`,
    username: credentials.username.trim(),
    email: `${credentials.username.trim().toLowerCase()}@example.com`,
  };

  const token = generateMockToken(userData);
  
  // Save to storage
  saveAuthData(userData, token);

  return { user: userData, token };
};

export const refreshAuthToken = async (currentToken: string): Promise<string> => {
  const tokenData = parseToken(currentToken);
  if (!tokenData) {
    throw new Error("Invalid token");
  }

  // In a real app, this would make an API call to refresh the token
  const newTokenData: AuthTokenData = {
    ...tokenData,
    exp: Date.now() + 24 * 60 * 60 * 1000, // Extend by 24 hours
  };

  const newToken = btoa(JSON.stringify(newTokenData));
  localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
  
  return newToken;
};

export const logout = (): void => {
  clearAuthData();
};

// Helper to check if user is currently authenticated
export const isAuthenticated = (): boolean => {
  const authData = getStoredAuthData();
  return authData !== null;
};