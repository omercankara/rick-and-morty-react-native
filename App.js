import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screen/Home";
import Episode from "./Screen/Episode";
import CharacterDetails from "./Screen/CharacterDetails";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

import Favorites from "./Screen/Favorites";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();


const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Episode" component={Episode} />
      <HomeStack.Screen name="characterDetails" component={CharacterDetails} />
    </HomeStack.Navigator>
  );
} 




const FavoriStack = createNativeStackNavigator();

function FavoriStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Favorites" component={Favorites} />
    </HomeStack.Navigator>
  );
}








export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
        <Tab.Screen
        name="Favorite"
        component={FavoriStackScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
