"use client";

import { useState, useEffect, useRef } from "react";

import Navbar from "@/components/Navbar";

import ChatHeader from "@/components/ChatHeader";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import ChatDate from "@/components/ChatDate";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getSocket } from "@/lib/socket";
import { apiGet } from "@/lib/api";
import { mapMessages } from "@/lib/mappers";
import { useAuth } from "@/context/AuthContext";

export default function ChatRoom() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const res = await apiGet("/chat/history");
        setChats(mapMessages(res.data));
      } catch (err) {
        console.error("Gagal memuat history chat:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleReceive = (newMsg) => {
      // Map manual karena payload dari socket belum tentu terpopulate penuh seperti REST API
      const safeMessage = typeof newMsg.isiPesan === 'string' ? newMsg.isiPesan : JSON.stringify(newMsg.isiPesan);
      const mappedMsg = {
        id: newMsg._id,
        sender: newMsg.pengirim,
        receiver: newMsg.penerima,
        message: safeMessage,
        time: newMsg.createdAt,
      };
      setChats((prev) => [...prev, mappedMsg]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleSend = (message) => {
    if (!message.trim()) return;

    const socket = getSocket();
    if (socket) {
      socket.emit("send_message", {
        penerima: null, // Kirim ke admin secara default
        pesan: message
      });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#F6F3EA]">
      {/* ───────── Header ───────── */}
      <ChatHeader />

      {/* ───────── Chat Area ───────── */}
      <div className="h-full overflow-y-auto px-4 pt-32 pb-72">
        {isLoading ? (
           <div className="flex justify-center mt-10">
              <LoadingSpinner size="md" />
           </div>
        ) : (
          <div className="flex flex-col gap-4">
            {chats.length === 0 ? (
              <p className="text-center font-signika text-[#777] mt-10">
                Belum ada pesan. Mulai obrolan sekarang!
              </p>
            ) : (
              chats.map((chat, index) => {
                let dateObj = new Date(chat.time);
                if (isNaN(dateObj.getTime())) {
                  dateObj = new Date(); // Fallback ke hari ini
                }
                const chatDate = dateObj.toISOString().split("T")[0];
                
                let prevDate = null;
                if (index > 0) {
                  let prevObj = new Date(chats[index - 1].time);
                  if (isNaN(prevObj.getTime())) prevObj = new Date();
                  prevDate = prevObj.toISOString().split("T")[0];
                }

                const showDate = index === 0 || prevDate !== chatDate;

                // Tentukan pengirim (apakah "user" atau "admin")
                // Kalau ID pengirim sama dengan user.id kita, maka itu kita (user).
                const isMe = user && chat.sender === user.id;

                return (
                  <div key={chat.id}>
                    {/* Date Separator */}
                    {showDate && <ChatDate date={chatDate} />}
                    
                    {/* Chat Bubble */}
                    <ChatBubble
                      sender={isMe ? "user" : "admin"}
                      message={chat.message}
                      time={dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    />
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ───────── Chat Input ───────── */}
      <ChatInput onSend={handleSend} />

      {/* ───────── Navbar ───────── */}
      <Navbar />
    </div>
  );
}