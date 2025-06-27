import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllProducts, deleteProduct, setProductHidden } from "../../api/productApi";

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

  const handleToggleHidden = async (id, currentHidden) => {
    try {
      await setProductHidden(id, !currentHidden);
      fetchProducts();
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái ẩn/hiện sản phẩm!");
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
              <TableCell>Tên</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Thương hiệu</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell align="center">Ẩn/Hiện</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} sx={p.isHidden ? { opacity: 0.5 } : {}}>
                <TableCell>{p.productName}</TableCell>
                <TableCell>{p.price?.toLocaleString("vi-VN")}</TableCell>
                <TableCell>{p.category?.categoryName}</TableCell>
                <TableCell>{p.brand?.brandName}</TableCell>
                <TableCell>
                  {p.imageUrl && (
                    <Avatar
                      src={`http://localhost:5038${p.imageUrl}`}
                      alt={p.productName}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title={p.isHidden ? "Hiện sản phẩm" : "Ẩn sản phẩm"}>
                    <IconButton
                      color={p.isHidden ? "warning" : "success"}
                      onClick={() => handleToggleHidden(p.id, p.isHidden)}
                    >
                      {p.isHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="info"
                    startIcon={<EditIcon />}
                    size="small"
                    component={Link}
                    to={`/admin/products/edit/${p.id}`}
                    sx={{ mr: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(p.id)}
                    size="small"
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

export default ProductManager;