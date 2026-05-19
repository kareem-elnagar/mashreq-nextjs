import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Role = "admin" | "viewer";

export interface AuthUser {
  username: string;
  role: Role;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const CREDENTIALS: { username: string; password: string; role: Role }[] = [
  { username: "MASHREQADMIN", password: "MASHREQ123", role: "admin" },
  { username: "Mashreq",      password: "mashreq123", role: "viewer" },
];

const SESSION_KEY = "mashreq_admin_user";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  function login(username: string, password: string): boolean {
    const match = CREDENTIALS.find(
      (c) => c.username === username && c.password === password
    );
    if (!match) return false;
    const u: AuthUser = { username: match.username, role: match.role };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return true;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
