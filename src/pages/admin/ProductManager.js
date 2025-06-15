import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllProducts, deleteProduct } from "../../api/productAPI";

function ProductManager() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      alert("Lỗi khi tải danh sách sản phẩm!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert("Lỗi khi xóa sản phẩm!");
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Danh sách Sản phẩm
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/admin/products/add"
        >
          Thêm sản phẩm
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Thương hiệu</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.id}</TableCell>
                <TableCell>{p.productName}</TableCell>
                <TableCell>{p.price?.toLocaleString("vi-VN")}</TableCell>
                <TableCell>{p.category?.categoryName}</TableCell>
                <TableCell>{p.brand?.brandName}</TableCell>
                <TableCell>
                  {p.images && p.images[0] && (
                    <Avatar
                      src={p.images[0].imageUrl}
                      alt={p.productName}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(p.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Không có sản phẩm nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProductManager;;