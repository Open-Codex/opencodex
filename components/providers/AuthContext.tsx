"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface AuthUser {
  userId: string;
  email: string;
  systemRole: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function decodeJwtPayload(token: string): AuthUser | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Check expiry
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return {
      userId: payload.sub,
      email: payload.email,
      systemRole: payload.systemRole ?? "USER",
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("oct_token");
    if (stored) {
      const decoded = decodeJwtPayload(stored);
      if (decoded) {
        setToken(stored);
        setUser(decoded);
      } else {
        localStorage.removeItem("oct_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((newToken: string) => {
    localStorage.setItem("oct_token", newToken);
    setToken(newToken);
    setUser(decodeJwtPayload(newToken));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("oct_token");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
