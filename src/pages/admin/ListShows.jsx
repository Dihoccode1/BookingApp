import { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import dateFormat from "../../lib/dateFormat";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "VND"; // Thêm fallback VND cho chắc chắn
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          // ĐÃ SỬA: Đổi 'move' thành 'movie'
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
      ]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <>
      {/* ĐÃ SỬA: Sai chính tả "xuất chiếu" -> "suất chiếu" */}
      <Title text1="Danh sách" text2="suất chiếu" />
      <div className="mt-6 max-w-4xl overflow-x-auto">
        <table className="w-full border-collapse overflow-hidden rounded-md border text-nowrap">
          <thead>
            <tr className="bg-primary/20 text-left text-white">
              <th className="p-2 pl-5 font-medium">Phim</th>
              <th className="p-2 font-medium">Thời gian</th>
              <th className="p-2 font-medium">Tổng số vé đặt</th>
              <th className="p-2 font-medium">Doanh thu</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {shows.map((show, index) => (
              <tr
                key={index}
                className="border-primary/10 bg-primary/5 even:bg-primary/10 border-b"
              >
                <td className="min-w-45 p-2 pl-5">{show.movie.title}</td>
                <td className="p-2">{dateFormat(show.showDateTime)}</td>

                {/* ĐÃ SỬA: Tách riêng cột Tổng số vé đặt */}
                <td className="p-2">
                  {Object.keys(show.occupiedSeats).length}
                </td>

                {/* ĐÃ SỬA: Sửa lại cú pháp nhân Doanh thu và thêm đơn vị tiền tệ */}
                <td className="p-2">
                  {Object.keys(show.occupiedSeats).length * show.showPrice}{" "}
                  {currency}
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

export default ListShows;
