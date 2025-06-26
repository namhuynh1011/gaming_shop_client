import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, Divider, CircularProgress, TextField } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import { useCart } from "../../components/CartContext";
import ProductSpecsTable from "../../components/ProductSpecsTable";
import { parseSpecs } from "../../components/utils/parseSpecs";

const BACKEND_URL = "http://localhost:5038";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (!product)
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h5">Không tìm thấy sản phẩm</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
          Quay về trang chủ
        </Button>
      </Box>
    );

  let imageSrc = product.imageUrl
    ? product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${BACKEND_URL}${product.imageUrl}`
    : "/no-image.jpg";

  // Parse thông số kỹ thuật từ description
  const specs = parseSpecs(product.description);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 4 }}>
      <Paper sx={{ p: 3, display: "flex", gap: 4 }}>
        <Box sx={{ flex: "0 0 320px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
          <img
            src={imageSrc}
            alt={product.productName || "Sản phẩm"}
            style={{
              width: "100%",
              maxWidth: 320,
              height: 240,
              objectFit: "contain",
              borderRadius: 8,
              background: "#fafbfc",
              border: "1px solid #eee",
            }}
            onError={e => { e.target.src = "/no-image.jpg"; }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            {product.productName}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ color: "#1976d2", mb: 2 }}>
            {product.price?.toLocaleString("vi-VN")}₫
          </Typography>
          {/* Hiển thị bảng thông số kỹ thuật */}
          <ProductSpecsTable specs={specs} />
          <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <TextField
              label="Số lượng"
              type="number"
              size="small"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              inputProps={{ min: 1 }}
              sx={{ width: 100, mr: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart({
                id: product.id,
                productName: product.productName,
                price: product.price,
                qty: Number(qty),
                imageUrl: product.imageUrl,
              })}
              size="large"
            >
              Thêm vào giỏ hàng
            </Button>
          </Box>
          <Button variant="text" sx={{ mt: 2 }} onClick={() => navigate("/")}>
            &larr; Quay về danh sách sản phẩm
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductDetailPage;