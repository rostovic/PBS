import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import pula from "../images/pula/pula.png";
import { Image } from "react-native";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const FirstScreen = ({ setAppLoad }) => {
  const insets = useSafeAreaInsets();
  const greetings = [
    "Dobrodošli",
    "Welcome",
    "Bienvenido",
    "Willkommen",
    "Bienvenue",
    "Benvenuto",
  ];

  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex(
        (prevIndex) => (prevIndex + 1) % greetings.length
      );
    }, 500);

    return () => clearInterval(interval);
  }, [greetings.length]);

  return (
    <View
      style={{
        top: insets.top,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
      }}
    >
      <View
        style={{
          height: 500,
          width: 500,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={pula}
          style={{
            width: 350,
            height: 350,
            resizeMode: "contain",
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          gap: 50,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#29733B",
          }}
        >
          {greetings[currentGreetingIndex]}
        </Text>
        <Pressable
          style={{
            backgroundColor: "#29733B",
            borderRadius: 999,
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setAppLoad(false)}
        >
          <AntDesign name="caretright" size={36} color="#FAB500" />
        </Pressable>
      </View>
    </View>
  );
};

export default FirstScreen;
