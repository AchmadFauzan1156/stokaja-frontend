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
            pb-10
          "
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

      <TextBox placeholder="E-Mail" type="email" />

      <Button
        text="Get Link"
        className="mt-98 leading-none"
      />

    </div>
  );
}