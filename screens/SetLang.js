import { Pressable } from "react-native";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "react-native";
import langs from "../lang-data/langs";
import { LangContext } from "../lang_context/lang_context";
import { useContext } from "react";

const SetLang = ({ changeLang = false }) => {
  const context = useContext(LangContext);
  const insets = useSafeAreaInsets();
  // console.log("Lang is: " + context.lang);
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
                context.setLanguage(lang.name);
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
