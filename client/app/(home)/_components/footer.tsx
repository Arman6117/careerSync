import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CgInstagram } from "react-icons/cg";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col h-44 justify-center ">
      <div className="flex  sm:flex-row flex-col
       justify-between w-full">
        <div className="scale-125 sm:justify-normal  ml-0 justify-center w-ull  sm:ml-20">
          <Logo className="flex" />
        </div>
        <div className="flex sm:mt-0 mt-10 sm:flex-row flex-col gap-4 justify-center items-center
        ">
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
        <div className="flex sm:mt-0 mt-10 gap-5 items-center justify-center">
          <Button
            variant={"outline"}
            size={'lg'}
            className="rounded-full p-0 size-10

           border-neutral-800"
          >
            <FaInstagram className="text-2xl rounded-full " />
          </Button>
          <Button
            variant={"outline"}
            size={'lg'}
            className="rounded-full p-0 size-10

           border-neutral-800"
          >
            <FaFacebook className="text-2xl rounded-full " />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
