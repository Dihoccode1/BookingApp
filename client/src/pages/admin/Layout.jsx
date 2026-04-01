import React from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { Outlet } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";

const Layout = () => {
  return (
    <>
      <AdminNavBar />
      <div className="flex w-full">
        <AdminSideBar />
        {/* ĐÃ SỬA: h=[calc...] thành h-[calc...] */}
        <div className="h-[calc(100vh-64px)] flex-1 overflow-y-auto px-4 py-10 md:px-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
