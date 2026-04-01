import React, { useState, useEffect } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
// ĐÃ SỬA: Dùng Check, Star, X thay vì CheckIcon, StarIcon để không bị lỗi với lucide-react bản mới
import { Check, Star, X } from "lucide-react";
import { kConverter } from "../../lib/kConverter";

const AddShow = () => {
  const currency = import.meta.env.VITE_CURRENCY || "VND";
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };

  const handleDateAddTime = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prevSelection) => {
      const times = prevSelection[date] || [];
      if (!times.includes(time)) {
        return { ...prevSelection, [date]: [...times, time] };
      }
      return prevSelection;
    });

    // Xóa input sau khi thêm để tiện thêm giờ khác
    setDateTimeInput("");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prevSelection) => {
      const filteredTimes = prevSelection[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prevSelection;
        return rest;
      }
      return {
        ...prevSelection,
        [date]: filteredTimes,
      };
    });
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Thêm" text2="phim" />
      <p className="mt-10 text-lg font-medium">Phim đang chiếu</p>
      <div className="overflow-x-auto pb-4">
        <div className="group flex w-max flex-wrap gap-4">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie.id)}
              className={`relative max-w-40 cursor-pointer transition duration-300 group-hover:opacity-40 hover:-translate-y-1 hover:!opacity-100`}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={movie.poster_path}
                  alt=""
                  className="w-full object-cover brightness-90"
                />
                <div className="absolute bottom-0 left-0 flex w-full items-center justify-between bg-black/70 p-2 text-sm">
                  <p className="flex items-center gap-1 text-gray-400">
                    <Star className="text-primary fill-primary h-4 w-4" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">
                    {kConverter(movie.vote_count)} Đánh giá
                  </p>
                </div>
              </div>

              {selectedMovie === movie.id && (
                <div className="bg-primary absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded">
                  <Check className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
              )}
              <p className="truncate font-medium">{movie.title}</p>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Giá vé */}
      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium">Giá vé</label>
        <div className="inline-flex items-center gap-2 rounded-md border border-gray-600 px-3 py-2">
          <p className="text-sm text-gray-400">{currency}</p>
          <input
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Nhập giá"
            className="bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Chọn ngày & giờ */}
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Chọn ngày và giờ
        </label>
        <div className="inline-flex items-center gap-5 rounded-lg border border-gray-600 p-1 pl-3">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="rounded-md bg-transparent outline-none"
          />
          <button
            onClick={handleDateAddTime}
            className="bg-primary/80 hover:bg-primary-dull cursor-pointer rounded-lg px-3 py-2 text-sm text-white"
          >
            Thêm giờ
          </button>
        </div>
      </div>

      {/* ĐÃ BỔ SUNG: Vùng hiển thị các Ngày & Giờ đã chọn (Tiến độ video 4:12:56) */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium">Ngày giờ đã chọn:</p>
          <div className="flex flex-col gap-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <div key={date} className="flex flex-wrap items-center gap-3">
                <span className="font-medium text-gray-400">{date}:</span>
                {times.map((time, index) => (
                  <div
                    key={index}
                    className="bg-primary/20 flex items-center gap-2 rounded-md px-3 py-1.5 text-sm"
                  >
                    <span>{time}</span>
                    <X
                      className="h-4 w-4 cursor-pointer text-gray-400 transition-colors hover:text-white"
                      onClick={() => handleRemoveTime(date, time)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Adds the show */}
      <button className="bg-primary hover:bg-primary-dull mt-8 rounded-lg px-8 py-3 text-sm font-medium text-white transition-colors">
        Thêm suất chiếu
      </button>
    </>
  ) : (
    <Loading />
  );
};

export default AddShow;
