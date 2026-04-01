import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import Loading from "../components/Loading";

const MovieDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const foundShow = dummyShowsData.find((item) => item._id === id);
    if (foundShow) {
      setShow({ movie: foundShow, dateTime: dummyDateTimeData });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="px-6 pt-30 md:px-16 md:pt-50 lg:px-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="h-104 max-w-70 rounded-xl object-cover max-md:mx-auto"
        />
        <div className="relative flex flex-col gap-3">
          <BlurCircle top="-100px" left="-100px" />
          <p className="text-primary">Tiếng Anh</p>
          <h1 className="max-w-96 text-4xl font-semibold text-balance">
            {show.movie.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <StarIcon className="text-primary h-5 w-5" />
            {show.movie.vote_average.toFixed(1)} Đánh giá từ người xem
          </div>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-400">
            {show.movie.overview}
          </p>

          <p className="font-medium text-gray-300">
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {/* Đã sửa py-3 py-10 thành px-10 py-3 */}
            <a
              className="bg-primary hover:bg-primary-dull transform cursor-pointer rounded-md px-10 py-3 text-sm font-medium transition active:scale-95"
              href="#dateSelect"
            >
              Mua vé
            </a>
          </div>
        </div>
      </div>

      {/* Đã sửa -mt-20 thành mt-16 để không bị đè */}
      {/* --- BẮT ĐẦU KHU VỰC DÀN DIỄN VIÊN --- */}
      <div className="mx-auto mt-16 max-w-6xl">
        <p className="text-lg font-medium">Dàn diễn viên</p>
        <div className="no-scrollbar mt-6 overflow-x-auto pb-4">
          {/* Kiểm tra xem có data cast không, nếu có thì render ảnh, không thì báo Đang cập nhật */}
          {show.movie.cast && show.movie.cast.length > 0 ? (
            <div className="flex w-max items-start gap-6">
              {show.movie.cast.slice(0, 12).map((cast, index) => (
                <div
                  key={index}
                  className="flex w-20 flex-col items-center text-center"
                >
                  <img
                    // Nếu không có ảnh profile, bạn có thể thay bằng 1 ảnh mặc định (placeholder) ở đây
                    src={cast.profile_path}
                    alt={cast.name}
                    className="h-20 w-20 rounded-full bg-gray-800 object-cover shadow-md"
                  />
                  <p className="mt-2 text-xs font-medium text-gray-300">
                    {cast.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              Đang cập nhật thông tin dàn diễn viên...
            </p>
          )}
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetail;
