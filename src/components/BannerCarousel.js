import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./BannerCarousel.scss";

const banners = [
  require("../assets/img/slider1_1.jpg"),
  require("../assets/img/slider1_3.jpg"),
  require("../assets/img/slider1_5.jpg"),
  // Thêm đường dẫn các banner khác nếu có
];

function BannerCarousel() {
  return (
    <div className="banner-carousel">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        slidesPerView={1}
        style={{ borderRadius: 12, overflow: "hidden" }}
      >
        {banners.map((b, idx) => (
          <SwiperSlide key={idx}>
            <img src={b} alt={`Banner ${idx + 1}`} className="banner-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerCarousel;