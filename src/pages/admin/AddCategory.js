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
import { createCategory } from "../../api/categoryApi";

function CategoryAdd() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    categoryName: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(form);
      navigate("/admin/categories");
    } catch (err) {
      alert("Lỗi khi lưu danh mục.");
    }
  };

  return (
    <Box className="product-add-root">
      <Paper className="product-add-paper">
        <Typography variant="h5" gutterBottom>
          Thêm danh mục mới
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Tên danh mục"
              name="categoryName"
              value={form.categoryName}
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

export default CategoryAdd;