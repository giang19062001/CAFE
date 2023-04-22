import {
  Button,
  Container,
  Dialog,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGood } from "../../redux/goods/goodThunk";
import { selectSuccess } from "../../redux/goods/goodSelector";
import { turnOfSuccess } from "../../redux/goods/goodReducer";

export const AddGoods = () => {
  const dispatch = useDispatch();
  const success = useSelector(selectSuccess);
  const handleTurnOf = () => {
    dispatch(turnOfSuccess());
  };

  const [data, setData] = useState({
    name: "",
    quantity: "",
    unit: "",
  });
  const handleAdd = () => {
    dispatch(createGood(data)).then(() => {
      setData({ name: "", quantity: "", unit: "" });
    });
  };
  return (
    <Container>
      <Typography variant="h6" align="center" className="text-orange-500 ">
        Cafe
      </Typography>
      <Typography variant="h4" align="center" className="font-bold mb-6">
        <b>Thông tin hàng hóa</b>
      </Typography>
      <Stack spacing={2} className="w-96 mx-auto">
        <TextField
          type={"text"}
          name="name"
          label="Tên hàng hóa"
          value={data?.name}
          onChange={(e) => setData((pre) => ({ ...pre, name: e.target.value }))}
        ></TextField>
        <TextField
          type={"text"}
          name="quantity"
          label="Số lượng"
          value={data?.quantity}
          onChange={(e) =>
            setData((pre) => ({ ...pre, quantity: e.target.value }))
          }
        ></TextField>
        <TextField
          type={"text"}
          name="unit"
          label="Đơn vị"
          value={data?.unit}
          onChange={(e) => setData((pre) => ({ ...pre, unit: e.target.value }))}
        ></TextField>
      </Stack>

      <hr className="my-5" />
      <Button id="button__add" onClick={handleAdd}>
        Thêm hàng hóa
      </Button>
      <Dialog open={success} onClose={handleTurnOf}>
        <DialogContent>
          <img src={require("../../assets/stickSuccess.gif")} alt="" />
          <Typography align="center">
            Thêm hàng hóa <b className="text-green-500">thành công</b>
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
