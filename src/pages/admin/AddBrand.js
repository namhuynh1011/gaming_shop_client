import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { createBrand } from "../../api/brandApi";

function BrandAdd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    brandName: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBrand(form);
      navigate("/admin/brands");
    } catch (err) {
      alert("Lỗi khi lưu thương hiệu.");
    }
  };

  return (
    <Box className="product-add-root">
      <Paper className="product-add-paper">
        <Typography variant="h5" gutterBottom>
          Thêm thương hiệu mới
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Tên thương hiệu"
              name="brandName"
              value={form.brandName}
              onChange={handleChange}
              required
              inputProps={{ maxLength: 100 }}
              fullWidth
            />
            <Box>
              <Button type="submit" variant="contained" color="primary">
                Tạo mới
              </Button>
              <Button
                variant="text"
                sx={{ ml: 2 }}
                onClick={() => navigate("/admin/categories")}
              >
                Hủy
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default BrandAdd;