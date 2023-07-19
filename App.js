import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Help from "./screens/Help";
import TabHomeScreen from "./screens/TabHomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Entypo, Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="HOME"
            component={TabHomeScreen}
            options={{
              tabBarActiveBackgroundColor: "lightgrey",
              tabBarActiveTintColor: "black",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="home" size={24} color="black" />
              ),
            }}
          />

          <Tab.Screen
            name="INFO"
            component={Help}
            options={{
              tabBarActiveBackgroundColor: "lightgrey",
              tabBarActiveTintColor: "black",
              tabBarIcon: ({ color, size }) => (
                <Feather name="info" size={30} color="black" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
