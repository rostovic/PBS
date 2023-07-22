import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import pula from "../images/pula/pula.png";
import { Image } from "react-native";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { firstScreenStyle } from "../styles";

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
      <View style={firstScreenStyle.imageView}>
        <Image source={pula} style={firstScreenStyle.imageStyle} />
      </View>
      <View style={firstScreenStyle.textIconView}>
        <Text style={firstScreenStyle.greetingsText}>
          {greetings[currentGreetingIndex]}
        </Text>
        <Pressable
          style={firstScreenStyle.pressableContinue}
          onPress={() => setAppLoad(false)}
        >
          <AntDesign name="caretright" size={36} color="#FAB500" />
        </Pressable>
      </View>
    </View>
  );
};

export default FirstScreen;
