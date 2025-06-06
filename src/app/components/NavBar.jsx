import React from "react";
import { ToggleTheme } from "./ToggleTheme";
import Search from "./Search";
import { Suspense } from "react";
import { Martian_Mono } from "next/font/google";

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});
const NavBar = () => {
  return (
    <div className="px-[15%] h-[60px] flex items-center cursor-pointer justify-between">
      <h1 className="text-xl  font-medium">
        <font className={martianMono.className}>Internet Radio</font>
      </h1>
      <ul className="flex items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <li className="ml-4">
            <Search />
          </li>
        </Suspense>
        <li className="ml-4">
          <ToggleTheme />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
