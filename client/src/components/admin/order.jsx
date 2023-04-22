import {
  Avatar,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder, updateOrder } from "../../redux/order/orderThunk";
import { formatter } from "../../utils/custom";
import "../../css/admin/order.scss";
import { selectUser } from "../../redux/user/userSelector";

export default function Order() {
  const user = useSelector(selectUser);

  const [data, setData] = React.useState([]);
  const [openDialogSuccess, setOpenDialogSuccess] = React.useState(false);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchOrder()).then((res) => {
      setData(res.payload);
    });
  }, [dispatch]);

  const handleChange = (value) => {
    dispatch(updateOrder(value)).then(() => {
      setOpenDialogSuccess(true);
      dispatch(fetchOrder()).then((res) => {
        setData(res.payload);
      });
    });
  };

  console.log("data", data);
  return (
    <Container>
      <hr className="my-6" />

      <Typography variant="h4" align="center" className="font-bold ">
        Danh sách <b className="text-orange-500">đơn hàng</b>
      </Typography>

      <hr className="my-6" />
      {data?.map((element, index) => (
        <div>
          <Typography
            className="ml-12 mb-12 text-orange-500  border-b-4 border-orange-500"
            variant="h1"
          >
            {index + 1}
          </Typography>

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

              {element.status === "Đã xong" ? (
                <p>
                  Tình trạng:{" "}
                  <b className="bg-green-500 rounded-full p-2 font-bold text-lg text-slate-50 w-24">
                    {" "}
                    Đã xong
                  </b>
                </p>
              ) : (
                user.roles === "WAITER" ?(
                  <p>
                  Tình trạng:{" "}
                  <b className="bg-yellow-400 rounded-full p-2 font-bold text-lg text-slate-50 w-24">
                    {" "}
                    Đang thực hiện

                  </b>
                </p>
                ):(
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    defaultValue={element.status}
                    label="Status"
                    onChange={(e) =>
                      handleChange({ id: element._id, status: e.target.value })
                    }
                  >
                    <MenuItem
                      value={"Đang thực hiện"}
                      className="text-yellow-500"
                      disabled={element.status === "Đã xong"}
                    >
                      Đang thực hiện
                    </MenuItem>
                    <MenuItem value={"Đã xong"} className="text-green-500">
                      Đã xong
                    </MenuItem>
                  </Select>
                </FormControl>
                )
               
              )}
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
      <Dialog
        open={openDialogSuccess}
        onClose={() => setOpenDialogSuccess(false)}
      >
        <DialogContent>
          <img src={require("../../assets/stickSuccess.gif")} alt="" />
          <Typography align="center">
            Thay đổi hóa đơn <b className="text-green-500">thành công</b>
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
