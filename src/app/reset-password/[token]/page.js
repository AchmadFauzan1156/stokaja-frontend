"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { apiPost } from "@/lib/api";
import { useToast } from "@/components/Toast";

export default function NewPasswordPage({ params }) {
  // Gunakan React.use() untuk unwrap params (Next.js 15+ requirement)
  const resolvedParams = use(params);
  const token = resolvedParams.token;
  
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      showError("Harap isi semua kolom");
      return;
    }
    
    if (password !== confirmPassword) {
      showError("Password tidak cocok");
      return;
    }

    if (password.length < 6) {
      showError("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);
    try {
      await apiPost(`/reset-password/${token}`, { password });
      showSuccess("Password berhasil diubah. Silakan login.");
      router.push("/LoginPage");
    } catch (error) {
      showError(error.message || "Gagal mengubah password");
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
        Password Baru
      </h1>
      <p className="text-center font-signika text-[14.95px] text-[#575757] pb-6 font-semibold">
        Masukkan password baru Anda
      </p>

      <div className="w-full flex flex-col gap-4">
        <TextBox 
          placeholder="Password Baru" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <TextBox 
          placeholder="Konfirmasi Password Baru" 
          type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="mt-[100px] flex justify-center">
          <LoadingSpinner size="md" />
        </div>
      ) : (
        <Button
          text="Simpan Password"
          className="mt-[100px] leading-none"
          onClick={handleSubmit}
          disabled={!password || !confirmPassword}
        />
      )}
    </div>
  );
}
