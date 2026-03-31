import React from "react";
import { assets } from "../assets/assets";
import { Play, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    // 1. Thêm 'relative' vào thẻ div tổng để có thể dùng absolute positioning cho nút bên trong
    <div className="relative flex h-screen flex-col items-start justify-center gap-4 bg-[url('/backgroundImage.png')] bg-cover bg-center px-6 md:px-6 lg:px-36">
      <img
        src={assets.marvelLogo}
        alt="Marvel Logo"
        className="mt-20 max-h-11 lg:h-11"
      />

      <h1 className="max-w-110 text-5xl font-semibold text-white md:text-[70px] md:leading-18">
        Guardians <br />
        of the Galaxy
      </h1>

      <div className="flex items-center gap-4 text-gray-300">
        <span>Hành động | Phiêu lưu | Khoa học viễn tưởng</span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-5 w-5" /> 2018
        </div>

        <div className="flex items-center gap-1">
          <ClockIcon className="h-5 w-5" /> 2 giờ 8 phút
        </div>
      </div>

      <p className="max-w-md text-gray-300">
        Giữa một thế giới hậu tận thế nơi các thành phố săn đuổi và nuốt chửng
        nhau để tồn tại, hai kẻ xa lạ vô tình va vào nhau tại London — rồi bị
        kéo thẳng vào một âm mưu khổng lồ. Không ưa nhau là thế, nhưng muốn sống
        sót thì buộc phải bắt tay… dù trong lòng chỉ muốn cho đối phương “bay
        màu”.
      </p>

      {/* Nút Xem ngay: Vẫn nằm dưới phần mô tả phim */}
      <button
        onClick={() => {
          navigate("/movies");
        }}
        className="bg-primary hover:bg-primary-dull mt-2 flex cursor-pointer items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white transition"
      >
        <Play className="h-5 w-5 fill-current" />
        Xem ngay
      </button>
    </div>
  );
};

export default HeroSection;
