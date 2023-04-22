import {
  Button,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, createUser } from "../../redux/user/userThunk";
import { selectSuccess } from "../../redux/user/userSelector";
import { turnOfSuccess } from "../../redux/user/userReducer";

export const AddUser = () => {
  const dispatch = useDispatch();
  const success = useSelector(selectSuccess);
  const handleTurnOf = () => {
    dispatch(turnOfSuccess());
  };

  const [data, setData] = useState({
    fullname: "",
    phone: "",
    password: "",
    roles: "",
  });
  const [error, setError] = useState({
    open: false,
    message: "",
  });
  useEffect(() => {
    dispatch(checkUser(data?.phone)).then((res) => {
      if (res.payload === true) {
        setError({ open: true, message: "Số điện thoại đã được đăng ký" });
      } else {
        setError({ open: false, message: "" });
      }
    });
  }, [data?.phone, dispatch]);
  const handleAdd = () => {
    dispatch(createUser(data)).then(() => {
      setData({ fullname: "", phone: "", password: "", roles: "" });
    });
  };
  return (
    <Container>
      <Typography variant="h6" align="center" className="text-orange-500 ">
        Cafe
      </Typography>
      <Typography variant="h4" align="center" className="font-bold mb-6">
        <b>Thông tin nhân viên</b>
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="flex flex-col gap-2"
        >
          <TextField
            type={"text"}
            name="fullname"
            label="Họ tên"
            value={data?.fullname}
            onChange={(e) =>
              setData((pre) => ({ ...pre, fullname: e.target.value }))
            }
          ></TextField>
          <TextField
            type={"text"}
            name="phone"
            label="Số điện thoại"
            value={data?.phone}
            onChange={(e) =>
              setData((pre) => ({ ...pre, phone: e.target.value }))
            }
            error={error.open === true}
            helperText={error.message}
          ></TextField>
          <TextField
            type={"text"}
            name="password"
            label="Mật khẩu"
            value={data?.password}
            onChange={(e) =>
              setData((pre) => ({ ...pre, password: e.target.value }))
            }
          ></TextField>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          className="flex flex-col gap-2"
        >
          <FormControl>
            <FormLabel>Chức vụ</FormLabel>
            <RadioGroup
              value={data?.roles}
              onChange={(e) =>
                setData((pre) => ({ ...pre, roles: e.target.value }))
              }
            >
              <FormControlLabel
                value="BARTENDER"
                control={<Radio />}
                label="Pha chế"
              />
              <FormControlLabel
                value="WAITER"
                control={<Radio />}
                label="Phục vụ"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <hr className="my-5" />
      <Button id="button__add" onClick={handleAdd}>
        Thêm nhân viên mới
      </Button>
      <Dialog open={success} onClose={handleTurnOf}>
        <DialogContent>
          <img src={require("../../assets/stickSuccess.gif")} alt="" />
          <Typography align="center">
            Thêm nhân viên <b className="text-green-500">thành công</b>
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
