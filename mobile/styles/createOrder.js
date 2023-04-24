import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  modal:{
    backgroundColor: 'white', 
    padding:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageModal: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    paddingVertical:20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  containerFood: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  containerCart: {
    flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap:5,
    marginVertical:10
  },
  containerIngredient: {
    flex:1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap:5,
    marginTop:10
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  text:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textSmall:{
    textAlign: 'center',
    fontSize: 15,
    textDecorationLine:'underline',
    marginTop:10
  },
  price: {
    color: "red",
    fontWeight: "bold",
  },
  total: {
    color: "red",
    fontWeight: "bold",
    fontSize:20,
    textAlign: "center",
    marginVertical:20
  },
  viewOrder:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDelete: {
    width: 50,
    borderRadius: 15,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"red"
  },
  buttonOrder: {
    width: 150,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    backgroundColor:"#38bdf8"
  },
  orderText:{
    color:"white",
  }
});
