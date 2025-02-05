import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <Logo />
      <div className="md:flex gap-3 hidden ">
        <Link href={"/dashboard/jobs"}>Job</Link>
        <Link href={"/dashboard/mock-interview"}>Ai Interview</Link>
      </div>
      <div className="flex gap-3">
        <Button variant={"link"} className="font-semibold hover:text-[#fd6cff]">Login</Button>
        <Button>Sign Up</Button>
      </div>
    </nav>
  );
};

export default Navbar;
