"use client";

import { useState } from "react";

import { useRouter }
from "next/navigation";

import { useAuth }
from "@/context/AuthContext";

import { useToast }
from "@/components/Toast";

import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RegisterPage() {

  const router = useRouter();
  const { register } = useAuth();
  const { showSuccess, showError } = useToast();

  const [email, setEmail] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  const passwordValid =
    password.length >= 8;

  const passwordsMatch =
    password === confirmPassword;

  const formValid =
    emailValid &&
    fullName.trim() !== "" &&
    passwordValid &&
    passwordsMatch &&
    confirmPassword !== "";

  const handleRegister = async () => {

    if (!formValid || isLoading) return;

    setIsLoading(true);

    try {
      await register(email, password, fullName);

      showSuccess("Registrasi berhasil! Selamat datang 🎉");

      router.push("/home");
    } catch (error) {
      showError(
        error.message || "Registrasi gagal, silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        items-center
        justify-center

        bg-[#F0E7D6]

        px-8
      "
    >

      {/* Login Link */}
      <div
        className="
          flex
          w-full
          justify-end
        "
      >

        <Link
          href="/LoginPage"
          className="
            font-squadaOne
            text-[21.526px]

            text-[#FF5E33]
            underline
          "
        >
          Log In
        </Link>

      </div>

      {/* Title */}
      <h1
        className="
          pb-16

          text-[43.593px]
          leading-none

          text-[#6E822E]
        "
      >
        Sign Up
      </h1>

      {/* Form */}
      <div
        className="
          flex
          w-full
          max-w-md
          flex-col
          gap-4
        "
      >

        <TextBox
          placeholder="E-Mail"
          type="email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <TextBox
          placeholder="Nama Lengkap"
          type="text"

          value={fullName}

          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
        />

        <TextBox
          placeholder="Password"
          type="password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <TextBox
          placeholder="Konfirmasi Password"
          type="password"

          value={confirmPassword}

          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        {/* Validation Messages */}

        {email &&
          !emailValid && (
            <p
              className="
                font-signika
                text-sm

                text-red-500
              "
            >
              Format email tidak valid
            </p>
          )}

        {password &&
          !passwordValid && (
            <p
              className="
                font-signika
                text-sm

                text-red-500
              "
            >
              Password minimal 8 karakter
            </p>
          )}

        {confirmPassword &&
          !passwordsMatch && (
            <p
              className="
                font-signika
                text-sm

                text-red-500
              "
            >
              Password tidak sama
            </p>
          )}

      </div>

      {/* Register Button */}
      {isLoading ? (
        <div className="mt-36">
          <LoadingSpinner size="md" />
        </div>
      ) : (
        <Button
          text="Sign Up"

          onClick={handleRegister}

          className="
            mt-36
            leading-none
          "

          disabled={!formValid}
        />
      )}

    </div>
  );
}