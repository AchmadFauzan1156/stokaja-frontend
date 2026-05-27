"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";

import ChatHeader from "@/components/ChatHeader";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";

import { dummyChats }
from "@/data/dummyChats";

export default function ChatRoom() {

  const [chats, setChats] =
    useState(dummyChats);

  /* ───────── Send Message ───────── */

  const handleSend = (
    message
  ) => {

    const newChat = {
      id: Date.now(),

      sender: "user",

      message,

      time: new Date()
        .toLocaleTimeString(
          "id-ID",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
    };

    setChats((prev) => [
      ...prev,
      newChat,
    ]);
  };

  return (
    <div
      className="
        h-screen
        overflow-hidden

        bg-[#F6F3EA]
      "
    >

      {/* ───────── Header ───────── */}
      <ChatHeader />

      {/* ───────── Chat Area ───────── */}
      <div
        className="
          h-full
          overflow-y-auto

          px-4

          pt-32
          pb-72
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4
          "
        >

          {chats.map((chat) => (

            <ChatBubble
              key={chat.id}

              sender={chat.sender}

              message={chat.message}

              time={chat.time}
            />

          ))}

        </div>

      </div>

      {/* ───────── Chat Input ───────── */}
      <ChatInput
        onSend={handleSend}
      />

      {/* ───────── Navbar ───────── */}
      <Navbar />

    </div>
  );
}