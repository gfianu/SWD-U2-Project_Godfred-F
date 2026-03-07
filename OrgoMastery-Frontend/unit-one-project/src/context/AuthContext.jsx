import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchCurrentUser, loginUser, registerUser } from "../api/authApi";

const AuthContext = createContext(null);

const TOKEN_KEY = "orgomastery_token";
const USER_KEY = "orgomastery_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMe() {
      if (!token) return;

      try {
        setLoading(true);
        const me = await fetchCurrentUser(token);
        setUser(me);
        localStorage.setItem(USER_KEY, JSON.stringify(me));
      } catch (err) {
        console.error("Auth restore failed:", err.message);
        logout();
      } finally {
        setLoading(false);
      }
    }

    loadMe();
  }, [token]);

  async function register(payload) {
    const data = await registerUser(payload);

    const normalizedUser = {
      id: data.userId,
      username: data.username,
      email: data.email,
      role: data.role,
    };

    setToken(data.token);
    setUser(normalizedUser);

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));

    return data;
  }

  async function login(payload) {
    const data = await loginUser(payload);

    const normalizedUser = {
      id: data.userId,
      username: data.username,
      email: data.email,
      role: data.role,
    };

    setToken(data.token);
    setUser(normalizedUser);

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser));

    return data;
  }

  function logout() {
    setToken("");
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: !!token,
      isInstructor: user?.role === "INSTRUCTOR",
      isStudent: user?.role === "STUDENT",
      register,
      login,
      logout,
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}