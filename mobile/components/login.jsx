import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import api from "../http/api";
import { useDispatch } from "react-redux";
import { saveUer } from "../redux/user/userReducer";
import { styles } from "../styles/login";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    phone: "",
    password: "",
  });

  const handleLogin = async () => {
    await api
      .post(`/api/user/login`, data)
      .then((res) => {
        if (
          res.data === "Người dùng không tồn tại" ||
          res.data === "Sai mật khẩu"
        ) {
          Toast.show({
            type: "error",
            text1: "Lỗi!",
            text2: res.data,
          });
        } else {
          if (res.data.roles === "ADMIN") {
            Toast.show({
              type: "error",
              text1: "Lỗi!",
              text2: "Ứng dụng chỉ dành cho nhân viên",
            });
          } else {
            dispatch(saveUer(res.data));
            setData(() => ({ phone: "", password: "" }));

            navigation.navigate("Home");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <> <SafeAreaView style={styles.container}>
    <Toast
      ref={(ref) => {
        Toast.setRef(ref);
      }}
    ></Toast>
    <Image style={styles.image} source={require("../assets/logo2.png")} />
    <StatusBar style="auto" />
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Số điện thoại"
        value={data.phone}
        onChangeText={(phone) => setData((pre) => ({ ...pre, phone: phone }))}
      />
    </View>
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        value={data.password}
        onChangeText={(password) =>
          setData((pre) => ({ ...pre, password: password }))
        }
      />
    </View>
    <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
      <Text style={styles.loginText}>Đăng nhập</Text>
    </TouchableOpacity>
  </SafeAreaView></>
   
  );
}
