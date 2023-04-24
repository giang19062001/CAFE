import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Button,
} from "react-native";
import { SpeedDial } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/userReducer";
import { styles } from "../styles/createOrder";
import api from "../http/api";
import { formatter } from "../helper/helper";
import { LinearProgress } from "react-native-elements";
import {
  addCart,
  clearCart,
  removeCart,
  selectCart,
} from "../redux/food/foodReducer";
import { Modal, Portal, Provider } from "react-native-paper";

export default function CreateOrder({ navigation, router }) {
  const [open, setOpen] = React.useState(false);
  const [foods, setFoods] = React.useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [message, setMessage] = useState([]);
  const cart = useSelector(selectCart);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      await api
        .get(`/api/food`)
        .then((res) => {
          setFoods(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);
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
  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };
  const handleAddCartFood = (value) => {
    dispatch(addCart({ ...value, quantity: 1 }));
  };
  const handleRemove = (id) => {
    dispatch(removeCart(id));
  };
  const handleOrder = async () => {
    await api
      .post(`/api/order`, {
        orderDetail: cart,
        ingredient: ingredient,
        total: cart?.reduce(
          (preValue, currentValue) =>
            preValue + currentValue.price * currentValue.quantity,
          0
        ),
      })
      .then((res) => {
        setMessage(res.data);
        dispatch(clearCart());
        showModal();
      })
      .catch((err) => {
        console.log("");
      });
  };

  console.log("cart", cart);

  console.log("ingredient", ingredient);

  return (
    <Provider>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Danh sách nước uống</Text>
        <View style={styles.container}>
          {foods.length === 0 ? (
            <LinearProgress color="primary" />
          ) : (
            foods.map((item) => (
              <TouchableOpacity
                style={styles.containerFood}
                key={item._id}
                onPress={() => handleAddCartFood(item)}
              >
                <Image
                  source={{
                    uri: `${process.env.BASE_URL}/food/${item?.photo}`,
                  }}
                  style={styles.image}
                />
                <Text>{item.name}</Text>
                <Text style={styles.price}>{formatter.format(item.price)}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
        <Text style={styles.text}>Danh sách nước uống đã thêm</Text>
        {cart?.map((item) => (
          <View style={styles.containerCart} key={item._id}>
            <Image
              source={{
                uri: `${process.env.BASE_URL}/food/${item?.photo}`,
              }}
              style={styles.image}
            />
            <View>
              <Text>{item.name}</Text>
              <Text style={styles.price}>{formatter.format(item.price)}</Text>
              <Text>Số lượng: {item.quantity}</Text>
            </View>

            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={() => handleRemove(item._id)}
            >
              <Text style={styles.orderText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={styles.textSmall}>Tổng nguyên liệu tiêu hao</Text>
        {ingredient?.map((itemIngredient) => (
          <View style={styles.containerIngredient} key={itemIngredient._id}>
            <View>
              <Text>
                {itemIngredient.name}: {itemIngredient.quantity}/
                {itemIngredient.unit}
              </Text>
            </View>
          </View>
        ))}
        <Text>_____________________</Text>
        <Text style={styles.total}>
          Tổng đơn:{" "}
          {formatter.format(
            cart?.reduce(
              (preValue, currentValue) =>
                preValue + currentValue.price * currentValue.quantity,
              0
            )
          )}
        </Text>

        <TouchableOpacity style={styles.buttonOrder} onPress={handleOrder}>
          <Text style={styles.orderText}>Đặt đơn</Text>
        </TouchableOpacity>
      </ScrollView>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          {message.includes("Không đủ nguyên liệu") ? (
            <Image
              style={styles.imageModal}
              source={require("../assets/failed.jpg")}
            />
          ) : (
            <Image
              style={styles.imageModal}
              source={require("../assets/stickSuccess.gif")}
            />
          )}
          <Text style={{ textAlign: "center" }}>{message}</Text>
        </Modal>
      </Portal>
      <SpeedDial
        size="small"
        buttonStyle={styles.SpeedDial}
        overlayColor="white"
        isOpen={open}
        icon={{
          name: "add",
          color: "#fff",
        }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          buttonStyle={styles.SpeedDialIcon}
          icon={{ name: "logout", color: "#fff" }}
          title="Đăng xuất"
          titleStyle={styles.SpeedDialTitle}
          onPress={() => handleLogout()}
        />
      </SpeedDial>
    </Provider>
  );
}
