import TextBox from "@/components/TextBox";
import Button from "@/components/Button";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F0E7D6] px-8">

      <div className="flex w-full justify-end">
        <Link
          href="/LoginPage"
          className="
            text-[21.526px]
            text-[#FF5E33]
            underline
            font-squadaOne
          "
        >
          Log In
        </Link>
      </div>

      <h1 className="pb-16 text-[43.593px] leading-none font-normal text-[#6E822E]">
        Sign Up
      </h1>

      <TextBox placeholder="E-Mail" type="email" />
      <TextBox placeholder="Nama Lengkap" type="text" />
      <TextBox placeholder="Password" type="password" />
      <TextBox placeholder="Konfirmasi Password" type="password" />

      <Button
        text="Sign Up"
        className="mt-36 leading-none"
      />

    </div>
  );
}