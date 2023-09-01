import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { busStopArrivalTime, busStopData } from "../bus-data/bus-stop";
import { Ionicons } from "@expo/vector-icons";

const BusStopDetails = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { busStopId } = route.params;
  const currentBusStop = busStopData.find(
    (busStop) => busStop.id === busStopId
  );

  const busStopTimes = busStopArrivalTime.find(
    (busStop) => busStop.id === busStopId
  );

  if (busStopTimes === undefined) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Text>Bus stop is not in use</Text>
        <Ionicons
          name="arrow-back"
          size={40}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  const groupTimesByHour = (times) => {
    const groupedTimes = {};
    times.forEach((time) => {
      let hour = time.split(":")[0];

      if (hour[0] === "0") {
        hour = hour[1];
      }
      if (parseInt(hour) >= 24) {
        hour = parseInt(hour) - 24;
        hour = "0" + hour;
      }
      if (!groupedTimes[hour]) {
        groupedTimes[hour] = [];
      }

      groupedTimes[hour].push(time);
    });

    const sortedHours = Object.keys(groupedTimes).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );

    const sortedGroupedTimes = {};
    sortedHours.forEach((hour) => {
      sortedGroupedTimes[hour] = groupedTimes[hour];
    });

    return sortedGroupedTimes;
  };

  const groupedTimes = groupTimesByHour(busStopTimes.times);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <View style={{ width: "100%", height: 200 }}>
        <Ionicons
          name="arrow-back"
          size={40}
          color="black"
          style={styles.iconBack}
          onPress={() => navigation.goBack()}
        />
        <Image source={currentBusStop?.image} style={styles.imageStyle} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.bottomContent}>
          <View style={styles.timeDiv}>
            <ScrollView contentContainerStyle={styles.container}>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View
                  style={{
                    width: 25,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>h</Text>
                </View>
                <View style={styles.styleMin}>
                  <Text>min</Text>
                </View>
              </View>
              {Object.keys(groupedTimes).map((hour) => (
                <View key={hour} style={styles.hourContainer}>
                  <View>
                    <Text style={{ fontSize: 28 }}>
                      {hour.length === 1 ? "0" + hour : hour}
                    </Text>
                  </View>
                  <View style={styles.timeView}>
                    {groupedTimes[hour].map((time) => (
                      <Text key={time} style={styles.timeText}>
                        {time.split(":")[1]}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  hourContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 10,
    gap: 14,
    borderTopWidth: 1,
  },
  timeText: {
    fontSize: 10,
    marginRight: 10,
    fontWeight: "bold",
  },
  timeView: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    width: 280,
  },
  styleMin: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconBack: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "white",
    left: 20,
    top: 20,
    borderRadius: 999,
  },
  imageStyle: {
    width: "100%",
    flex: 1,
  },
  bottomContent: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
  },
  timeDiv: {
    height: 400,
    width: "90%",
    gap: 6,
  },
});

export default BusStopDetails;
