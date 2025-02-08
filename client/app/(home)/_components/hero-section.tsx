import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { BsArrowRight } from "react-icons/bs";
import { PiLinkedinLogoFill } from "react-icons/pi";
import { SiGlassdoor, SiIndeed, SiWellfound } from "react-icons/si";

const HeroSection = () => {
  return (
    <div className="flex md:flex-row gap-20 flex-col max-w-screen-[1800px] sm:justify-between">
      <div className=" w-full flex flex-col gap-4 h-scree bgred-300">
        <h1 className="sm:text-7xl text-5xl  md:text-[4.3rem] xl:text-8xl leading-[3rem] sm:leading-[5rem] ">
          Unlock Your <br />
          <span className="bg-gradient-to-br bg-transparent bg-clip-text text-transparent from-indigo-200 from-[-3%] via-35%  via-pink-500 to-[150%] to-amber-400">
            Career Potential
          </span>
          <br />
          with Career-Sync
        </h1>
        <p className="text-sm xl:text-lg md:text-left text-center text-gray-500">
          Discover Opportunities and Elevate Your Professional Journey
        </p>
        <div className="flex sm:flex-row flex-col items-center gap-4">
          <Input
            className="rounded-full bg-gray-100 max-w-[400px] border-none focus-visible:ring-slate-300"
            placeholder="Enter your email"
          />
          <Button className="text-[16px]  w-48 py-4 px-2  text-white hover:bg-gradient-to-b hover:outline hover:outline-1 transition-all hover:outline-neutral-800  hover:bg-clip-text hover:text-transparent  rounded-full from-indigo-200 from-[-3%] via-35% bg-gradient-to-br via-pink-500 to-[150%] to-amber-400">
            Get started{" "}
            <BsArrowRight
              size={30}
              className="bg-white rounded-full text-black h-10 w-10 p-0.5"
            />
          </Button>
        </div>
        <div className="flex flex-col mt-10">
          <p className="text-base xl:text-lg md:text-left text-center text-gray-500">
            All of Your Favorites at One Place
          </p>
          <div className="flex gap-3 mt-4 md:justify-start items-center justify-center ">
            <PiLinkedinLogoFill className="text-5xl b fill-sky-600" />
            <SiIndeed className="text-[40px] text-center bg-blue-800 p-2 rounded fill-white" />
            <SiGlassdoor className="text-[40px] text-center bg-green-500 p-2 rounded fill-white" />
            <SiWellfound className="text-[40px] text-center bg-red-500 p-2 rounded fill-white" />
          </div>
        </div>
      </div>
      <div className="  h-screen ">
        <Image
          src={"/square.svg"}
          alt="frm"
          width={800}
          height={800}
          className="w-[px] rounded-md h-[px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
