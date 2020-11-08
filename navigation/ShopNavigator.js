import React from "react";
import { Button, Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS == "android" ? colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS == "android" ? "white" : colors.primary,
};
function Root() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Startup" component={StartupNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen
        name="ProductsOverview"
        component={ProductOverviewScreen}
        options={({ navigation }) => ({
          title: "Shop",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}

function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          title: "Your Orders",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function AdminNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Admin"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Edit"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() => {
                  navigation.navigate("Edit", {
                    productId: null,
                  });
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="Edit"
        component={EditProductScreen}
        options={({ route, navigation }) => ({
          headerTitle: "Edit Your Products",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Save"
                iconName={
                  Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                }
                onPress={() => {
                  route.params.submit();
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={() => ({
          headerTitle: "Authenticate",
        })}
      />
    </Stack.Navigator>
  );
}

function StartupNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Startup" component={StartupScreen} />
    </Stack.Navigator>
  );
}

export default function ShopNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={Root}
          options={{
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                size={23}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Your Orders"
          component={OrdersStack}
          options={() => ({
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === "android" ? "md-list" : "ios-list"}
                size={23}
              />
            ),
          })}
        />
        <Drawer.Screen
          name="Administration"
          component={AdminNavigator}
          options={() => ({
            drawerIcon: () => (
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
              />
            ),
          })}
        />
        <Drawer.Screen name="Logout" component={AuthNavigator}></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
