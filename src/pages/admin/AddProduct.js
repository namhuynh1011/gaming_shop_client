import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Stack,
  Avatar,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createProduct } from "../../api/productApi";
import { getAllCategories } from "../../api/categoryApi";
import { getAllBrands } from "../../api/brandApi";
import "../../styles/admin/AddProduct.scss";

function ProductAddPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    productName: "",
    price: "",
    description: "",
    categoryId: "",
    brandId: "",
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res.data));
    getAllBrands().then((res) => setBrands(res.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        ...form,
        price: parseFloat(form.price),
        categoryId: parseInt(form.categoryId),
        brandId: parseInt(form.brandId),
        imageFile: selectedFile,
      };
      await createProduct(data);
      navigate("/admin/products");
    } catch (err) {
      alert("Lỗi khi lưu sản phẩm.");
    }
  };

  return (
    <Box className="product-add-root">
      <Paper className="product-add-paper">
        <Typography variant="h5" gutterBottom>
          Thêm sản phẩm mới
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Tên sản phẩm"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              required
              inputProps={{ maxLength: 100 }}
              fullWidth
            />
            <TextField
              label="Giá"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              inputProps={{ min: 0 }}
              fullWidth
            />
            <TextField
              label="Mô tả"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              select
              label="Danh mục"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="">--Chọn--</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Thương hiệu"
              name="brandId"
              value={form.brandId}
              onChange={handleChange}
              required
              fullWidth
            >
              <MenuItem value="">--Chọn--</MenuItem>
              {brands.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.brandName}
                </MenuItem>
              ))}
            </TextField>
            <Button
              component="label"
              variant="outlined"
              startIcon={<AddPhotoAlternateIcon />}
              className="product-add-upload-btn"
            >
              Chọn ảnh sản phẩm
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {preview && (
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  variant="rounded"
                  src={preview}
                  alt="Preview"
                  sx={{ width: 64, height: 64, border: "1px solid #eee" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {selectedFile && selectedFile.name}
                </Typography>
              </Box>
            )}
            <Box>
              <Button type="submit" variant="contained" color="primary">
                Tạo mới
              </Button>
              <Button
                variant="text"
                sx={{ ml: 2 }}
                onClick={() => navigate("/admin/products")}
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

export default ProductAddPage;