import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
      borderWidth: 1,
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