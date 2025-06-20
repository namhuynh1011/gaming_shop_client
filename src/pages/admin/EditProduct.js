import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { getProductById, updateProduct } from "../../api/productAPI";
import { getAllCategories } from "../../api/categoryApi";
import { getAllBrands } from "../../api/brandApi";

function ProductEditPage() {
  const { id } = useParams();
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
  const [oldImageUrl, setOldImageUrl] = useState(null);

  useEffect(() => {
    getAllCategories().then((res) => setCategories(res.data));
    getAllBrands().then((res) => setBrands(res.data));
    getProductById(id).then((res) => {
      const p = res.data;
      setForm({
        productName: p.productName || "",
        price: p.price || "",
        description: p.description || "",
        categoryId: p.category?.id ? `${p.category.id}` : "",
        brandId: p.brand?.id ? `${p.brand.id}` : "",
      });
      setOldImageUrl(p.imageUrl || null);
    });
  }, [id]);

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
      await updateProduct(id, data);
      navigate("/admin/products");
    } catch (err) {
      alert("Lỗi khi cập nhật sản phẩm.");
    }
  };

  return (
    <Box sx={{ maxWidth: 540, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sửa sản phẩm
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
            >
              Chọn ảnh mới (nếu muốn thay)
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </Button>
            {(preview || oldImageUrl) && (
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  variant="rounded"
                  src={
                    preview
                      ? preview
                      : oldImageUrl
                      ? `http://localhost:5038${oldImageUrl}`
                      : undefined
                  }
                  alt={form.productName}
                  sx={{ width: 64, height: 64, border: "1px solid #eee" }}
                />
                <Typography variant="body2" color="text.secondary">
                  Ảnh đang sử dụng
                </Typography>
              </Box>
            )}
            <Box>
              <Button type="submit" variant="contained" color="primary">
                Lưu thay đổi
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

export default ProductEditPage;
