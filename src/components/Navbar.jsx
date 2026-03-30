import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  MenuIcon,
  SearchIcon,
  TicketCheckIcon,
  TicketPlus,
  User,
  UserCheck,
  XIcon,
} from "lucide-react";
import { useUser } from "@clerk/react";
import {
  Show,
  SignInButton,
  SignUpButton,
  useClerk,
  UserButton,
} from "@clerk/react";
const Navbar = () => {
  // State quản lý việc đóng/mở menu trên mobile
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5 md:px-16 lg:px-36">
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="h-auto w-36" />
      </Link>

      {/* Menu list */}
      <div
        className={`md:backdrop-blur-0 z-50 flex flex-col items-center justify-center gap-8 overflow-hidden border-gray-300/20 bg-black/90 py-3 backdrop-blur-sm transition-[width] duration-300 max-md:absolute max-md:top-0 max-md:left-0 max-md:h-screen max-md:text-lg max-md:font-medium md:h-auto md:w-auto md:flex-row md:gap-10 md:rounded-full md:border md:bg-transparent md:px-8 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="absolute top-6 right-6 h-6 w-6 cursor-pointer text-white md:hidden"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
            scrollTo(0, 0);
          }}
          className="hover:text-primary text-white"
        >
          Home
        </Link>
        <Link
          to="/movies"
          onClick={() => {
            setIsOpen(false);
            scrollTo(0, 0);
          }}
          className="hover:text-primary text-white"
        >
          Movies
        </Link>
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
            scrollTo(0, 0);
          }}
          className="hover:text-primary text-white"
        >
          Releases
        </Link>
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false);
            scrollTo(0, 0);
          }}
          className="hover:text-primary text-white"
        >
          Theaters
        </Link>
      </div>

      {/* Login and Search icon */}
      <div className="flex items-center gap-8">
        <SearchIcon className="h-6 w-6 cursor-pointer max-md:hidden" />
        {!user ? (
          <button
            onClick={openSignIn}
            className="bg-primary hover:bg-primary-dull cursor-pointer rounded-full px-4 py-1 font-medium text-white transition sm:px-7 sm:py-2"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <MenuIcon
          className="h-8 w-8 cursor-pointer max-md:ml-4 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </div>
  );
};

export default Navbar;
