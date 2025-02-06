import React from "react";

const HeroSection = () => {
  return (
    <div className="flex max-w-screen-2xl justify-between">
      <div className="md:w-2/3 w-full  h-screen bgred-300">
        <h1 className="sm:text-7xl text-4xl  md:text-6xl leading-[3rem] sm:leading-[4.4rem] ">
          Unlock Your <br />
          <span className="bg-gradient-to-r bg-transparent bg-clip-text text-transparent from-pink-400 via-pink-500 to-pink-600">Career Potential</span>
          <br />
          with Career-Sync
        </h1>
      </div>
      <div className=""></div>
    </div>
  );
};

export default HeroSection;
