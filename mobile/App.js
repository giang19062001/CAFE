import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./components/login";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./components/home";
import { Image, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: "#A4907C",
              },
              headerLeft: () => (
                <Image
                  style={styles.image}
                  source={require("./assets/logo2.png")}
                />
              ),

              headerTitleAlign: "center",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
});
