import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminNavBar = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300/20 px-6 py-3 md:px-10">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="h-auto w-36" />
      </Link>
      <Link
        to="/admin/dashboard"
        className="hover:text-primary text-sm font-medium"
      ></Link>
    </div>
  );
};

export default AdminNavBar;
