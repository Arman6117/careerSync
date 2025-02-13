import React from "react";
import Link from "next/link";
import Image from "next/image";

import { generateRandomColor } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Bookmark } from "lucide-react";

const jobs = [
  {
    id: 1,
    jobTitle: "Software Developer",
    jobPosterImage: "/square.svg",
    jobPosterName: "John Doe",
    jobPostDate: "12 March 2021",
    jobSalary: "₹10000/month",
  },
  {
    id: 2,
    jobTitle: "React Developer",
    jobPosterImage: "/square.svg",
    jobPosterName: "John Doe",
    jobPostDate: "12 June 2021",
    jobSalary: "₹10000/month",
  },
  {
    id: 3,
    jobTitle: "Senior Frontend Developer",
    jobPosterImage: "/square.svg",
    jobPosterName: "John Doe",
    jobPostDate: "12 July 2021",
    jobSalary: "₹10000/month",
  },
  {
    id: 4,
    jobTitle: "Senior Backend Developer",
    jobPosterImage: "/square.svg",
    jobPosterName: "John Doe",
    jobPostDate: "12 January 2021",
    jobSalary: "₹10000/month",
  },
  {
    id: 5,
    jobTitle: "Senior Backend Developer",
    jobPosterImage: "/square.svg",
    jobPosterName: "John Doe",
    jobPostDate: "12 January 2021",
    jobSalary: "₹10000/month",
  },
];
const JobSection = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div className="">
        <h1 className=" sm:text-5xl text-3xl font-medium xl:text-5xl  sm:leading-[3.5rem] text-center ">
          <span className="bg-gradient-to-br bg-transparent bg-clip-text text-transparent from-indigo-200 from-[-3%] via-35%  via-pink-500 to-[150%] to-amber-400">
            Find Your Match
          </span>
          <br />
          <span>Job Here</span>
        </h1>
      </div>
      <div className="flex sm:flex-wrap sm:flex-row flex-col w-full sm:p-3 gap-10 justify-center">
        {jobs.map((job) => {
          const color = generateRandomColor();
          return (
            <div
              key={job.id}
              className="flex rounded-lg gap-4 flex-col   sm:w-[300px] h-[300px] bg-neutral-"
            >
              <div
                className="h-[70%] p-4 rounded-lg"
                style={{ backgroundColor: color }}
              >
                <div className="flex flex-col gap-5 h-full justify-between">
                  <Bookmark className="text-neutral-800 hover:fill-neutral-800 cursor-pointer" />
                  <div>
                    <h1 className="text-wrap  max-w-[11.7rem] font-semibold text-2xl text-neutral-800">
                      {job.jobTitle}
                    </h1>
                  </div>
                  <span className="text-sm text-neutral-600 font-semibold">
                    {job.jobSalary}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src={job.jobPosterImage}
                    alt="logo"
                    width={45}
                    height={45}
                    className="rounded-full border border-neutral-400"
                  />
                  <div className="flex flex-col">
                    <span className="text-[17px] font-medium">
                      {job.jobPosterName}
                    </span>
                    <span className="text-xs font-semibold text-neutral-600">
                      {job.jobPostDate}
                    </span>
                  </div>
                </div>
                <Button className="rounded-full text-white hover:bg-gradient-to-b hover:outline hover:outline-1 transition-all hover:outline-neutral-800  hover:bg-clip-text hover:text-transparent   from-indigo-200 from-[-3%] via-35% bg-gradient-to-br via-pink-500 to-[150%]  to-amber-400">
                  View
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Link href={"/jobs"}>
        <Button
          variant={"outline"}
          className="rounded-full border-neutral-900  "
        >
          Show More
        </Button>
      </Link>
    </div>
  );
};

export default JobSection;
