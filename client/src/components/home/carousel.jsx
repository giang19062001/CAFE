import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Login } from "./login";
import "../../css/home/carousel.scss";

export const Carousel = () => {
  return (
    <Container sx={{ paddingY: 20 }}>
      <div className="flex">
        <div>
          <Typography variant="h4" className="mb-10 text-slate-50">
            Cà phê <br></br> <b className="text-orange-600">Thức uống</b> của
            riêng bạn
          </Typography>
          <Login></Login>
        </div>
        <div></div>
      </div>
    </Container>
  );
};
