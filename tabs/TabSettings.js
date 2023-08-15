import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { settingsStyle } from "../styles";
import { UserContext } from "../context/context";
import { useCallback, useContext, useState } from "react";
import langs from "../lang-data/langs";
import { Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const TabSettings = ({ navigation }) => {
  const [langModal, setLangModal] = useState(false);
  const insets = useSafeAreaInsets();
  const userCtx = useContext(UserContext);

  const currentLang = langs.find(
    (lang) => lang.name === userCtx.userData.data.lang
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setLangModal(false);
      };
    }, [])
  );

  return (
    <View
      style={{
        top: insets.top,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
        backgroundColor: "#fafafa",
      }}
    >
      {langModal === true ? (
        <View style={settingsStyle.langModal}>
          {langs.map((lang) => {
            return (
              <Pressable
                key={lang.name}
                style={{ width: 100, height: 50 }}
                onPress={() => {
                  userCtx.setData({
                    data: { lang: lang.name, radius: "" },
                  });
                  setLangModal(false);
                }}
              >
                <Image
                  source={lang.image}
                  style={{ height: "100%", width: "100%" }}
                />
              </Pressable>
            );
          })}
        </View>
      ) : null}
      <View style={settingsStyle.contentView}>
        <View style={settingsStyle.changeLangView}>
          <Text style={{ fontWeight: 700 }}>{currentLang.language}</Text>
          <Pressable
            style={settingsStyle.changeLangButton}
            onPress={() => setLangModal(true)}
          >
            <Image
              source={currentLang.image}
              style={settingsStyle.imageStyle}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TabSettings;
