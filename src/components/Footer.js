import React from "react";
import { Box, Typography, Link, Container } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#212121",
        color: "#fff",
        py: 3,
        mt: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body1" sx={{ mb: { xs: 2, md: 0 } }}>
          &copy; {new Date().getFullYear()} Gaming Shop. All rights reserved.
        </Typography>
        <Box>
          <Link href="/" color="inherit" underline="none" sx={{ mx: 1 }}>
            Trang chủ
          </Link>
          <Link href="/about" color="inherit" underline="none" sx={{ mx: 1 }}>
            Về chúng tôi
          </Link>
          <Link href="/lien-he" color="inherit" underline="none" sx={{ mx: 1 }}>
            Liên hệ
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;