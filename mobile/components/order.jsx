import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View, ScrollView, Image, SafeAreaView } from "react-native";
import api from "../http/api";
import { SpeedDial } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux/user/userReducer";
import { styles } from "../styles/order";
import { LinearProgress } from "react-native-elements";
import { Modal, Portal, Provider } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { formatter } from "../helper/helper";
import SelectDropdown from "react-native-select-dropdown";
import { useIsFocused } from "@react-navigation/native";

const status = ["Đang thực hiện", "Đã xong"];
export default function Order({ navigation, router }) {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  async function fetchData() {
    await api
      .get(`/api/order`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if(isFocused === true){
      fetchData();
    }
  }, [isFocused]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  const handleChange = async (id, status) => {
    await api.put(`/api/order/${id}`, { status: status }).then(() => {
      showModal();
      async function fetchData() {
        await api
          .get(`/api/order`)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      fetchData();
    });
  };

  console.log(data);
  return (
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Image
              style={styles.imageModal}
              source={require("../assets/stickSuccess.gif")}
            />
            <Text>Cập nhập hóa đơn thành công</Text>
          </Modal>
        </Portal>
        <View style={styles.container}>
          <Text style={styles.text}>Danh sách hóa đơn</Text>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {data.length === 0 ? (
              <LinearProgress color="primary" />
            ) : (
              data.map((item) => (
                <View key={item._id}>
                  <View style={styles.viewChildOrder}>
                    {item?.orderDetail?.map((itemChildOrder) => (
                      <View
                        key={itemChildOrder._id}
                        style={styles.viewChildOrderFood}
                      >
                        <Image
                          source={{
                            uri: `${process.env.BASE_URL}/food/${itemChildOrder?.photo}`,
                          }}
                          style={styles.image}
                        />
                        <View>
                          <Text>{itemChildOrder.name}</Text>
                          <Text style={styles.price}>
                            {formatter.format(itemChildOrder.price)}
                          </Text>
                          <Text>Số lượng: {itemChildOrder.quantity}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={styles.viewIngredient}>
                    <Text style={{ fontWeight: "bold" }}>
                      Tổng nguyên liệu tiêu tốn
                    </Text>
                    <Text style={{ color: "#f97316",marginBottom:10 }}>
                      __________________________
                    </Text>
                    {item?.ingredient?.map((itemIngredient) => (
                      <View
                        key={itemIngredient._id}
                        style={styles.viewChildIngredient}
                      >
                        <Text>{itemIngredient.name}:</Text>
                        <Text>
                          {itemIngredient.quantity}/{itemIngredient.unit}
                        </Text>
                      </View>
                    ))}
                    <Text style={{ color: "#f97316" }}>
                      __________________________
                    </Text>
                  </View>
                  <View style={styles.viewDescription}>
                    <Text>
                      Tổng hóa đơn:{" "}
                      <Text style={styles.total}>
                        {formatter.format(item.total)}
                      </Text>
                    </Text>
                    <Text>
                      Ngày đặt: {new Date(item.createdAt).toLocaleString()}
                    </Text>
                    {user.roles === "BARTENDER" ? (
                      item.status === "Đã xong" ? (
                        <View style={styles.viewStatus}>
                          <Text style={styles.statusSuccess}>
                            {" "}
                            {item.status}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.viewDropdown}>
                          <SelectDropdown
                            dropdownIconPosition={"right"}
                            dropdownStyle={styles.dropdown2DropdownStyle}
                            buttonTextStyle={styles.button2DropdownStyle}
                            renderDropdownIcon={(isOpened) => {
                              return (
                                <FontAwesome
                                  name={
                                    isOpened ? "chevron-up" : "chevron-down"
                                  }
                                  color={"#eab308"}
                                  size={18}
                                />
                              );
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            data={status}
                            onSelect={(selectedItem, index) => {
                              handleChange(item._id, selectedItem);
                            }}
                            defaultValue={item.status}
                          />
                        </View>
                      )
                    ) : (
                      <View style={styles.viewStatus}>
                        {item.status === "Đã xong" ? (
                          <Text style={styles.statusSuccess}>
                            {" "}
                            {item.status}
                          </Text>
                        ) : (
                          <Text style={styles.statusProcessing}>
                            {" "}
                            {item.status}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      borderBottomColor: "tomato",
                      borderBottomWidth: 2,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  />
                </View>
              ))
            )}

            <StatusBar />
          </ScrollView>
        </View>
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
