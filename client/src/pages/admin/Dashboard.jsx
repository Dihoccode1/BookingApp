import {
  ChartLineIcon,
  CircleDollarSignIcon,
  PlayCircleIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import BlurCircle from "../../components/BlurCircle";
import dateFormat from "../../lib/dateFormat";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY || "VND";

  // ĐÃ SỬA: Sửa 'cost' thành 'const' và cú pháp mảng destructing
  const [dashBoardData, setDashBoardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalUser: 0,
    activeShows: [], // ĐÃ SỬA: Đổi từ 0 thành mảng rỗng [] để dùng được .length
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Tổng số đặt vé",
      value: dashBoardData.totalBookings || 0,
      icon: ChartLineIcon,
    },
    {
      title: "Tổng doanh thu",
      // ĐÃ SỬA: Dùng biến currency thay vì fix cứng dấu $
      value: `${dashBoardData.totalRevenue || 0} ${currency}`,
      icon: CircleDollarSignIcon,
    },
    {
      title: "Tổng số ghế hợp lý",
      // Giờ dùng .length sẽ an toàn vì activeShows đã được khởi tạo là mảng
      value: `${dashBoardData.activeShows?.length || 0}`,
      icon: PlayCircleIcon,
    },
    {
      title: "Tổng số người dùng",
      value: `${dashBoardData.totalUser || 0}`,
      icon: UserIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashBoardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <Title text1="Admin" text2="Dashboard" />
      <div className="relative mt-6 flex flex-wrap gap-4">
        <BlurCircle top="-100px" left="0" />
        <div className="flex w-full flex-wrap gap-4">
          {dashboardCards.map((card, index) => {
            // ĐÃ SỬA: Rút icon ra biến viết HOA để React hiểu là Component
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="bg-primary/20 flex w-full max-w-50 items-center justify-between rounded-md px-4 py-3"
              >
                <div>
                  <h1 className="text-sm">{card.title}</h1>
                  <p className="mt-1 text-xl font-medium">{card.value}</p>
                </div>
                {/* Gọi thẻ <Icon /> */}
                <Icon className="h-6 w-6" />
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-10 text-lg font-medium">Các suất chiếu đang mở</p>
      <div className="relative mt-4 flex max-w-5xl flex-wrap gap-6">
        <BlurCircle top="100px" left="-10%" />
        {dashBoardData.activeShows.map((show) => (
          <div
            key={show._id}
            className="bg-primary/10 border-primary/20 h-full w-55 overflow-hidden rounded-lg border pb-3 transition duration-300 hover:translate-y-1"
          >
            <img
              src={show.movie.poster_path}
              alt=""
              className="h-60 w-full object-cover"
            />
            <p className="truncate p-2 font-medium">{show.movie.title}</p>
            <div className="flex items-center justify-between px-2">
              <p className="text-lg font-medium">
                {currency}
                {show.ShowPrice}
              </p>
              <p className="mt-1 flex items-center gap-1 pr-1 text-sm text-gray-400">
                <StarIcon className="text-primary fill-primary h-4 w-4" />{" "}
                {show.movie.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="px-2 pt-2 text-sm text-gray-500">
              {dateFormat(show.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
