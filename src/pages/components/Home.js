import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getAllProducts } from "../../api/productApi";
import { getAllCategories } from "../../api/categoryApi";
import BannerCarousel from "../../components/BannerCarousel";
import CategoryBlock from "../../components/CategoryBlock";

// Dummy banner cho từng category (bạn nên thay bằng banner thực hoặc lấy từ API)
// const categoryBanners = {
//   1: require("../../assets/ssd-banner.jpg"),
//   2: require("../../assets/ram-banner.jpg"),
//   // ... các category khác
// };

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
    getAllCategories().then((res) => setCategories(res.data));
  }, []);

  return (
    <Box>
      <BannerCarousel />

      {/* Hiển thị từng block danh mục */}
      {categories.map((cat) => (
        <CategoryBlock
          key={cat.id}
          category={cat}
          // banner={categoryBanners[cat.id]} // hoặc cat.banner nếu có từ API
          products={products.filter((p) => p.categoryId === cat.id).slice(0, 10)}
        />
      ))}
    </Box>
  );
}

export default Home;