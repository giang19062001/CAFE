import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: '50%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#facc15',
  },
  dropdown2DropdownStyle: {
    borderRadius: 12,
  },
  button2DropdownStyle:{
    color:'#eab308',
    fontWeight:'bold',
    fontSize:15,

  },
  text:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom:25
  },
  modal:{
    backgroundColor: 'white', 
    padding:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  SpeedDial: {
    backgroundColor: "#A4907C",
  },
  SpeedDialIcon: {
    backgroundColor: "red",
  },
  SpeedDialTitle: {
    borderRadius:10,
    width:100,
    color: "red",
    borderColor:'red',
    borderWidth:2,
    fontWeight:'bold'
  },
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius:20
    },
    imageModal: {
      width: 150,
      height: 150,
    },
    view: {
      flex: 1,
      flexDirection: "row",
    },
    viewDescription: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    viewIngredient: {
      marginTop:20,
      marginBottom:5,
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
    },
    viewChildIngredient: {
      flex: 1,
      gap: 10,
      flexDirection: "row",
    },
    viewChildOrder: {
      flex: 1,
      flexDirection: "row",
      flexWrap:'wrap',
    },
    viewChildOrderFood: {
      width:110,
    },
    viewDropdown: {
      marginBottom:10
    },
    viewStatus: {
      alignItems: "center",
      flex: 1,
    },
    price: {
      color: "red",
      fontWeight: "bold",
    },
    total: {
      color: "red",
      fontWeight: "bold",
      fontSize: 20
    },
    statusSuccess: {
      color: "#22c55e",
      fontWeight: "bold",
      borderColor:'#22c55e',
      borderRadius: 10,
      borderWidth:2,
      paddingVertical: 5,
      textAlign: "center",
      width: 100,
      fontSize:15
      
    },
    statusProcessing: {
      color: "#facc15",
      fontWeight: "bold",
      borderColor:'#facc15',
      borderRadius: 10,
      borderWidth:2,
      paddingVertical: 5,
      textAlign: "center",
      width: 130,
      fontSize:15
    },
  });
  