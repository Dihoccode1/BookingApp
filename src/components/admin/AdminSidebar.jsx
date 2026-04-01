import React from "react";
import { assets } from "../../assets/assets";
// ĐÃ SỬA: Xóa bỏ đuôi chữ "Icon" để không bị lỗi với thư viện lucide-react bản mới
import { LayoutDashboard, ListCollapse, List, PlusSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSideBar = () => {
  const user = {
    firstName: "Admin ",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavLinks = [
    { name: "Bản điều khiển", path: "/admin", icon: LayoutDashboard },
    { name: "Thêm xuất chiếu", path: "/admin/add-shows", icon: PlusSquare },
    { name: "Danh sách xuất chiếu", path: "/admin/list-shows", icon: List },
    {
      name: "Danh sách vé đặt",
      path: "/admin/list-bookings",
      icon: ListCollapse,
    },
  ];

  return (
    // ĐÃ SỬA: Đóng ngoặc vuông cho h-[calc(...)], thêm shrink-0 để Sidebar không bị ép nhỏ
    <div className="flex h-[calc(100vh-64px)] w-full max-w-14 shrink-0 flex-col items-center border-r border-gray-300/20 pt-8 text-sm md:max-w-60">
      <img
        src={user.imageUrl}
        alt="Admin Profile"
        className="mx-auto h-9 w-9 rounded-full md:h-14 md:w-14"
      />
      <p className="mt-2 text-base font-medium max-md:hidden">
        {user.firstName}
        {user.lastName}
      </p>

      <div className="mt-6 w-full">
        {adminNavLinks.map((link, index) => {
          // ĐÃ SỬA: Lôi icon ra một biến viết HOA để React nhận diện đúng là Component
          const Icon = link.icon;

          return (
            <NavLink
              key={index}
              to={link.path}
              end // Thêm "end" để tránh lỗi lúc nào cũng sáng đèn ở mục Dashboard
              className={({ isActive }) =>
                `relative flex w-full items-center gap-2 py-2.5 text-gray-400 max-md:justify-center md:pl-10 ${
                  isActive
                    ? "bg-primary/20 text-primary group"
                    : "hover:bg-gray-300/10"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Sử dụng thẻ <Icon /> viết hoa */}
                  <Icon className="h-5 w-5" />
                  <p className="max-md:hidden">{link.name}</p>
                  <span
                    className={`absolute right-0 h-10 w-1.5 rounded-l transition-colors ${
                      isActive ? "bg-primary" : "bg-transparent"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

// ĐÃ SỬA: Export default để file Layout.jsx có thể import được dễ dàng
export default AdminSideBar;
