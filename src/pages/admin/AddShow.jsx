import React, { useState, useEffect } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { StarIcon } from "lucide-react";

const AddShow = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };
  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Thêm" text2="phim" />
      <p className="mt-10 text-lg font-medium">Phim đang chiếu </p>
      <div className="overflow-x-auto pb-4">
        <div className="group flex w-max flex-wrap gap-4">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-40 cursor-pointer transition duration-300 group-hover:not-hover:opacity-40 hover:translate-y-1`}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={movie.poster_path}
                  alt=""
                  className="w-full object-cover brightness-90"
                />
                <div className="absolute bottom-0 left-0 flex w-full items-center justify-between bg-black/70 p-2 text-sm">
                  <p className="flex items-center gap-1 to-gray-400">
                    <StarIcon className="text-primary fill-primary h-4 w-4" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="to-gray-300">{movie.vote_count} Đánh giá</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default AddShow;
