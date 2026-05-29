"use client";

import { useState } from "react";

import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import Link from "next/link";

export default function RegisterPage() {

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
      <Button
        text="Sign Up"

        className="
          mt-36
          leading-none
        "

        disabled={!formValid}
      />

    </div>
  );
}