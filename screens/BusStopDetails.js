import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { busStopData } from "../bus-data/bus-stop";
import { Ionicons } from "@expo/vector-icons";

const BusStopDetails = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { busStopId } = route.params;
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={{ width: "100%", height: 200 }}>
        <Ionicons
          name="arrow-back"
          size={40}
          color="black"
          style={{
            position: "absolute",
            zIndex: 100,
            backgroundColor: "white",
            left: 20,
            top: 20,
          }}
          onPress={() => navigation.goBack()}
        />
        <Image
          source={busStopData[busStopId]?.image}
          style={{ width: "100%", flex: 1 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{ height: 100, width: "100%", backgroundColor: "#fafafa" }}
        ></View>
      </View>
    </View>
  );
};

export default BusStopDetails;
