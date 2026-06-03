"use client";

import { useState } from "react";
import Link from "next/link";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { apiPost } from "@/lib/api";
import { useToast } from "@/components/Toast";

export default function ForgotPasswordPage() {
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      showError("Harap masukkan email Anda");
      return;
    }

    setIsLoading(true);
    try {
      await apiPost("/forgot-password", { email });
      showSuccess("Link reset password telah dikirim ke email Anda");
      setEmail("");
    } catch (error) {
      showError(error.message || "Gagal mengirim link reset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F0E7D6] px-8">
      <div className="flex w-full justify-end">
        <Link
          href="/LoginPage"
          className="text-[21.526px] text-[#FF5E33] underline font-squadaOne pb-10"
        >
          Log In
        </Link>
      </div>

      <h1 className="pb-2 text-[43.593px] leading-none font-normal text-[#6E822E]">
        Reset Password
      </h1>
      <p className="text-center font-signika text-[14.95px] text-[#575757] pb-2 font-semibold">
        Masukkan E-mail Anda untuk mendapatkan link Reset Password
      </p>

      <TextBox 
        placeholder="E-Mail" 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {isLoading ? (
        <div className="mt-[200px] flex justify-center">
          <LoadingSpinner size="md" />
        </div>
      ) : (
        <Button
          text="Get Link"
          className="mt-[200px] leading-none"
          onClick={handleSubmit}
          disabled={!email.trim()}
        />
      )}
    </div>
  );
}