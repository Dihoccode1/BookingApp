import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"; // Nhớ import thêm Navigate
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import SeatLayout from "./pages/SeatLayout";
import MyBooking from "./pages/MyBooking";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddShow from "./pages/admin/Addshow";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  // TODO: Thay thế biến này bằng logic xác thực thật của bạn (từ Context, Redux hoặc Clerk)
  // Ví dụ: const { user } = useAppContext(); const isAdmin = user?.role === 'admin';
  const isAuthenticatedAdmin = true;

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* --- CÁC ROUTE CỦA NGƯỜI DÙNG BÌNH THƯỜNG --- */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBooking />} />

        {/* --- CÁC ROUTE CỦA ADMIN (ĐÃ ĐƯỢC BẢO VỆ VÀ BỌC LẠI) --- */}
        {/* Nếu không phải admin, Navigate sẽ tự động đá người dùng về trang chủ "/" */}
        <Route
          path="/admin"
          element={
            isAuthenticatedAdmin ? <Layout /> : <Navigate to="/" replace />
          }
        >
          {/* Các route con này sẽ được render vào thẻ <Outlet /> trong Layout.jsx */}
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShow />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
