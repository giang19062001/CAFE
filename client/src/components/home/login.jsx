import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import KeyIcon from "@mui/icons-material/Key";
import "../../css/home/carousel.scss";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user/userThunk";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({
    open: false,
    message: "",
  });

  const handleLogin = () => {
    dispatch(login(data)).then((res) => {
      console.log(res);

      if (
        res.payload === "Người dùng không tồn tại" ||
        res.payload === "Sai mật khẩu"
      ) {
        setError({ open: true, message: res.payload });
      } else {
        navigate("/admin");
      }
    });
  };
  return (
    <div>
      <Typography align="center" className="font-bold text-2xl text-orange-500">
        <b>ĐĂNG NHẬP</b>
      </Typography>

      <Stack
        spacing={2}
        sx={{ margin: 2 }}
        className="bg-slate-50 p-6 rounded-lg"
      >
        <TextField
          type={"text"}
          label="Phone"
          variant="outlined"
          onChange={(e) =>
            setData((pre) => ({ ...pre, phone: e.target.value }))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalPhoneIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <TextField
          type={"password"}
          label="Password"
          variant="outlined"
          onChange={(e) =>
            setData((pre) => ({ ...pre, password: e.target.value }))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Stack>
      {error.open === true ? (
        <Typography
          align="center"
          className="bg-red-500 text-slate-50 mb-6 rounded-full w-60 mx-auto"
        >
          {error.message}
        </Typography>
      ) : null}
      <Button id="button__login" onClick={handleLogin}>
      ĐĂNG NHẬP
      </Button>
    </div>
  );
};
