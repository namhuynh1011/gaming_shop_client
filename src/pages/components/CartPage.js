import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../../components/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0)
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Giỏ hàng trống
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Mua sắm ngay
        </Button>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Giỏ hàng của bạn
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ảnh</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Thành tiền</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={
                      item.imageUrl
                        ? `http://localhost:5038${item.imageUrl}`
                        : "/no-image.jpg"
                    }
                    alt={item.productName}
                    width={60}
                    height={60}
                    style={{ objectFit: "contain" }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    {item.productName}
                  </Typography>
                </TableCell>
                <TableCell>{item.price?.toLocaleString("vi-VN")}₫</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    inputProps={{ min: 1, style: { width: 55 } }}
                    value={item.qty}
                    onChange={(e) =>
                      updateQty(item.id, Math.max(1, Number(e.target.value)))
                    }
                  />
                </TableCell>
                <TableCell>
                  {(item.price * item.qty)?.toLocaleString("vi-VN")}₫
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="h6">Tổng cộng:</Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography variant="h6" color="primary">
                  {total.toLocaleString("vi-VN")}₫
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Button
          variant="outlined"
          color="error"
          onClick={clearCart}
          sx={{ mr: 2 }}
        >
          Xóa toàn bộ giỏ hàng
        </Button>
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/checkout"
        >
          Thanh toán
        </Button>
      </Box>
    </Box>
  );
}

export default CartPage;
