import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import "../../styles/components/ProductPage.scss";
import { getAllProducts } from "../../api/productApi";
import { getAllCategories } from "../../api/categoryApi";
import { getAllBrands } from "../../api/brandApi";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // "asc" | "desc"
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    // Lấy sản phẩm
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
    // Lấy category
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
    // Lấy brand
    getAllBrands()
      .then((res) => setBrands(res.data))
      .catch(() => setBrands([]));
  }, []);
  const filteredProducts = useMemo(() => {
    let result = products;
    if (search) {
      result = result.filter((p) =>
        (p.name || p.productName || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }
    if (category) {
      result = result.filter((p) => String(p.categoryId) === category);
    }
    if (brand) {
      result = result.filter((p) => String(p.brandId) === brand);
    }
    if (sort === "asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "desc")
      result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [products, search, category, brand, sort]);

  return (
    <div className="products-page">
      <div className="sidebar">
        <h3>Lọc sản phẩm</h3>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="filter-section">
          <label>Sắp xếp theo giá:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">--Chọn--</option>
            <option value="asc">Giá thấp đến cao</option>
            <option value="desc">Giá cao đến thấp</option>
          </select>
        </div>
        <div className="filter-section">
          <label>Loại sản phẩm:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">--Tất cả--</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-section">
          <label>Hãng:</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">--Tất cả--</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.brandName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>Không tìm thấy sản phẩm phù hợp.</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
