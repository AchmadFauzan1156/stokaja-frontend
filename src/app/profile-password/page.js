"use client";

import { useState } from "react";

import { useRouter }
from "next/navigation";

import Button from "@/components/Button";
import TextBox from "@/components/TextBox";

export default function ProfilePasswordPage() {

  const router =
    useRouter();

  const [
    oldPassword,
    setOldPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const handleSave = () => {

    if (
      newPassword !==
      confirmPassword
    ) {

      alert(
        "Password tidak sama"
      );

      return;
    }

    console.log(
      "Update Password"
    );

    router.push(
      "/profile"
    );
  };

  return (
    <div
      className="
        min-h-screen

        bg-[#F0E7D6]

        px-5
        pt-14
      "
    >

      <h1
        className="
          font-squadaOne
          text-[36px]

          text-[#6E822E]
        "
      >
        Ubah Password
      </h1>

      <div
        className="
          mt-8

          flex
          flex-col
          gap-4
        "
      >

        <TextBox
          type="password"

          value={
            oldPassword
          }

          onChange={(e) =>
            setOldPassword(
              e.target.value
            )
          }

          placeholder="Password Lama"

          className="w-full"
        />

        <TextBox
          type="password"

          value={
            newPassword
          }

          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }

          placeholder="Password Baru"

          className="w-full"
        />

        <TextBox
          type="password"

          value={
            confirmPassword
          }

          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }

          placeholder="Konfirmasi Password"

          className="w-full"
        />

      </div>

      <div
        className="
          mt-10

          flex
          gap-4
        "
      >

        <Button
          text="Batal"

          variant="secondary"

          onClick={() =>
            router.back()
          }

          className="
            flex-1
            w-full
          "
        />

        <Button
          text="Simpan"

          onClick={
            handleSave
          }

          className="
            flex-1
            w-full
          "
        />

      </div>

    </div>
  );
}