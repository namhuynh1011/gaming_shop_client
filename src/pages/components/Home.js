import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getAllProducts } from "../../api/productAPI";
import CardProduct from "../../components/CardProduct";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <Box>
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Chào mừng đến với Gaming Shop!
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ px: 3 }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <CardProduct product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;