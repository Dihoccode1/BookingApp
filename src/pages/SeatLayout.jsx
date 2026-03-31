import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ]; // Cấu trúc cho các hàng ghế

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  const getShow = async () => {
    const foundShow = dummyShowsData.find((item) => item._id == id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  // Đã đưa hàm này ra ngoài getShow
  const handleSelectClick = (seatId) => {
    if (!selectedTime) {
      toast.error("Vui lòng chọn suất chiếu trước khi chọn ghế!");
      return;
    }

    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      toast.error("Bạn chỉ có thể chọn tối đa 5 ghế!");
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId],
    );
  };

  // Đã đưa hàm này ra ngoài getShow, sửa lỗi ngoặc và đổi {row+i} thành {seatId}
  const renderSeats = (row, count = 7) => {
    return (
      <div
        key={row}
        className="mt-2 flex flex-wrap items-center justify-center gap-1 sm:gap-2"
      >
        <div className="flex w-6 items-center justify-center font-bold text-gray-400">
          {row}
        </div>
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSelectClick(seatId)}
              className={`border-primary/60 h-8 w-10 cursor-pointer rounded border text-[11px] font-medium transition-colors sm:w-11 sm:text-xs ${
                selectedSeats.includes(seatId)
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20 text-gray-300"
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getShow();
  }, []);

  return show ? (
    <div className="flex flex-col px-6 py-30 md:flex-row md:px-16 md:pt-50 lg:px-40">
      {/* Available Timings */}
      <div className="bg-primary/10 border-primary/20 h-max w-60 rounded-lg border py-10 md:sticky md:top-30">
        <p className="px-6 text-lg font-semibold">Suất chiếu</p>
        <div className="mt-5 space-y-2">
          {show.dateTime[date]?.map((item, index) => (
            <div
              onClick={() => setSelectedTime(item)}
              key={index}
              className={`flex w-11/12 cursor-pointer items-center gap-2 rounded-r-lg px-6 py-3 font-medium transition-all duration-300 ${
                selectedTime?.time === item.time
                  ? "bg-primary shadow-primary/40 translate-x-2 text-white shadow-md"
                  : "hover:bg-primary/20 hover:border-primary/30 border-y border-r border-transparent text-gray-300 hover:translate-x-2 hover:text-white"
              }`}
            >
              <ClockIcon className="h-4 w-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seat Layout */}
      <div className="relative flex flex-1 flex-col items-center overflow-hidden max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="mb-4 text-2xl font-semibold">Chọn ghế</h1>

        <img
          src={assets.screenImage}
          alt="Màn hình"
          className="w-full max-w-md"
        />
        <p className="mb-8 text-sm text-gray-400">Màn Hình Chiếu</p>

        {/* Đã bọc overflow-x-auto để mobile vuốt ngang mượt mà, sửa gap11 thành gap-x-12 */}
        <div className="mt-10 flex w-full flex-col items-center overflow-x-auto pb-6 text-xs text-gray-300">
          {/* Nhóm hàng đầu tiên: A, B */}
          <div className="mb-6 flex w-max flex-col items-center gap-2">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          {/* Các nhóm hàng còn lại: C-D, E-F... chia làm 2 cột trên màn hình lớn */}
          <div className="grid w-max grid-cols-1 gap-x-12 gap-y-6 xl:grid-cols-2">
            {groupRows.slice(1).map((group, index) => (
              <div key={index} className="flex flex-col gap-2">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-primary hover:bg-primary-dull mt-20 flex cursor-pointer items-center gap-1 rounded-full px-10 py-3 text-sm font-medium transition active:scale-95"
          onClick={() => {
            navigate("/my-bookings");
          }}
        >
          Xác nhận chọn ghế
          <ArrowRightIcon strokeWidth={3} className="h-4 w-4" />
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
