"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModalStore } from "@/mobx/modalStore";
import { modals } from "@/util";
import { signOut } from "firebase/auth";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import cartStore from "@/mobx/cartStore";
import { useRouter } from "next/navigation";

const Header = observer(() => {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();

  return (
    <header className="flex justify-between items-center px-6 py-2 bg-white  shadow-md">
      <div className="logo flex items-center justify-center w-full md:w-auto">
        <Image
          alt="logo"
          width={70}
          height={70}
          src={"/images/logo.png"}
          className="bg-center object-cover rounded-full w-[70px] h-[70px]"
        />
      </div>
      <li
        onClick={() => setActiveTab("cart")}
        className={`relative underline ${
          activeTab === "home" && "underline"
        } text-gray-700 hover:underline`}
      >
        <Link href="/cart">
          <span className="underline text-black">
            <FaCartShopping
              size={30}
              className="text-gray-700 hover:text-gray-900"
            />
            {cartStore.items?.length > 0 && (
              <span className="absolute top-0 right-0  w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartStore.items?.length}
              </span>
            )}
          </span>
        </Link>
      </li>

      <nav>
        <ul className="flex space-x-6">
          <li onClick={() => setActiveTab("home")}>
            <Link href="/">
              <span
                className={`${
                  activeTab === "home" && "underline"
                } text-gray-700 hover:underline`}
              >
                בית
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <div></div>
    </header>
  );
});

export default Header;
