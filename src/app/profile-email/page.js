"use client";

import { useState } from "react";

import { useRouter }
from "next/navigation";

import Button from "@/components/Button";
import TextBox from "@/components/TextBox";

export default function ProfileEmailPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const handleSave = () => {

    console.log(
      "Update Email",
      email
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
        Ubah Email
      </h1>

      <div className="mt-8">

        <TextBox
          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          placeholder="Masukkan Email Baru"

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