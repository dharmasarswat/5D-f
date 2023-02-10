import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const navLinks = [
  {
    link: "/add-script",
    text: "Add test script",
  },
  {
    link: "/all-scripts",
    text: "All scripts",
  },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            5D Solutions
          </Typography>

          {navLinks.map((link) => (
            <Button
              color="inherit"
              component={Link}
              to={link.link}
              key={link.link}
              disabled={link.link === location.pathname}
            >
              {link.text}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
