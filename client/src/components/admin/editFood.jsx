import {
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFood, fetchFoods, putFood } from "../../redux/food/foodThunk";
import "../../css/admin/food.scss";
import { formatter } from "../../utils/custom";

export const EditFood = () => {
  const [list, setList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [detail, setDetail] = useState();
  const [photoInit, setPhotoInit] = useState();

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setDetail((pre) => ({ ...pre, photo: e.target.files[0] }));
    }
  };
  const removeSelectedImage = () => {
    setDetail((pre) => ({ ...pre, photo: photoInit }));

    setSelectedImage();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFoods()).then((res) => {
      setList(res.payload);
    });
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteFood(id)).then(() => {
      dispatch(fetchFoods()).then((res) => {
        setList(res.payload);
      });
    });
  };

  const handleSave = () => {
    console.log("detail",detail)
    dispatch(putFood(detail)).then(() => {
      setOpenDialog(false);
      dispatch(fetchFoods()).then((res) => {
        setList(res.payload);
      });
    });
  };

  return (
    <Container className="mb-12">
      <hr style={{ marginBottom: 10 }} />
      <Typography variant="h6" align="center" className="text-orange-500 ">
        Cafe
      </Typography>
      <Typography variant="h4" align="center" className="font-bold ">
        <b>Danh sách đồ uống</b>
      </Typography>
      <div>
        {list?.map((data, index) => (
          <Grid
            container
            sx={{ marginY: 5 }}
            spacing={2}
            className="flex items-center"
          >
            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
              <img
                src={process.env.REACT_APP_SERVER + "/food/" + data?.photo}
                className="rounded-lg w-96"
                alt=""
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={7}
              md={7}
              lg={7}
              xl={7}
              className="flex flex-col gap-2"
            >
              <Typography>{data.name}</Typography>
              <Typography className="text-red-500 font-bold">
                {formatter.format(data.price)}
              </Typography>
              <Typography style={{ textAlign: "justify" }}>
                {data.unit}
              </Typography>
              <div className="border-double border-4 border-orange-600 p-4 w-80 my-2">
                {data.recipe.map((value, index) => (
                  <div key={value._id} className="flex gap-2">
                    <b>{value.name} :</b>
                    <b>{value.quantity}</b>
                    <b>{value.unit}</b>
                  </div>
                ))}
              </div>

              <Stack direction={"row"} spacing={3}>
                <Button
                  id="food_button--update"
                  onClick={() => {
                    setOpenDialog(true);
                    setDetail(data);
                    setPhotoInit(data?.photo);
                  }}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  id="food_button--delete"
                  onClick={() => handleDelete(data._id)}
                >
                  Xóa
                </Button>
              </Stack>
            </Grid>
          </Grid>
        ))}
      </div>
      <Dialog
        open={openDialog}
        fullWidth
        maxWidth="sm"
        onClose={() => {
          setOpenDialog(false);
          setSelectedImage();
        }}
      >
        <DialogContent>
          <div
            sx={{ marginY: 5 }}
          >
              {selectedImage !== undefined ? (
                <div id="add__ImageBox">
                  <img
                    id="add__image "
                    className="w-96  mx-auto mb-3"
                    src={URL.createObjectURL(selectedImage)}
                    alt=""
                  />
                  <Button id="button__add--image" onClick={removeSelectedImage}>
                    Xóa
                  </Button>
                </div>
              ) : (
                <img
                  src={process.env.REACT_APP_SERVER + "/food/" + detail?.photo}
                  className="rounded-lg w-96 mx-auto mb-3"
                  alt=""
                />
              )}

              <label
                for="photo"
                className="p-2 rounded-full text-slate-50 bg-orange-500 w-28 "
                style={{ display: "block", margin: "0 auto" }}
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
             <div className="flex flex-col gap-2 w-96 mx-auto my-6">
             <TextField
                defaultValue={detail?.name}
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
              <TextField
                defaultValue={detail?.price}
                onChange={(e) =>
                  setDetail((pre) => ({ ...pre, price: e.target.value }))
                }
              ></TextField>
             </div>
         
            </div>
          <Button id="button__save" onClick={handleSave}>
            Lưu
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
