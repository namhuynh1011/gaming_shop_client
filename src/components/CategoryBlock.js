import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./CategoryBlock.scss";
import CardProduct from "./ProductCard";

function CategoryBlock({ category, products, banner }) {
  return (
    <Box className="category-block" sx={{ mb: 5 }}>
      {/* Tiêu đề + banner nhỏ */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {category.categoryName}
        </Typography>
        {banner && (
          <img src={banner} alt="banner" style={{ height: 70, borderRadius: 10 }} />
        )}
      </Box>
      {/* Có thể thêm tab subcategory ở đây nếu có */}
      {/* Sản phẩm dạng ngang */}
      <Swiper
        spaceBetween={16}
        slidesPerView={5}
        breakpoints={{
          0: { slidesPerView: 2 },
          600: { slidesPerView: 3 },
          900: { slidesPerView: 5 }
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <CardProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box sx={{ textAlign: "right", mt: 1 }}>
        <Button size="small" href={`/category/${category.id}`}>
          Xem tất cả &gt;
        </Button>
      </Box>
    </Box>
  );
}

export default CategoryBlock;