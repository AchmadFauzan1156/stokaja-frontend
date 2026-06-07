"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  const navItems = [
    {
      name: "home",
      href: "/home",
      icon: "/Home.svg",
      alt: "Home Icon",
    },

    {
      name: "cart",
      href: "/cart",
      icon: "/Cart.svg",
      alt: "Cart Icon",
    },

    {
      name: "history",
      href: "/history",
      icon: "/History.svg",
      alt: "History Icon",
    },

    {
      name: "chat",
      href: "/chat",
      icon: "/Chat.svg",
      alt: "Chat Icon",
    },
  ];

  return (
    <nav
      className="
        fixed
        bottom-0
        left-1/2
        -translate-x-1/2

        w-full
        max-w-full

        h-33.75

        bg-[#B6D04E]

        flex
        items-center
        justify-center

        px-6
      "
    >
      <div className="flex flex-row gap-8">

        {navItems.map((item) => {

          const isSelected =
            pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}

              className={`
                w-16.5
                h-16.5

                rounded-2xl

                flex
                items-center
                justify-center

                transition-all
                duration-200

                ${
                  isSelected
                    ? "bg-[#F0E7D6]"
                    : "bg-transparent"
                }
              `}
            >
              <Image
                src={item.icon}
                alt={item.alt}
                width={38}
                height={38}
              />
            </Link>
          );
        })}

      </div>
    </nav>
  );
}
