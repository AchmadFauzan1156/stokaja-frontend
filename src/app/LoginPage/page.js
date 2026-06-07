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

export default function LoginPage() {

  const router =
    useRouter();

  const { login } = useAuth();
  const { showError } = useToast();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const [
    showErrorModal,
    setShowErrorModal,
  ] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  const formValid =
    emailValid &&
    password.trim() !== "";

  const handleLogin = async () => {

    if (!formValid || isLoading) return;

    setIsLoading(true);

    try {
      const user = await login(email, password);

      // Redirect berdasarkan role
      if (user.role === "admin" || user.role === "kasir") {
        router.push("/home");
      } else {
        router.push("/home");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Email atau password salah."
      );
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Error Modal */}
      {showErrorModal && (

        <div
          className="
            fixed
            inset-0
            z-50

            flex
            items-center
            justify-center

            bg-black/40
          "
        >

          <div
            className="
              w-80

              rounded-3xl

              bg-white

              p-6
            "
          >

            <h2
              className="
                font-squada
                text-[28px]

                text-[#FF5C2B]
              "
            >
              Login Gagal
            </h2>

            <p
              className="
                mt-3

                font-signika
                text-[18px]

                text-[#555]
              "
            >
              {errorMessage}
            </p>

            <div
              className="
                mt-6

                flex
                justify-center
              "
            >

              <Button
                text="OK"

                onClick={() =>
                  setShowErrorModal(
                    false
                  )
                }
              />

            </div>

          </div>

        </div>

      )}

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

        {/* Sign Up Link */}
        <div
          className="
            flex
            w-full
            justify-end
          "
        >

          <Link
            href="/RegisterPage"
            className="
              font-squada
              text-[21.526px]

              text-[#FF5E33]
              underline
            "
          >
            Sign Up
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
          Log In
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
            placeholder="Password"
            type="password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {/* Validation */}
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

          {/* Forgot Password */}
          <div
            className="
              flex
              justify-center
            "
          >

            <Link
              href="/ResetPassword"
              className="
                font-signika
                text-[16.449px]
                font-semibold

                text-[#FF5E33]
                underline
              "
            >
              Lupa Password?
            </Link>

          </div>

        </div>

        {/* Login Button */}
        {isLoading ? (
          <div className="mt-77.5">
            <LoadingSpinner size="md" />
          </div>
        ) : (
          <Button
            text="Log In"

            onClick={
              handleLogin
            }

            disabled={!formValid}

            className="
              mt-77.5

              leading-none
            "
          />
        )}

      </div>
    </>
  );
}
