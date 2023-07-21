import { Text, View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { help, styles } from "../styles";
import standard from "../images/mapType/standard.jpg";
import satellite from "../images/mapType/satellite.jpg";
import { useContext, useEffect, useState } from "react";
import langs from "../lang-data/langs";
import { LangContext } from "../lang_context/lang_context";

const Help = ({ navigation }) => {
  const [mapType, setMapType] = useState("standard");
  const lngCtx = useContext(LangContext);
  const currentLang = langs.find((lang) => lang.name === lngCtx.lang);

  useEffect(() => {
    const interval = setInterval(() => {
      setMapType((prevMapType) =>
        prevMapType === "standard" ? "satellite" : "standard"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={help.rootView}>
      <View style={help.mainView}>
        <View style={help.singleRow}>
          <View style={help.customBusIconStyle}>
            <MaterialIcons name="directions-bus" size={28} color="darkorange" />
          </View>
          <Text>{currentLang.busStation}</Text>
        </View>

        <View style={help.singleRow}>
          <View style={help.buttonContainer}>
            <MaterialCommunityIcons name="bus-stop" size={28} color="black" />
          </View>
          <Text>{currentLang.findNearestStop}</Text>
        </View>

        <View style={help.singleRow}>
          <View style={help.buttonContainer}>
            <FontAwesome5 name="route" size={30} color="black" />
          </View>

          <View>
            <Text>{currentLang.showAllRoutes}</Text>
          </View>
        </View>

        <View style={help.singleRow}>
          <View style={help.buttonContainer}>
            <Image
              source={mapType === "standard" ? standard : satellite}
              style={styles.imageContainer}
            />
          </View>
          <Text>{currentLang.toggleMapStyle}</Text>
        </View>

        <View style={help.customRow1}>
          <View style={help.customView1}>
            <View style={help.textBackground1}>
              <Text>3a</Text>
            </View>
          </View>
          <Text>{currentLang.route}</Text>
        </View>
      </View>
    </View>
  );
};

export default Help;
