import {
  Button,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../../redux/food/foodThunk";
import { addCart, clearCart, removeCart } from "../../redux/food/foodReducer";
import { selectCart } from "../../redux/food/foodSelector";
import { formatter } from "../../utils/custom";
import { postOrder } from "../../redux/order/orderThunk";
import { selectSuccess } from "../../redux/order/orderSelector";
import { turnOfSuccess } from "../../redux/order/orderReducer";
export const AddOrder = () => {
  const [foods, setFoods] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [message, setMessage] = useState([]);

  const cart = useSelector(selectCart);
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFoods()).then((res) => {
      setFoods(res.payload);
    });
  }, [dispatch]);

  const handleAddCartFood = (value) => {
    dispatch(addCart({ ...value, quantity: 1 }));
  };
  const handleRemove = (id) => {
    dispatch(removeCart(id));
  };
  const handleTurnOf = () => {
    dispatch(turnOfSuccess());
  };
  const handleOrder = () => {
    dispatch(
      postOrder({
        orderDetail: cart,
        ingredient: ingredient,
        total: cart?.reduce(
          (preValue, currentValue) =>
            preValue + currentValue.price * currentValue.quantity,
          0
        ),
      })
    ).then((res) => {
      setMessage(res.payload);
      dispatch(clearCart());
    });
  };

  useEffect(() => {
    let tempOut = [];

    const handleAddRecipeAll = (dataValue) => {
      const checkExists = tempOut?.find((item) => item._id === dataValue._id);
      if (checkExists === undefined) {
        tempOut.push(dataValue);
        setIngredient(tempOut);
      } else {
        let tempIn = tempOut.map((item) =>
          dataValue._id === item._id
            ? {
                _id: dataValue._id,
                name: dataValue.name,
                unit: dataValue.unit,
                quantity:
                  parseInt(dataValue.quantity) + parseInt(item.quantity),
              }
            : { ...item }
        );
        tempOut = tempIn;
        setIngredient(tempOut);
      }
    };
    if (cart.length === 0) {
      setIngredient([]);
    }

    cart?.map((value, index) => {
      value.recipe.map((valueChild, indexChild) => {
        handleAddRecipeAll(valueChild);
      });
    });
  }, [cart]);
  console.log("cart", cart);

  console.log("ingredient", ingredient);

  return (
    <Container className="mb-12">
      <div className="flex flex-wrap gap-2">
        {foods?.map((food, index) => (
          <div key={food._id} className="flex flex-col items-center gap-2">
            <img
              src={process.env.REACT_APP_SERVER + "/food/" + food?.photo}
              className="rounded-lg w-32 h-32"
              alt=""
            />
            <b>{food.name}</b>
            <p className="text-red-500"> {formatter.format(food.price)}</p>
            <button
              onClick={() => handleAddCartFood(food)}
              className="bg-orange-500 rounded-full text-slate-50 p-2"
            >
              Thêm{" "}
            </button>
          </div>
        ))}
      </div>
      <hr className="my-6" />
      <Typography variant="h4" align="center" className=" mb-8">
        Chi tiết hóa đơn
      </Typography>

      <div className="flex flex-col justify-center items-center">
        {cart?.map((food, index) => (
          <div key={food._id} className="flex flex-row items-center gap-3 my-2">
            <img
              src={process.env.REACT_APP_SERVER + "/food/" + food?.photo}
              className="rounded-lg w-32 h-32"
              alt=""
            />
            <b>{food.name}</b>
            <p>Số lượng: {food.quantity}</p>
            <p>
              Giá:{" "}
              <b className="text-red-500">{formatter.format(food.price)}</b>
            </p>
            <p>
              Tổng giá:{" "}
              <b className="text-red-500">{formatter.format(food.price)}</b>
            </p>
            <div className="border-double border-4 border-orange-600 p-2 w-80 my-2">
              {food.recipe.map((value, index) => (
                <div key={value._id} className="flex gap-2">
                  <b>{value.name} :</b>
                  <b>{value.quantity}</b>
                  <b>{value.unit}</b>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleRemove(food._id)}
              className="bg-red-500 rounded-full text-slate-50 p-2"
            >
              Xóa{" "}
            </button>
          </div>
        ))}
        <p className="my-6 text-2xl">
          Tổng hóa đơn:
          <b className="text-red-500">
            {" "}
            {formatter.format(
              cart?.reduce(
                (preValue, currentValue) =>
                  preValue + currentValue.price * currentValue.quantity,
                0
              )
            )}
          </b>
        </p>
        <p>Tổng nguyên liệu tiêu hao</p>
        <div className="border-double border-4 border-orange-600 p-2 w-80 my-4">
          {ingredient?.map((value, index) => (
            <div key={value._id} className="flex gap-2">
              <b>{value.name} :</b>
              <b>{value.quantity}</b>
              <b>{value.unit}</b>
            </div>
          ))}
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 rounded-full text-slate-50 p-2"
          onClick={handleOrder}
        >
          Tạo hóa đơn
        </button>
      </div>
      <Dialog open={success} onClose={handleTurnOf}>
        <DialogContent>
          {message.includes("Không đủ nguyên liệu") ? (
            <img src={require("../../assets/failed.jpg")} alt="" className="w-60 mx-auto" />
          ) : (
            <img src={require("../../assets/stickSuccess.gif")} alt=""  className="mx-auto" />
          )}
          <Typography align="center">{message}</Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
