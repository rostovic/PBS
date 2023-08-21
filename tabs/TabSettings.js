import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { settingsStyle } from "../styles";
import { UserContext } from "../context/context";
import { useCallback, useContext, useState } from "react";
import langs from "../lang-data/langs";
import { Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const TabSettings = ({ navigation }) => {
  const [langModal, setLangModal] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const insets = useSafeAreaInsets();
  const userCtx = useContext(UserContext);
  const userDataRadius = +userCtx.userData.data.radius;
  const currentLang = langs.find(
    (lang) => lang.name === userCtx.userData.data.lang
  );

  const handleChangeRadius = (radius) => {
    userCtx.setData({
      data: { lang: currentLang.name, radius: radius },
    });
  };

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
                    data: { lang: lang.name, radius: userDataRadius },
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
        <View style={settingsStyle.radiusView}>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text style={{ fontWeight: 700 }}>Radius</Text>

            <Feather
              name="info"
              size={24}
              color="black"
              onPress={() => {
                setShowToolTip((state) => !state);
              }}
            />
          </View>
          {showToolTip ? (
            <Text style={{ fontSize: 8 }}>
              Lowering radius may increase performance
            </Text>
          ) : null}

          <View style={{ flexDirection: "row", gap: 20 }}>
            <Pressable
              style={{
                backgroundColor:
                  userDataRadius === 0.25 ? "#5A5A5A" : "lightgrey",
                padding: 8,
                borderRadius: 999,
              }}
              onPress={() => {
                handleChangeRadius(0.25);
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: 700 }}>
                250 m
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: userDataRadius === 1 ? "#5A5A5A" : "lightgrey",
                padding: 8,
                borderRadius: 999,
              }}
              onPress={() => {
                handleChangeRadius(1);
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: 700 }}>
                1 km
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: userDataRadius === 5 ? "#5A5A5A" : "lightgrey",
                padding: 8,
                borderRadius: 999,
              }}
              onPress={() => {
                handleChangeRadius(5);
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: 700 }}>
                5 km
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor:
                  userDataRadius === 10 ? "#5A5A5A" : "lightgrey",
                padding: 8,
                borderRadius: 999,
              }}
              onPress={() => {
                handleChangeRadius(10);
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: 700 }}>
                10 km
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TabSettings;
