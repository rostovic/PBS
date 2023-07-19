import { Text, View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { help, styles } from "../styles";
import standard from "../images/mapType/standard.jpg";
import satellite from "../images/mapType/satellite.jpg";
import { useEffect, useState } from "react";

const Help = ({ navigation }) => {
  const [mapType, setMapType] = useState("standard");

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
          <Text>- Bus Station</Text>
        </View>

        <View style={help.singleRow}>
          <View style={help.buttonContainer}>
            <MaterialCommunityIcons name="bus-stop" size={28} color="black" />
          </View>
          <Text>- Find nearest bus station</Text>
        </View>

        <View style={help.singleRow}>
          <View style={help.buttonContainer}>
            <FontAwesome5 name="route" size={30} color="black" />
          </View>

          <View>
            <Text>- Show all routes </Text>
          </View>
        </View>

        <View style={help.singleRow}>
          <View style={help.buttonContainer}>
            <Image
              source={mapType === "standard" ? standard : satellite}
              style={styles.imageContainer}
            />
          </View>
          <Text>- Toggle map style</Text>
        </View>

        <View style={help.customRow1}>
          <View style={help.customView1}>
            <View style={help.textBackground1}>
              <Text>3a</Text>
            </View>
          </View>
          <Text>- Route (click to show the route) </Text>
        </View>
      </View>
    </View>
  );
};

export default Help;
