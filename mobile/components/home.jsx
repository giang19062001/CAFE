import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Order from "./order";
import CreateOrder from "./createOrder";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userReducer";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

 const Home = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation()
  const roles = user.roles ==='BARTENDER' ? 'Pha chế' : 'Phục vụ'
  navigation.setOptions({
    title: `${roles}: ${user.fullname}`
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
          tabBarActiveTintColor: "#f97316",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            paddingBottom: 10,
            paddingTop: 10,
            height: 80,
          },
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
        {user.roles === "BARTENDER" ? null : (
          <Tab.Screen
            name="CreateOrder"
            component={CreateOrder}
            options={{
              headerShown: false,
              title: "Tạo hóa đơn",
            }}
          />
        )}
      </Tab.Navigator>
  );
}
export default Home