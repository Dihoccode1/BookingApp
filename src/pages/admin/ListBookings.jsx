import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import dateFormat from "../../lib/dateFormat";
const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "VND"; // Thêm fallback VND cho chắc chắn
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllBookings();
  }, []);
  return !isLoading ? (
    <>
      <Title text1="Danh sách" text2="đặt vé" />
      <div className="mt-6 max-w-4xl overflow-x-auto">
        <table className="w-full border-collapse overflow-hidden rounded-md border text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 pl-5 font-medium">Tên khách hàng</th>
              <th className="p-2 font-medium">Phim</th>
              <th className="p-2 font-medium">Thời lượng chiếu</th>
              <th className="p-2 font-medium">Số tiền</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((item, index) => (
              <tr
                key={index}
                className="border-primary/20 bg-primary/5 even:bg-primary/10 border-b"
              >
                <td className="min-w-45 p-2 pl-5">{item.user.name}</td>
                <td className="py-2">{item.show.movie.title}</td>
                <td className="py-2">{dateFormat(item.show.showDateTime)}</td>
                <td className="py-2">
                  {Object.keys(item.bookedSeats)
                    .map((seat) => item.bookedSeats[seat])
                    .join(", ")}
                </td>
                <td className="py-2">
                  {currency}
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;
