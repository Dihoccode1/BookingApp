import { useState, useEffect } from "react";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat"; // Import hàm format thời gian chiếu
import dateFormat from "../lib/dateFormat"; // Import hàm format ngày chiếu

const MyBooking = () => {
  const currency = import.meta.env.VITE_CURRENCY || "VND";
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getBookings();
  }, []);

  return !isLoading ? (
    <div className="relative min-h-[80vh] px-6 pt-30 md:px-16 md:pt-40 lg:px-40">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0" left="600px" />
      </div>

      <div className="mx-auto max-w-4xl pb-20">
        <h1 className="mb-4 text-2xl font-semibold">Lịch sử đặt vé</h1>

        {bookings.map((item, index) => (
          <div
            key={index}
            // Đã sửa lỗi gõ nhầm maw-w-3xl thành max-w-full để nó không bị tràn
            className="bg-primary/10 border-primary/20 mt-4 flex flex-col justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-center"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <img
                src={item.show.movie.backdrop_path}
                alt={item.show.movie.title}
                className="w-full rounded object-cover sm:w-48"
              />
              <div className="flex flex-col justify-center">
                <p className="text-xl font-semibold">{item.show.movie.title}</p>

                {/* Đã bọc hàm timeFormat theo đúng video ở 3:15:52 */}
                <p className="mt-1 text-sm text-gray-400">
                  Thời lượng: {timeFormat(item.show.movie.runtime)}
                </p>

                {/* Đã bọc hàm dateFormat (Video code ở 3:17:06) */}
                <p className="mt-3 text-sm text-gray-300">
                  <span className="font-medium text-white">Suất chiếu: </span>
                  {dateFormat(item.show.showDateTime)}
                </p>
              </div>
            </div>

            {/* Chừa sẵn cột bên phải: Video sẽ bắt đầu code cột này ở phút 3:17:38 để hiện Giá tiền, Số ghế và Nút Pay Now */}
            <div className="flex flex-col items-start justify-center border-t border-gray-700 pt-4 md:items-end md:border-t-0 md:pt-0">
              <div className="flex items-center gap-4">
                <p className="mb3 text-2xl font-semibold">
                  {item.amount + ".00"}
                  {currency}
                </p>
                {!item.isPaid && (
                  <button className="bg-primary mb-3 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium">
                    Thanh toán
                  </button>
                )}
              </div>
              <div className="text-sm">
                <p>
                  <span className="text-gray-400">Số vé:</span>
                  {item.bookedSeats.length}
                </p>
                <p>
                  <span className="text-gray-400">Số ghế:</span>
                  {item.bookedSeats.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyBooking;
