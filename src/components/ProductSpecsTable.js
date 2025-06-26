import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const ProductSpecsTable = ({ specs }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
      Thông số kỹ thuật
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><b>Tên thông số</b></TableCell>
          <TableCell><b>Giá trị</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {specs.map((row, idx) => (
          <TableRow key={idx} sx={idx % 2 ? { background: "#f5f5f5" } : {}}>
            <TableCell sx={{ fontWeight: 600, width: 180 }}>{row.name}</TableCell>
            <TableCell>
              {Array.isArray(row.value) ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {row.value.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                row.value
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ProductSpecsTable;