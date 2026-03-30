import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-start justify-center gap-4 bg-[url('/backgroundImage.png')] bg-cover bg-center px-6 md:px-6 lg:px-36">
      <img src={assets.marvelLogo} alt="" className="max-h-l1 mt-20 lg:h-11" />
      <h1 className="max-w-110 text-5xl font-semibold md:text-[70px] md:leading-18">
        Guardians <br />
        of the Galaxy
      </h1>
      <div className="flex items-center gap-4 text-gray-300">
        <span>Hành động | Phiêu lưu | Khoa học viễn tưởng</span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="h4.5 w-4.5" /> 2018
        </div>

        <div className="flex items-center gap-1">
          <ClockIcon className="h4.5 w-4.5" /> 180 phút
        </div>
      </div>
      <p className="max-w-md text-gray-300">
        Giữa một thế giới hậu tận thế nơi các thành phố săn đuổi và nuốt chửng
        nhau để tồn tại, hai kẻ xa lạ vô tình va vào nhau tại London — rồi bị
        kéo thẳng vào một âm mưu khổng lồ. Không ưa nhau là thế, nhưng muốn sống
        sót thì buộc phải bắt tay… dù trong lòng chỉ muốn cho đối phương “bay
        màu
      </p>
      <button
        onClick={() => {
          navigate("/movies");
        }}
        className="bg-primary hover:bg-primary-dull flex cursor-pointer items-center gap-1 rounded-full px-6 py-3 text-sm font-medium transition"
      >
        Xem ngay
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default HeroSection;
