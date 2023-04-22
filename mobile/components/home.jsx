import * as React from "react";
import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Order from "./order";
import CreateOrder from "./createOrder";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/user/userReducer";

const Tab = createBottomTabNavigator();

export default function Home({ navigation, router }) {
  const user = useSelector(selectUser);
  console.log(user);
  navigation.setOptions({
    title: `${user.roles === "WAITER" ? "Phục vụ" : "Pha chế"} : ${
      user.fullname
    }`,
    
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Order") {
            iconName = focused
              ? "ios-list-circle"
              : "ios-list-circle-outline";
          } else if (route.name === "CreateOrder") {
            iconName = focused ? "ios-add" : "ios-add-circle";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle:{
            paddingBottom:'10px',
            paddingTop:'10px',
            height:'80px',
        }
      })}
    >
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: false,
          title: "Danh sách hóa đơn",
        }}
      />
      <Tab.Screen
        name="CreateOrder"
        component={CreateOrder}
        options={{
          headerShown: false,
          title: "Tạo hóa đơn",
        }}
      />
    </Tab.Navigator>
  );
}
