import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import api from "../http/api";
import { useDispatch } from 'react-redux';
import { saveUer } from "../redux/user/userReducer";

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    phone: "",
     password :''
  });
  const handleLogin = async () =>{
     await api.post(`/api/user/login`,data).then((res) => {
      console.log(res);
      if (
        res.data === "Người dùng không tồn tại" ||
        res.data === "Sai mật khẩu"
      ) {
        Toast.show({
          type:'error',
          text1:'Lỗi!',
          text2:res.data,
          
        })
      } else {
        if(res.data.roles === "ADMIN"){
        Toast.show({
          type:'error',
          text1:'Lỗi!',
          text2:'Ứng dụng chỉ dành cho nhân viên',
        })}
        else{
            dispatch(saveUer(res.data))
            navigation.navigate('Home')
        }
      }
      
    }).catch((err) => {console.log(err)});

  }

  return (
    <View style={styles.container}>
      <Toast ref={(ref) => {Toast.setRef(ref)}}></Toast>
      <Image style={styles.image} source={require("../assets/logo2.png")} /> 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Số điện thoại"
          onChangeText={(phone) =>            
            setData((pre) => ({ ...pre, phone: phone }))
          }
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mật khẩu"
          secureTextEntry={true}
          onChangeText={(password) =>            
            setData((pre) => ({ ...pre, password: password }))
          }        /> 
      </View> 
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Đăng nhập</Text> 
      </TouchableOpacity> 
     
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    height: 100,
    width : 100,
    borderRadius: 30
  },
  inputView: {
    borderRadius: 30,
    width: "70%",
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    borderColor:"grey",
    borderWidth: "1px",
  },
  TextInput: {
    height: 50,
    flex: 1,
    width: "70%",
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor:"#A4907C"
  },
  loginText:{
    color:"white",
  }
});