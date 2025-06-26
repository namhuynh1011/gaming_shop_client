import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getAllBrands,
  deleteBrand,
} from "../../api/brandApi";

function BrandsManager() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await getAllBrands();
      setBrands(res.data);
    } catch (err) {
      alert("Lỗi khi tải thương hiệu!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa thương hiệu này không?")) return;
    try {
      await deleteBrand(id);
      fetchBrands();
    } catch (err) {
      alert("Lỗi khi xóa thương hiệu!");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Danh sách thương hiệu
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/admin/brands/add"
        >
          Thêm thương hiệu
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên thương hiệu</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.brandName}</TableCell>
                <TableCell>{c.description}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="info"
                    startIcon={<EditIcon />}
                    size="small"
                    component={Link}
                    to={`/admin/brands/edit/${c.id}`}
                    sx={{ mr: 1 }}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(c.id)}
                    size="small"
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {brands.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Không có thương hiệu nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BrandsManager;