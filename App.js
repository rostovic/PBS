import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabHelp from "./tabs/TabHelp";
import TabHomeScreen from "./tabs/TabHomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Entypo, Feather } from "@expo/vector-icons";
import SetLang from "./screens/SetLang";
import { useContext, useState } from "react";
import langs from "./lang-data/langs";
import FirstScreen from "./screens/FirstScreen";
import TabSettings from "./tabs/TabSettings";
import { Ionicons } from "@expo/vector-icons";
import UserContextProvider, { UserContext } from "./context/context";

const Tab = createBottomTabNavigator();

const App = () => {
  const Root = () => {
    const userCtx = useContext(UserContext);
    const [appLoad, setAppLoad] = useState(true);

    if (appLoad) {
      return <FirstScreen setAppLoad={setAppLoad} />;
    }

    if (
      Object.keys(userCtx.userData).length === 0 ||
      userCtx.userData.data.lang === undefined ||
      userCtx.userData.data.lang === ""
    ) {
      return <SetLang />;
    }

    const currentLang = langs.find(
      (lang) => lang.name === userCtx.userData.data.lang
    );

    return (
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Home"
            component={TabHomeScreen}
            options={{
              tabBarActiveBackgroundColor: "lightgrey",
              tabBarActiveTintColor: "black",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="home" size={24} color="black" />
              ),
              tabBarLabel: currentLang.homeText,
            }}
          />

          <Tab.Screen
            name="Settings"
            component={TabSettings}
            options={{
              tabBarActiveBackgroundColor: "lightgrey",
              tabBarActiveTintColor: "black",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-sharp" size={30} color="black" />
              ),
              tabBarLabel: currentLang.settingsText,
            }}
          />

          <Tab.Screen
            name="Help"
            component={TabHelp}
            options={{
              tabBarActiveBackgroundColor: "lightgrey",
              tabBarActiveTintColor: "black",
              tabBarIcon: ({ color, size }) => (
                <Feather name="info" size={30} color="black" />
              ),
              tabBarLabel: currentLang.infoText,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };

  return (
    <UserContextProvider>
      <SafeAreaProvider>
        <Root />
      </SafeAreaProvider>
    </UserContextProvider>
  );
};

export default App;
