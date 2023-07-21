import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Help from "./screens/Help";
import TabHomeScreen from "./screens/TabHomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Entypo, Feather } from "@expo/vector-icons";
import LangContextProvider, { LangContext } from "./lang_context/lang_context";
import SetLang from "./screens/SetLang";
import { useContext, useState } from "react";
import langs from "./lang-data/langs";
import FirstScreen from "./screens/FirstScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  const Root = () => {
    const lngCtx = useContext(LangContext);
    const [appLoad, setAppLoad] = useState(true);

    if (appLoad) {
      return <FirstScreen setAppLoad={setAppLoad} />;
    }

    if (lngCtx.lang === undefined || lngCtx.lang === "") {
      return <SetLang />;
    }

    const currentLang = langs.find((lang) => lang.name === lngCtx.lang);

    return (
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name={currentLang.home}
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
            name={currentLang.info}
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
    );
  };

  return (
    <LangContextProvider>
      <SafeAreaProvider>
        <Root />
      </SafeAreaProvider>
    </LangContextProvider>
  );
};

export default App;
