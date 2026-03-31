import React from "react";
import logo from "../assets/logo.svg";
const Footer = () => {
  return (
    <>
      <footer className="w-full px-6 pt-8 text-gray-300 md:px-16 lg:px-36">
        <div className="flex w-full flex-col justify-between gap-10 border-b border-gray-500 pb-10 md:flex-row">
          <div className="md:max-w-96">
            <img alt="" className="h-11" src={logo} />
            <p className="mt-6 text-sm">
              Đây là nền tảng đặt vé xem phim trực tuyến, giúp bạn dễ dàng lựa
              chọn phim, suất chiếu và rạp phù hợp. Trải nghiệm đặt vé nhanh
              chóng, tiện lợi và hiện đại ngay tại nhà.
            </p>
          </div>
          <div className="flex flex-1 items-start gap-20 md:justify-end md:gap-40">
            <div>
              <h2 className="mb-5 font-semibold">Company</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#">Trang chủ</a>
                </li>
                <li>
                  <a href="#">Giới thiệu</a>
                </li>
                <li>
                  <a href="#">Liên hệ</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-5 font-semibold">Get in touch</h2>
              <div className="space-y-2 text-sm">
                <p>+84-833-866-228</p>
                <p>khdidenroiday@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
