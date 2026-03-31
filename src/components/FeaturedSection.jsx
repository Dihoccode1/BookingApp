import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import { dummyShowsData } from "../assets/assets";
import MovieCard from "./MovieCard";

const FeaturedSection = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden px-6 md:px-16 lg:px-24 xl:px-44">
      {/* Title */}
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-80px" />
        <p>Phim đang chiếu</p>
        <button
          onClick={() => {
            navigate("/movies");
          }}
          className="group gap2: flex cursor-pointer items-center text-sm text-gray-300"
        >
          Xem tất cả
          <ArrowRight className="h4.5 w-4.5 transition group-hover:translate-x-0.5" />
        </button>
      </div>
      {/* Movie list */}
      <div className="mt-8 flex flex-wrap gap-8 max-sm:justify-center">
        {dummyShowsData.slice(0, 4).map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
      {/* Action group button */}
      <div className="mt-20 flex justify-center">
        <button
          className="bg-primary hover:bg-primary-dull cursor-pointer rounded-md px-10 py-3 text-sm font-medium transition"
          onClick={() => {
            navigate("movies");
            scrollTo(0, 0);
          }}
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
