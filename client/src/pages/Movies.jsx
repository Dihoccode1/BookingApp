import React from "react";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className="relative my-40 mb-60 min-h-[80vh] overflow-hidden px-6 md:px-16 lg:px-40 xl:px-44">
      <BlurCircle top="150px" left="0" />
      <BlurCircle bottom="150px" right="50px" />
      <h1>Phim đang chiếu</h1>
      <div className="flex flex-wrap gap-8 max-sm:justify-center">
        {dummyShowsData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-center text-3xl font-bold">
        Hiện chưa có phim nào đang chiếu
      </h1>
    </div>
  );
};

export default Movies;
