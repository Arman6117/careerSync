import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterForm = () => {
  return (
    <div className="h-[400px]  rounded-lg shadow-2xl border-r px-4 flex-col gap- w-[300px] flex bg-white bg-gradient-to-br from-white from-[80%]  to-pink-600 via-indigo-300">
      <h1 className="text-2xl font-semibold mt-10 text-center">Sign Up</h1>
      <form className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold ml-1">Name</Label>
          <Input
            className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
            placeholder="John Doe"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold ml-1">Email</Label>
          <Input
            className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
            placeholder="john@example.com"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold ml-1">Password</Label>
          <Input
            className="w-full border-gray-900 rounded-xl focus-visible:border-pink-600 focus-visible:ring-0 focus-visible:border-2 transition-all placeholder:text-xs"
            placeholder="1234567"
            required
            maxLength={8}
            minLength={6}
            type="password"
          />
        </div>
        <div className="flex justify-center">
          <Button className="w-36 font-semibold  rounded-sm hover:bg-white hover:text-black transition-all hover:bg-clip-text hover:outline hover:outline-black bg-gradient-to-br from-indigo-200 from-[-3%] via-35% via-pink-500 to-[150%]  to-amber-400 text-white">
            Sign Up
          </Button>
        </div>
        <div className="flex ga flex-col items-center ">
          <span className="text-center text-xs">Don't have an Account ?</span>
          <Link
            href={"/login"}
            className="text-[11px] hover:underline text-pink-600"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
