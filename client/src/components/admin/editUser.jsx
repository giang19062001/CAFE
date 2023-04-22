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
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../../redux/user/userThunk";
import "../../css/admin/user.scss";

const EditUser = () => {
  const [list, setList] = React.useState([]);
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const [userEdit, setUserEdit] = React.useState();

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchUser()).then((res) => {
      setList(res.payload);
    });
  }, [dispatch]);


  const hanldeSave = () => {
    dispatch(updateUser(userEdit)).then(() => {
      setOpenDialogEdit(false);
      dispatch(fetchUser()).then((res) => {
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
              <StyledTableCell align="center">Họ tên</StyledTableCell>
              <StyledTableCell align="center">Số điện thoại</StyledTableCell>
              <StyledTableCell align="center">Chức vụ</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.fullname}</StyledTableCell>
                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.roles === "WAITER" ? (
                    <b className="bg-green-500 text-slate-50 rounded-full p-2">Phục vụ</b>
                  ) :row.roles === "BARTENDER" ? (
                    <b className="bg-sky-500 text-slate-50 rounded-full p-2">Pha chế</b>
                  ) : <b className="bg-red-500 text-slate-50 rounded-full p-2">Chủ</b>}
                </StyledTableCell>
                <StyledTableCell>
                 
                    <Button
                      id="button__edit--user"
                      onClick={() => {
                        setUserEdit(row);
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
            Chỉnh sửa <b className="text-orange-500">nhân viên</b>
          </Typography>
          <TextField
            type={"text"}
            name="fullname"
            label="fullname"
            defaultValue={userEdit?.fullname}
            onChange={(e) =>
              setUserEdit((pre) => ({ ...pre, fullname: e.target.value }))
            }
          ></TextField>
          <TextField
            type={"text"}
            name="phone"
            label="phone"
            defaultValue={userEdit?.phone}
            onChange={(e) =>
              setUserEdit((pre) => ({ ...pre, phone: e.target.value }))
            }
          ></TextField>
       <FormControl>
            <FormLabel>Loại nhân viên</FormLabel>
            <RadioGroup
              value={userEdit?.roles}
              onChange={(e) =>
                setUserEdit((pre) => ({ ...pre, roles: e.target.value }))
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
          <Button id="button__edit--user" onClick={hanldeSave}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUser;
