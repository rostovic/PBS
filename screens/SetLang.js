import { Pressable } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native";
import langs from "../lang-data/langs";
import { useContext } from "react";
import { UserContext } from "../context/context";

const SetLang = ({ changeLang = false }) => {
  const context = useContext(UserContext);
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        top: insets.top,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {langs.map((lang) => {
          return (
            <Pressable
              key={lang.name}
              style={{ width: 175, height: 100 }}
              onPress={() => {
                context.setData({ data: { lang: lang.name, radius: "10" } });
              }}
            >
              <Image
                source={lang.image}
                style={{ height: "100%", width: "100%" }}
              ></Image>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default SetLang;
