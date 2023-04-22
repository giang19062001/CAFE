import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTableCell, StyledTableRow } from "../../utils/custom";
import {
  Button,
  Dialog,
  DialogContent,
  Paper,

  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import "../../css/admin/user.scss";
import { fetchGood, updateGood } from "../../redux/goods/goodThunk";

const EditGood = () => {
  const [list, setList] = React.useState([]);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [goodEdit, setGoodEdit] = React.useState();

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchGood()).then((res) => {
      setList(res.payload);
    });
  }, [dispatch]);



  const hanldeSave = () => {
    dispatch(updateGood(goodEdit)).then(() => {
      setOpenDialogEdit(false);
      dispatch(fetchGood()).then((res) => {
        setList(res.payload);
      });
    });
  };
  return (
    <div>
       <Typography variant="h6" align="center" className="text-orange-500 ">
        Cafe
      </Typography>
      <Typography variant="h4" align="center" className="font-bold mb-6">
        <b>Danh sách nhân viên</b>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Tên hàng hóa</StyledTableCell>
              <StyledTableCell align="center">Số lượng</StyledTableCell>
              <StyledTableCell align="center">Đơn vị</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                <StyledTableCell align="center">{row.unit}</StyledTableCell>

                <StyledTableCell>
                <Button
                      id="button__edit--user"
                      onClick={() => {
                        setGoodEdit(row);
                        setOpenDialogEdit(true);
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialogEdit} onClose={() => setOpenDialogEdit(false)}>
        <DialogContent className="flex flex-col gap-5">
          <Typography variant="h5" align="center" className="font-bold mt-2">
            Chỉnh sửa <b className="text-orange-500">hàng hóa</b>
          </Typography>
          <TextField
            type={"text"}
            name="name"
            label="Tên hàng hóa"
            defaultValue={goodEdit?.name}
            InputProps={{
                readOnly: true,
              }}
            onChange={(e) =>
              setGoodEdit((pre) => ({ ...pre, name: e.target.value }))
            }
          ></TextField>
          <TextField
            type={"text"}
            name="unit"
            label="Đơn vị"
            defaultValue={goodEdit?.unit}
            InputProps={{
                readOnly: true,
              }}
          ></TextField>
             <TextField
            type={"text"}
            name="quantity"
            label="Số lượng"
            defaultValue={goodEdit?.quantity}
            onChange={(e) =>
                setGoodEdit((pre) => ({ ...pre, quantity: e.target.value }))
            }
          ></TextField>
   
          <Button id="button__edit--user" onClick={hanldeSave}>
            Lưu
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditGood;
