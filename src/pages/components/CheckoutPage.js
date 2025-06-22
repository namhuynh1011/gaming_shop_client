import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Paper,
  Divider,
  Alert,
  TextField,
} from "@mui/material";
import { useCart } from "../../components/CartContext";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../api/orderApi";

function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [payment, setPayment] = useState("cod");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0)
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Giỏ hàng trống
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
          Về trang sản phẩm
        </Button>
      </Box>
    );

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOrder = async () => {
    setError("");
    setSuccess("");
    if (!form.fullName || !form.phone || !form.address) {
      setError("Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ.");
      return;
    }
    // Chuẩn bị dữ liệu gửi lên API
    const orderData = {
      fullName: form.fullName,
      phone: form.phone,
      address: form.address,
      note: form.note,
      paymentMethod: payment,
      items: cart.map((item) => ({
        productId: item.id,
        productName: item.productName,
        productPrice: item.price,
        quantity: item.qty,
      })),
    };

    setLoading(true);
    try {
      const result = await addOrder(orderData);
      if (payment === "vnpay" && result.redirectUrl) {
        // Nếu trả về link VNPAY thì redirect
        window.location.href = result.redirectUrl;
        return;
      }
      setSuccess(result.message || "Đặt hàng thành công!");
      clearCart();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 550, mx: "auto", py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Xác nhận đặt hàng
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" gutterBottom>
          Tổng tiền: <b style={{ color: "#1976d2" }}>{total.toLocaleString("vi-VN")}₫</b>
        </Typography>

        <FormControl component="fieldset" sx={{ my: 2 }}>
          <FormLabel component="legend">Chọn phương thức thanh toán</FormLabel>
          <RadioGroup
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            row
          >
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label="Thanh toán khi nhận hàng (COD)"
            />
            <FormControlLabel
              value="vnpay"
              control={<Radio />}
              label="Thanh toán qua VNPay"
            />
          </RadioGroup>
        </FormControl>

        {/* Form nhận thông tin giao hàng, cho cả COD và VNPAY */}
        <TextField
          label="Họ và tên"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Số điện thoại"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Địa chỉ nhận hàng"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Ghi chú (tuỳ chọn)"
          name="note"
          value={form.note}
          onChange={handleChange}
          fullWidth
          multiline
          minRows={2}
          sx={{ mb: 2 }}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleOrder}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Đặt hàng"}
        </Button>
      </Paper>
    </Box>
  );
}

export default CheckoutPage;