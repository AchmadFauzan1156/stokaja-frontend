"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  apiPost,
  apiGet,
  setTokens,
  clearTokens,
  getAccessToken,
} from "@/lib/api";

import { mapUser } from "@/lib/mappers";
import { disconnectSocket } from "@/lib/socket";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiGet("/users/profil");
      setUser(mapUser(res.data));
    } catch (error) {
      if (error && (error.status === 401 || error.status === 403)) {
        clearTokens();
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // --- AUTH GUARD ROUTING ---
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/", "/LoginPage", "/RegisterPage", "/SplashScreen", "/ResetPassword"];
      const isPublicRoute = publicRoutes.includes(pathname) || pathname.toLowerCase().startsWith("/reset-password");

      if (!user && !isPublicRoute) {
        // Jika belum login tapi akses halaman private, tendang ke login
        router.replace("/LoginPage");
      } else if (user && (pathname === "/LoginPage" || pathname === "/RegisterPage" || pathname === "/" || pathname === "/SplashScreen")) {
        // Jika sudah login tapi akses halaman login/register/splash, arahkan ke home
        router.replace("/home");
      }
    }
  }, [user, isLoading, pathname, router]);

  // --- LOGIN ---
  const login = async (email, password) => {
    const res = await apiPost("/login", { email, password });

    if (res.success && res.data) {
      setTokens(res.data.accessToken, res.data.refreshToken);

      const userData = await refreshProfile();
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    }

    throw new Error(res.pesan || "Login gagal");
  };

  // --- REGISTER ---
  const register = async (email, password, namaLengkap) => {
    const res = await apiPost("/register", { email, password, namaLengkap });

    if (res.success && res.data) {
      setTokens(res.data.accessToken, res.data.refreshToken);

      const userData = await refreshProfile();
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    }

    throw new Error(res.pesan || "Registrasi gagal");
  };

  // --- LOGOUT ---
  const logout = async () => {
    try {
      await apiPost("/logout", {});
    } catch {
      // Tetap lanjut logout meskipun API error
    }
    disconnectSocket(); // Putuskan koneksi Socket.io
    clearTokens();
    setUser(null);
  };

  // --- REFRESH PROFIL ---
  const refreshProfile = async () => {
    try {
      const res = await apiGet("/users/profil");
      const mapped = mapUser(res.data);
      setUser(mapped);
      return mapped;
    } catch {
      return null;
    }
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";
  const isKasir = user?.role === "kasir";

  const publicRoutes = ["/", "/LoginPage", "/RegisterPage", "/SplashScreen", "/ResetPassword"];
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.toLowerCase().startsWith("/reset-password");

  const shouldBlockRender = isLoading || (!user && !isPublicRoute);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn,
        isAdmin,
        isKasir,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {shouldBlockRender ? (
        <div style={{ minHeight: "100vh", backgroundColor: "#F0E7D6" }}></div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
}
