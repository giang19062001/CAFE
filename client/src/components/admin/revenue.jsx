import React, { useState } from "react";
import {
  Avatar,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderRevenue } from "../../redux/order/orderThunk";
import { formatter } from "../../utils/custom";

export const Revenue = () => {
  const [time, setTime] = useState();
  const [list, setList] = useState();

  const dispatch = useDispatch();
  const handleFilter = () => {
    dispatch(fetchOrderRevenue(time)).then((res) => {
      setList(res.payload);
    });
  };
  return (
    <Container>
      <div className="flex flex-col gap-5">
        <Typography variant="h4" align="center" className="font-bold ">
          Tìm kiếm <b className="text-orange-500">hóa đơn </b> theo ngày
        </Typography>
        <TextField
          type="date"
          className="mx-auto "
          required
          onChange={(e) => setTime(e.target.value)}
        ></TextField>
        <button
          className="bg-orange-500 text-slate-50 rounded-lg p-2 mx-auto block my-6 w-32"
          onClick={handleFilter}
        >
          Lọc
        </button>
      </div>
      <hr />

      {list?.map((element, index) => (
        <div className="my-6">
          <Grid spacing={2} container>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              {element?.orderDetail.map((child, indexChild) => (
                <Stack
                  direction={"row"}
                  justifyContent="center"
                  alignItems={"center"}
                  key={indexChild}
                  className="mb-2"
                  spacing={4}
                >
                  <Avatar
                    variant="square"
                    src={process.env.REACT_APP_SERVER + "/food/" + child?.photo}
                    className="w-48 h-48"
                  />
                  <div>
                    <Typography>{child.name}</Typography>
                    <Typography className="text-red-500 font-bold">
                      {" "}
                      {formatter.format(child.price)}
                    </Typography>
                    <Typography>Số lượng: {child.quantity}</Typography>
                  </div>
                </Stack>
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              className="flex gap-5 flex-col"
            >
              <Typography>
                Tổng hóa đơn:{" "}
                <b className="text-red-500 font-bold">
                  {formatter.format(element.total)}
                </b>
              </Typography>

              <Typography>
                Ngày tạo hóa đơn:{" "}
                <span className=" border-b-4 border-sky-500">
                  {new Date(element.createdAt).toLocaleString()}
                </span>
              </Typography>
              <p>Lượng nguyên liệu tiêu hao:</p>
              <div className="flex flex-wrap gap-10 border-double border-4 border-orange-600 p-2 w-80 ">
                {element.ingredient?.map((ele, indexChild) => (
                  <div key={indexChild}>
                    <b>{ele?.name}</b>
                    <p>{ele?.quantity}</p>
                    <p>{ele?.unit}</p>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
          <hr className="my-4" />
        </div>
      ))}
      <Typography align="center" className="my-6 text-2xl">
        Tổng danh thu của ngày <b>{time}</b>:
        <b className="text-red-500">
          {" "}
          {formatter.format(
            list?.reduce(
              (preValue, currentValue) => preValue + currentValue.total,
              0
            )
          )}
        </b>
      </Typography>
    </Container>
  );
};
