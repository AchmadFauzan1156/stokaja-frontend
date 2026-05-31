import { io } from "socket.io-client";
import { getAccessToken } from "@/lib/api";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5001";

let socket = null;

/**
 * Dapatkan / buat koneksi Socket.io
 * Token akan dikirim saat handshake untuk autentikasi
 */
export function getSocket() {
  if (socket && socket.connected) return socket;

  const token = getAccessToken();
  if (!token) return null;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  });

  socket.on("connect", () => {
    console.log("📡 Socket.io connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket.io connection error:", err.message);
  });

  return socket;
}

/**
 * Putuskan koneksi socket (untuk logout)
 */
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
