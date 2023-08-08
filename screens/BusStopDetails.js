import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { busStopArrivalTime, busStopData } from "../bus-data/bus-stop";
import { Ionicons } from "@expo/vector-icons";

const BusStopDetails = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { busStopId } = route.params;

  console.log(busStopId);

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

    // Sort the keys in ascending order with custom sorting logic
    const sortedHours = Object.keys(groupedTimes).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );

    // Reorganize the groups based on sorted keys
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
          style={{
            position: "absolute",
            zIndex: 100,
            backgroundColor: "white",
            left: 20,
            top: 20,
            borderRadius: 999,
          }}
          onPress={() => navigation.goBack()}
        />
        <Image
          source={currentBusStop?.image}
          style={{ width: "100%", flex: 1 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#fafafa",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 400,
              width: "90%",
              gap: 6,
              // backgroundColor: "lightgrey",
            }}
          >
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
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text>min</Text>
                </View>
              </View>
              {Object.keys(groupedTimes).map((hour) => (
                <View key={hour} style={styles.hourContainer}>
                  <Text style={{ fontSize: 20 }}>
                    {hour.length === 1 ? "0" + hour : hour}
                  </Text>
                  {groupedTimes[hour].map((time) => (
                    <Text key={time} style={styles.timeText}>
                      {time.split(":")[1]}
                    </Text>
                  ))}
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
});

export default BusStopDetails;
