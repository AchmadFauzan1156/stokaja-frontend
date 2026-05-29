"use client";

import { useState } from "react";

import { useRouter }
from "next/navigation";

import Button from "@/components/Button";
import TextBox from "@/components/TextBox";

export default function AddressEditPage() {

  const router =
    useRouter();

  const [label, setLabel] =
    useState("");

  const [address, setAddress] =
    useState("");

  const handleSave = () => {

    console.log({
      label,
      address,
    });

    router.push(
      "/profile-address"
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
        Alamat
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
          placeholder="Label Alamat"

          value={label}

          onChange={(e) =>
            setLabel(
              e.target.value
            )
          }
        />

        <TextBox
          multiline

          placeholder="Alamat Lengkap"

          value={address}

          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }

          className="
            h-40
          "
        />

      </div>

      <div
        className="
          mt-8

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