import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../css/admin/food.scss";
import { useDispatch, useSelector } from "react-redux";
import { postFood } from "../../redux/food/foodThunk";
import { selectSuccess } from "../../redux/food/foodSelector";
import { turnOffSuccess } from "../../redux/food/foodReducer";
import { fetchGood } from "../../redux/goods/goodThunk";
import { selectCart } from "../../redux/goods/goodSelector";
import { addCart, removeCart } from "../../redux/goods/goodReducer";

export const AddFood = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [item, setItem] = useState([]);
  const [goods, setGoods] = useState([]);
  const [data, setData] = useState({
    name: "",
    price: "",
    recipe: [],
    photo: "",
  });

  const dispatch = useDispatch();
  const success = useSelector(selectSuccess);
  const cart = useSelector(selectCart);

  useEffect(() => {
    dispatch(fetchGood()).then((res) => {
      setGoods(res.payload);
    });
  }, [dispatch]);
  const handleTurnOf = () => {
    dispatch(turnOffSuccess());
  };
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setData((pre) => ({ ...pre, photo: e.target.files[0] }));
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  const handleAddCart = () => {
    dispatch(addCart(item));
    setItem();
  };
  const handleRemoveCart = (id) => {
    dispatch(removeCart(id));
  };

  const handleAdd = () => {
    console.log("data", {...data,recipe: cart});
    dispatch(postFood({...data,recipe: cart}));
  };

  console.log("cart", cart);

  return (
    <Container>
      <Typography variant="h6" align="center" className="text-orange-500 ">
        Cafe
      </Typography>
      <Typography variant="h4" align="center" className="font-bold mb-6">
        <b>Thêm món mới</b>
      </Typography>
      <hr className="mb-12" />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          className="flex flex-col gap-2"
        >
          {selectedImage !== undefined ? (
            <div id="add__ImageBox">
              <img
                id="add__image"
                src={URL.createObjectURL(selectedImage)}
                alt=""
              />
              <Button id="button__add--image" onClick={removeSelectedImage}>
                Xóa
              </Button>
            </div>
          ) : (
            <Avatar
              src={require("../../assets/undefined.png")}
              className="w-80 h-80 mx-auto "
            />
          )}

          <label
            for="photo"
            className="p-2 rounded-full text-slate-50 bg-orange-500 w-22 mx-auto"
          >
            Chọn ảnh
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="photo"
            name="photo"
            accept="image/png, image/jpg, image/jpeg"
            onChange={imageChange}
          />
          <TextField
            type={"text"}
            name="name"
            label="tên món"
            onChange={(e) =>
              setData((pre) => ({ ...pre, name: e.target.value }))
            }
          ></TextField>
          <TextField
            type={"text"}
            name="price"
            label="giá món"
            onChange={(e) =>
              setData((pre) => ({ ...pre, price: e.target.value }))
            }
          ></TextField>
          <p>Nguyên liệu:</p>
          <Stack
            spacing={2}
            className="border-double border-4 border-orange-600 p-4 mb-6"
          >
            {cart?.map((item, index) => (
              <div className="flex flex-row items-center justify-center  gap-3">
                <b className="w-full">
                  {item.name} ({item.unit})
                </b>
                <b className="w-full">{item.quantity}</b>
                <button
                  onClick={() => handleRemoveCart(item._id)}
                  className="bg-red-500 text-slate-50 p-2 rounded-full hover:bg-red-600"
                >
                  Xóa
                </button>
              </div>
            ))}
          </Stack>
          <Button id="button__add" onClick={handleAdd}>
            Thêm món mới
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          lg={8}
          xl={8}
          className="flex flex-col  flex-nowrap "
        >
          {goods.map((good, index) => (
            <div
              className="flex flex-row items-center 	justify-center gap-3 m-2"
              key={index}
            >
              <b className="w-48">
                {good.name} ({good.unit})
              </b>
              <TextField
                type={"number"}
                label="Số lượng"
                defaultValue={0}
                key={good._id}
                onChange={(e) =>
                  setItem({
                    _id: good._id,
                    name: good.name,
                    quantity: parseInt(e.target.value),
                    unit: good.unit,
                  })
                }
              ></TextField>
              {item?._id && (
                <Button
                  disabled={item._id !== good._id}
                  onClick={() => handleAddCart()}
                  className="bg-orange-500 text-slate-50 p-2 rounded-full hover:bg-orange-600"
                >
                  Thêm nguyên liệu
                </Button>
              )}
            </div>
          ))}
        </Grid>
      </Grid>
      <hr className="my-5" />
      <Dialog open={success} onClose={handleTurnOf}>
        <DialogContent>
          <img src={require("../../assets/stickSuccess.gif")} alt="" />
          <Typography align="center">
            Thêm món mới {" "}
            <b className="text-green-500">thành công</b>
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
