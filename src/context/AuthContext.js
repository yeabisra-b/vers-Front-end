import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Stores user info and role
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    setUser(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ username: decoded.upn, role: decoded.role });
      } catch (err) {
        console.error("Invalid token", err);
        logout(); // Clear invalid token
      }
    }
  }, [logout]); // Added logout as a dependency

  const login = (token) => {
    localStorage.setItem("jwt", token);
    const decoded = jwtDecode(token);
    setUser({ username: decoded.upn, role: decoded.role });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
