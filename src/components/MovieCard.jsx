import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-66 flex-col justify-between rounded-3xl bg-gray-800 p-3 transition duration-300 hover:translate-y-1">
      <img
        src={movie.backdrop_path}
        alt={movie.title}
        // Đã sửa lỗi chính tả từ object-right-bottoms thành object-right-bottom
        className="h-52 w-full cursor-pointer rounded-lg object-cover object-right-bottom"
        onClick={() => {
          navigate(`/movies/${movie.id}`);
          scrollTo(0, 0);
        }}
      />
      <p className="mt-2 truncate font-semibold">{movie.title}</p>
      <p className="mt-2 text-sm text-gray-400">
        {new Date(movie.release_date).getFullYear()} -{" "}
        {movie.genres
          .slice(0, 2)
          .map((genre) => genre.name)
          .join(" | ")}
        . {movie.runtime}
      </p>
      <div className="mt-4 flex items-center justify-between pb-3">
        <button
          onClick={() => {
            navigate(`/movies/${movie.id}`);
            scrollTo(0, 0);
          }}
          className="bg-primary hover:bg-primary-dull cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition"
        >
          Mua vé
        </button>

        {/* Đã sửa tên StarIcon và đưa số điểm ra ngoài đứng cạnh icon */}
        <div className="flex items-center gap-1">
          <StarIcon className="text-primary h-5 w-5" />
          <span className="text-sm font-medium">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
