"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function AutoLogout() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const timerRef = useRef(null);

  // 2 jam dalam milidetik (2 * 60 * 60 * 1000)
  const IDLE_TIMEOUT = 7200000; 

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Hanya jalankan perhitungan idle jika user dalam keadaan login
    if (user) {
      timerRef.current = setTimeout(() => {
        handleIdleLogout();
      }, IDLE_TIMEOUT);
    }
  };

  const handleIdleLogout = async () => {
    try {
      if (user) {
        console.log("Sesi berakhir karena tidak ada aktivitas selama 2 jam. Melakukan auto-logout...");
        await logout();
        // Redirect ke halaman login otomatis akan ditangani oleh AuthGuard di AuthContext 
        // karena state 'user' berubah menjadi null.
      }
    } catch (err) {
      console.error("Auto logout failed", err);
    }
  };

  useEffect(() => {
    // Event listener untuk mendeteksi pergerakan atau ketikan pengguna
    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
    
    const handleActivity = () => {
      resetTimer();
    };

    if (user) {
      resetTimer(); // Inisialisasi timer saat komponen dimuat atau user login
      events.forEach((event) => {
        window.addEventListener(event, handleActivity, { passive: true });
      });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [user, pathname]);

  return null; // Komponen ini berjalan di latar belakang (tidak berwujud visual)
}
