import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./ProductCard.scss";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      productName: product.productName,
      price: product.price,
      qty: 1,
    });
  };

  return (
    <Card className="card-product">
      <CardMedia
        component="img"
        height="180"
        image={
          product.imageUrl
            ? `http://localhost:5038${product.imageUrl}`
            : "/no-image.jpg"
        }
        alt={product.productName}
      />
      <CardContent>
        <Typography variant="h6" className="product-name" gutterBottom>
          {product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Giá: {product.price?.toLocaleString("vi-VN")}₫
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          component={Link}
          to={`/product/${product.id}`}
        >
          Xem chi tiết
        </Button>
        <Button size="small" variant="contained" onClick={handleAdd}>
          Thêm vào giỏ
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
