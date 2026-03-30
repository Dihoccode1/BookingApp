import React from "react";
import { assets } from "../assets/assets";
import { CalendarIcon, ClockIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-[url('/backgroundImage.png')] flex h-screen flex-col items-start justify-center gap-4 bg-cover bg-center px-6 md:px-6 lg:px-36">
      <img src={assets.marvelLogo} alt="" className="max-h-l1 mt-20 lg:h-11" />
      <h1 className="max-w-110 text-5xl font-semibold md:text-[70px] md:leading-18">
        Guardians <br />
        of the Galaxy
      </h1>
      <div className="flex items-center gap-4 text-gray-300">
        <span>Action | Adventure | Sci-Fi</span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="h4.5 w-4.5" /> 2018
        </div>

        <div className="flex items-center gap-1">
          <ClockIcon className="h4.5 w-4.5" /> 2018
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
