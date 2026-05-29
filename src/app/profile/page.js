"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";

export default function ProfilePage() {

  const [username, setUsername] =
    useState("Wawa");

  const [email] =
    useState("wawa@gmail.com");

  const [profileImage, setProfileImage] =
    useState("/Profile.png");

  const handleImageChange = (
    event
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setProfileImage(imageUrl);
  };

  const handleSave = () => {

    console.log(
      "Update Profile"
    );
  };

  const handleLogout = () => {

    console.log("Logout");
  };

  return (
    <div
      className="
        min-h-screen

        bg-[#F0E7D6]

        pb-48
      "
    >

      {/* Header */}
      <div
        className="
          px-6
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
          Profil
        </h1>

      </div>

      {/* Profile Picture */}
      <div
        className="
          mt-8

          flex
          flex-col
          items-center
        "
      >

        <Image
          src={profileImage}
          alt="Profile"

          width={140}
          height={140}

          className="
            h-35
            w-35

            rounded-full

            border-4
            border-[#B6D04E]

            object-cover
          "
        />

        <label
          className="
            mt-4

            cursor-pointer

            font-signika
            text-[18px]

            text-[#6E822E]
          "
        >
          Ganti Foto

          <input
            type="file"

            accept="image/*"

            onChange={
              handleImageChange
            }

            className="hidden"
          />

        </label>

      </div>

      {/* Username */}
      <div
        className="
          mt-10
          px-5
        "
      >

        <p
          className="
            mb-2

            font-signika
            text-[18px]

            text-[#666]
          "
        >
          Username
        </p>

        <TextBox
          value={username}

          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }

          className="w-full"
        />

      </div>

      {/* Settings */}
      <div
        className="
          mt-8
          px-5
        "
      >

        {/* Email */}
        <Link href="/profile-email">

          <div
            className="
              cursor-pointer

              border-b-2
              border-[#D4D4D4]

              py-4
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    font-signika
                    text-[18px]

                    text-[#666]
                  "
                >
                  Email
                </p>

                <p
                  className="
                    mt-1

                    font-signika
                    text-[20px]

                    text-[#444]
                  "
                >
                  {email}
                </p>

              </div>

              <span
                className="
                  text-[26px]

                  text-[#6E822E]
                "
              >
                ›
              </span>

            </div>

          </div>

        </Link>

        {/* Password */}
        <Link href="/profile-password">

          <div
            className="
              cursor-pointer

              border-b-2
              border-[#D4D4D4]

              py-4
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    font-signika
                    text-[18px]

                    text-[#666]
                  "
                >
                  Password
                </p>

                <p
                  className="
                    mt-1

                    font-signika
                    text-[20px]

                    tracking-widest

                    text-[#444]
                  "
                >
                  ••••••••
                </p>

              </div>

              <span
                className="
                  text-[26px]

                  text-[#6E822E]
                "
              >
                ›
              </span>

            </div>

          </div>

        </Link>

        {/* Address */}
        <Link href="/profile-address">

          <div
            className="
              cursor-pointer

              border-b-2
              border-[#D4D4D4]

              py-4
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    font-signika
                    text-[18px]

                    text-[#666]
                  "
                >
                  Alamat
                </p>

                <p
                  className="
                    mt-1

                    font-signika
                    text-[20px]

                    text-[#444]
                  "
                >
                  Kelola Alamat
                </p>

              </div>

              <span
                className="
                  text-[26px]

                  text-[#6E822E]
                "
              >
                ›
              </span>

            </div>

          </div>

        </Link>

      </div>

      {/* Action Buttons */}
      <div
        className="
          mt-10

          flex
          flex-col
          items-center
          gap-4
        "
      >

        <Button
          text="Simpan"
          onClick={handleSave}
        />

        <Button
          text="Logout"
          variant="secondary"
          onClick={handleLogout}
        />

      </div>

      <Navbar />

    </div>
  );
}