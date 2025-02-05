import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <Logo />
      <div className="sm:flex gap-7 hidden mt-1">
        <Link
          className="font-medium md:text-lg    transition-all hover:bg-gradient-to-b hover:bg-transparent hover:bg-clip-text hover:text-transparent from-pink-400 via-pink-500 to-pink-700 "
          href={"/dashboard/jobs"}
        >
          Jobs
        </Link>
        <Link
          className="font-medium md:text-lg   transition-all hover:bg-gradient-to-b hover:bg-transparent hover:bg-clip-text hover:text-transparent from-pink-400 via-pink-500 to-pink-700 "
          href={"/dashboard/mock-interview"}
        >
          Mock Interview
        </Link>
      </div>
      <div className="flex gap-3">
        <Button
          variant={"outline"}
          // size={"lg"}
          className="font-semibold md:h-10  md:px-8 md:text-lg  border-neutral-800 rounded-full transition-all hover:bg-gradient-to-b hover:bg-transparent hover:bg-clip-text hover:text-transparent from-pink-400 via-pink-500 to-pink-700  "
        >
          Login
        </Button>
        <Button
          // size={"lg"}
          className="font-semibold  md:h-10  md:px-8  md:text-lg text-white hover:bg-gradient-to-b hover:outline hover:outline-1 transition-all hover:outline-neutral-800  hover:bg-clip-text hover:text-transparent  rounded-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600"
        >
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
