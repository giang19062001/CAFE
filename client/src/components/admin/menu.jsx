import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import NoFoodIcon from "@mui/icons-material/NoFood";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddCardIcon from "@mui/icons-material/AddCard";
import {
  AppBarAdmin,
  DrawerHeaderAdmin,
  drawerWidthAdmin,
  Main,
} from "../../utils/custom";
import { EditFood } from "./editFood";
import { AddFood } from "./addFood";
import Order from "./order";
import { AddUser } from "./addUser";
import EditUser from "./editUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/user/userReducer";
import { selectUser } from "../../redux/user/userSelector";
import { AddGoods } from "./addGood";
import EditGood from "./editGood";
import { AddOrder } from "./addOrder";
import { Revenue } from "./revenue";

export default function MenuComponent() {
  const theme = useTheme();
  const user = useSelector(selectUser);
  const [open, setOpen] = React.useState(true);
  const [content, setContent] = React.useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarAdmin position="fixed" open={open} className="bg-slate-50">
        <Toolbar>
          <IconButton
            color="inherit"
            className="text-neutral-600"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div className="flex justify-between 	" style={{ width: "100%" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="text-neutral-600 ml-6  "
            >
              Trang chủ
            </Typography>
            <b className="text-neutral-500 text-lg">
              {user?.roles === "WAITER"
                ? "Nhân viên phục vụ"
                : user?.roles === "BARTENDER"
                ? "Nhân viên pha chế"
                : "Chủ"}
            </b>
            <Typography className="text-orange-500 ml-6 flex items-center gap-2 font-bold text-lg">
              <AccountCircleIcon></AccountCircleIcon>
              {user?.fullname}
            </Typography>
          </div>
        </Toolbar>
      </AppBarAdmin>
      <Drawer
        sx={{
          width: drawerWidthAdmin,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidthAdmin,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeaderAdmin className="bg-orange-500 flex gap-3">
          <Typography variant="h4" className="font-bold">
            <b className="text-slate-50">C</b>a
            <b className="text-slate-50">f</b>e
          </Typography>
          <img src={require("../../assets/icon.png")} alt="" className="w-12" />
          <IconButton onClick={handleDrawerClose} className="text-slate-50">
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeaderAdmin>
        <Divider />
        <List>
          {[
            "Danh sách hóa đơn",
            "Tạo hóa đơn",
            "Chỉnh sửa đồ uống",
            "Thêm đồ uống mới",
            "Tạo nhân viên mới",
            "Chỉnh sửa nhân viên",
            "Thêm hàng hóa",
            "Chỉnh sửa hàng hóa",
            "Thống kê doanh thu",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              {index === 0 ? (
                <IconButton
                  onClick={() => setContent(index)}
                  disableRipple={true}
                  className="flex gap-5 hover:text-orange-500 text-neutral-900 "
                >
                  <CreditCardIcon />
                  <Typography className="text-lg">{text}</Typography>
                </IconButton>
              ) : index === 1 ? (
                <IconButton
                  disableRipple={true}
                  disabled={user.roles === "BARTENDER"}
                  className="flex gap-5  hover:text-orange-500 text-neutral-900"
                  onClick={() => setContent(index)}
                >
                  <AddCardIcon />
                  <Typography className="text-lg">{text}</Typography>
                </IconButton>
              ) : index === 2 ? (
                <IconButton
                  disableRipple={true}
                  disabled={
                    user.roles === "BARTENDER" || user.roles === "WAITER"
                  }
                  className="flex gap-5  hover:text-orange-500 text-neutral-900"
                  onClick={() => setContent(index)}
                >
                  <NoFoodIcon />
                  <Typography className="text-lg">{text}</Typography>
                </IconButton>
              ) : index === 3 ? (
                <IconButton
                  disableRipple={true}
                  className="flex gap-5  hover:text-orange-500 text-neutral-900"
                  onClick={() => setContent(index)}
                  disabled={
                    user.roles === "BARTENDER" || user.roles === "WAITER"
                  }
                >
                  <FastfoodIcon />
                  <Typography className="text-lg">{text}</Typography>
                </IconButton>
              ) : index === 4 ? (
                <IconButton
                  disableRipple={true}
                  className="flex gap-5  hover:text-orange-500 text-neutral-900"
                  onClick={() => setContent(index)}
                  disabled={
                    user.roles === "BARTENDER" || user.roles === "WAITER"
                  }
                >
                  <PersonAddAltIcon></PersonAddAltIcon>
                  <Typography className="text-lg">{text}</Typography>
                </IconButton>
              ) : index === 5 ? (
                <IconButton
                  disableRipple={true}
                  className="flex gap-5  hover:text-orange-500 text-neutral-900"
                  onClick={() => setContent(index)}
                  disabled={
                    user.roles === "BARTENDER" || user.roles === "WAITER"
                  }
                >
                  <ManageAccountsIcon></ManageAccountsIcon>
                  <Typography className="text-lg">{text}</Typography>
                </IconButton>
              ) : index === 6 ? (
                <IconButton
                  disableRipple={true}
                  className="flex gap-5  hover:text-orange-500 text-neutral-900"
                  onClick={() => setContent(index)}
                  disabled={
                    user.roles === "BARTENDER" || user.roles === "WAITER"
                  }
                >
                  <AddShoppingCartIcon></AddShoppingCartIcon>
                  <Typography className="text-lg">{text}</Typography>
                </IconButton>
              ) : index === 7 ? (
                <IconButton
                  disableRipple={true}
                  className="flex gap-5  hover:text-orange-500 text-neutral-900"
                  onClick={() => setContent(index)}
                  disabled={
                    user.roles === "BARTENDER" || user.roles === "WAITER"
                  }
                >
                  <ShoppingCartIcon></ShoppingCartIcon>
                  <Typography className="text-lg">{text}</Typography>
                </IconButton>
              ) : (
                <IconButton
                  disableRipple={true}
                  disabled={user.roles === "BARTENDER" || user.roles === "WAITER"}
                  className="flex gap-5  hover:text-orange-500 text-neutral-900"
                  onClick={() => setContent(index)}
                >
                  <CurrencyExchangeIcon></CurrencyExchangeIcon>
                  <Typography className="text-lg">{text}</Typography>
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem key={"Đăng xuất"} disablePadding>
          <ListItemButton onClick={handleLogOut}>
            <ListItemIcon>
              <LogoutIcon></LogoutIcon>
            </ListItemIcon>
            <ListItemText primary={"Đăng xuất"} />
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Main open={open}>
        <DrawerHeaderAdmin />
        {content === 0 ? (
          <Order></Order>
        ) : content === 1 ? (
          <AddOrder></AddOrder>
        ) : content === 2 ? (
          <EditFood></EditFood>
        ) : content === 3 ? (
          <AddFood></AddFood>
        ) : content === 4 ? (
          <AddUser></AddUser>
        ) : content === 5 ? (
          <EditUser></EditUser>
        ) : content === 6 ? (
          <AddGoods></AddGoods>
        ) : content === 7 ? (
          <EditGood></EditGood>
        ) : <Revenue></Revenue>}
      </Main>
    </Box>
  );
}
