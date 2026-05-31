"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if logged in on mount
    const loggedInUser = localStorage.getItem("budgetmitra_session");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = async (email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const usersStr = localStorage.getItem("budgetmitra_users");
        const users = usersStr ? JSON.parse(usersStr) : {};
        
        if (!users[email]) {
          return reject(new Error("Account not found. Please sign up."));
        }
        
        if (users[email].password !== pass) {
          return reject(new Error("Invalid password."));
        }
        
        const userData = { name: users[email].name, email };
        localStorage.setItem("budgetmitra_session", JSON.stringify(userData));
        setUser(userData);
        resolve();
      }, 800);
    });
  };

  const register = async (name: string, email: string, pass: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const usersStr = localStorage.getItem("budgetmitra_users");
        const users = usersStr ? JSON.parse(usersStr) : {};
        
        if (users[email]) {
          return reject(new Error("Email is already registered."));
        }
        
        users[email] = { name, password: pass };
        localStorage.setItem("budgetmitra_users", JSON.stringify(users));
        
        const userData = { name, email };
        localStorage.setItem("budgetmitra_session", JSON.stringify(userData));
        setUser(userData);
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem("budgetmitra_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
