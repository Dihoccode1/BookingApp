import { useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const onBookHandle = () => {
    if (!selectedDate) {
      // Dùng toast.error để hiện thông báo màu đỏ cho đẹp
      return toast.error("Vui lòng chọn ngày đặt vé trước khi tiếp tục!");
    }
    // Đã sửa dấu ngoặc kép thành dấu backtick (`)
    navigate(`/movies/${id}/${selectedDate}`);
    window.scrollTo(0, 0); // Thêm window. cho an toàn
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div className="bg-primary/10 border-primary/20 relative flex flex-col items-center justify-between gap-10 rounded-lg border p-8 md:flex-row">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0" />

        <div>
          <p className="text-lg font-semibold">Chọn ngày đặt vé</p>
          <div className="mt-5 flex items-center gap-6 text-sm">
            <ChevronLeftIcon className="cursor-pointer" width={28} />

            <span className="md:max-lg grid grid-cols-3 flex-wrap gap-4 md:flex">
              {Object.keys(dateTime).map((date) => (
                <button
                  onClick={() => setSelectedDate(date)}
                  // Đã sửa lại cú pháp Template Literal và tên biến selectedDate
                  className={`flex aspect-square h-14 w-14 cursor-pointer flex-col items-center justify-center rounded transition-all ${
                    selectedDate === date
                      ? "bg-primary border-primary text-white"
                      : "hover:border-primary border border-gray-500/50"
                  }`}
                  key={date}
                >
                  <span className="text-lg font-bold">
                    {new Date(date).getDate()}
                  </span>
                  <span className="text-xs">
                    {new Date(date).toLocaleDateString("vi-VN", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>

            {/* Đã mang ChevronRightIcon ra khỏi vòng lặp */}
            <ChevronRightIcon className="cursor-pointer" width={28} />
          </div>
        </div>

        {/* Đã sửa onAbort thành onClick và xóa chữ 'c ' thừa */}
        <button
          onClick={onBookHandle}
          className="bg-primary hover:bg-primary-dull/90 cursor-pointer rounded px-8 py-2 text-white transition-all"
        >
          Đặt vé ngay
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
