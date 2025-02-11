import Image from "next/image";
import React from "react";

const cards = [
  {
    no: 1,
    title: "Tailored Job Matches",
    description:
      "We match you with the best jobs based on your skills and experience.",
    image: "/square.svg",
  },
  {
    no: 2,
    title: "Mock Interviews",
    description:
      " We help you prepare for interviews by conducting mock interviews.",
    image: "/square.svg",
  },
  {
    no: 3,
    title: "Mock Interviews",
    description:
      " We help you prepare for interviews by conducting mock interviews.",
    image: "/square.svg",
  },
  {
    no: 4,
    title: "Mock Interviews",
    description:
      " We help you prepare for interviews by conducting mock interviews.",
    image: "/square.svg",
  },
];

const WhySection = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <h1 className=" sm:text-5xl text-2xl font-medium xl:text-5xl leading-[3rem] sm:leading-[5rem] ">
          <span className="bg-gradient-to-br bg-transparent bg-clip-text text-transparent from-indigo-200 from-[-3%] via-35%  via-pink-500 to-[150%] to-amber-400">
            Why{" "}
          </span>
          <span>Career-Sync ?</span>
        </h1>
      </div>
      <div className="flex flex-wrap gap-3  items-center justify-center ">
        {cards.map((card) => (
          <div
            key={card.no}
            className="flex bg-gray-200/30 h-[400px] gap-7 rounded-lg  w-[400px] flex-col px-5 py-3"
          >
            <div className="  flex  justify-center  " key={card.no}>
              <Image src={card.image} alt="image" width={250} height={250} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[1.2rem]">{card.title}</h2>
              <p className="text-gray-400 text-[10px]">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhySection;
