import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/login';
import Order from './components/order';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CreateOrder from './components/createOrder';
import Home from './components/home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title:""}}
        />
        <Stack.Screen name="Home" component={Home}   options={{
          headerStyle: {
            backgroundColor: '#A4907C',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>

  );
};