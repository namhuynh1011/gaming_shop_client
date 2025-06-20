import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./CardProduct.scss";

function CardProduct({ product }) {
  const { addToCart } = useCart();

  return (
    <Card className="card-product">
      <CardMedia
        component="img"
        height="180"
        image={product.imageUrl ? `http://localhost:5038${product.imageUrl}` : "/no-image.jpg"}
        alt={product.productName}
      />
      <CardContent>
        <Typography variant="h6">{product.productName}</Typography>
        <Typography color="text.secondary">
          Giá: {product.price?.toLocaleString("vi-VN")}₫
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          component={Link}
          to={`/products/${product.id}`}
        >
          Xem chi tiết
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => addToCart(product)}
        >
          Thêm vào giỏ
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardProduct;