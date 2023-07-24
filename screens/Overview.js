import { View, Text, Pressable, Image, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { busStopData, busesData, routesData } from "../bus-data/bus-stop";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { styles, styles2, mapStyle } from "../styles";
import standard from "../images/mapType/standard.jpg";
import satellite from "../images/mapType/satellite.jpg";
import { searchLocation } from "../functions/api";
import SearchBar from "../components/SearchBar";

const Overview = ({ navigation }) => {
  const defaultRegion = {
    latitude: 44.865432725353116,
    longitude: 13.85591309765663,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [region, setRegion] = useState(defaultRegion);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [mapType, setMapType] = useState("standard");
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Linking.openSettings(); // Open app settings to allow the user to grant location permission
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLoading(false);
    })();
  }, []);

  const testLocation = async (searchText) => {
    const test = await searchLocation(searchText);
    const testRegion = {
      latitude: test.latitude,
      longitude: test.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    };
    mapRef.current?.animateToRegion(testRegion, 1000);
  };

  const handleChangeMapType = () => {
    if (mapType === "standard") {
      setMapType("satellite");
      return;
    }
    setMapType("standard");
  };

  const renderBusStopMarkers = () => {
    return busStopData.map((busStop) => (
      <Marker
        key={busStop.id}
        coordinate={{
          latitude: busStop.latitude,
          longitude: busStop.longitude,
        }}
        style={styles.markerBusStopView}
        onPress={() => {
          setShowAllRoutes(false);
          setSelectedStopId(busStop.id);
        }}
      >
        <View style={styles.busStopViewMarker}>
          <MaterialIcons name="directions-bus" size={18} color="darkorange" />
        </View>
      </Marker>
    ));
  };

  const renderModalSelectedStop = () => {
    if (selectedStopId === null) {
      return;
    }
    return (
      <View style={styles.modalSelectedStop}>
        <View>
          <Image
            source={busStopData[selectedStopId]?.image}
            style={{ width: 300, flex: 1 }}
          />
        </View>
        <View style={styles.modalSelectedStopViewRightPart}>
          <View style={styles.modalSelectedStopViewRightPartTop}>
            <View style={styles.modalSelectedStopViewRightPartTopDistance}>
              <MaterialCommunityIcons
                name="foot-print"
                size={24}
                color="black"
              />

              <Text style={styles.distanceText}>
                {calculateDistance(
                  location.coords.latitude,
                  location.coords.longitude,
                  busStopData[selectedStopId].latitude,
                  busStopData[selectedStopId].longitude,
                  true
                )}
              </Text>
            </View>
            <View style={styles.modalSelectedStopViewRightPartTopBus}>
              <MaterialCommunityIcons
                name="bus-multiple"
                size={24}
                color="black"
              />

              <View style={styles.modalSelectedStopViewRightPartRoutes}>
                {renderRoutes()}
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Pressable
              style={styles.pressableClickForMoreDetails}
              onPress={() =>
                navigation.navigate("BusStopDetails", {
                  busStopId: selectedStopId,
                })
              }
            >
              <Text style={styles.textClickForMoreDetails} numberOfLines={3}>
                CLICK FOR MORE DETAILS
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const renderAllRoutesModal = () => {
    if (showAllRoutes === false) {
      return;
    }
    return (
      <View style={styles.renderAllRoutesModal}>
        <View style={styles.renderAllRoutesModalTitleView}>
          <Text style={styles.renderAllRoutesModalTitleText}>All routes:</Text>
        </View>
        <View style={styles.renderAllRoutesViewContainer}>
          {routesData.map((route) => (
            <View key={route.id} style={styles.renderAllRoutesSingleRoute}>
              <Text style={styles.renderAllRoutesSingleRouteName}>
                {route.name}
              </Text>
              <View
                style={{
                  backgroundColor: route.color,
                  height: 4,
                  width: 200,
                  marginTop: 4,
                }}
              ></View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderActiveRouteModal = () => {
    if (selectedRouteId === null) {
      return;
    }
    return (
      <View
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 999,
          top: insets.top + 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.renderActiveModalContentView}>
          <Text style={styles.renderActiveModalContentViewText}>
            Active route:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {routesData.find((route) => route.id === selectedRouteId).name}
            </Text>
          </Text>
          <Ionicons
            name="close-circle"
            size={28}
            color="black"
            onPress={() => setSelectedRouteId(null)}
          />
        </View>
      </View>
    );
  };

  const renderAllRoutes = () => {
    if (showAllRoutes === false) {
      return;
    }
    const routes = routesData.map((route) => {
      return (
        <Polyline
          key={route.id}
          coordinates={route.pathCoords}
          strokeWidth={2}
          strokeColor={route.color}
        />
      );
    });
    return routes;
  };

  const renderPolylineClosestStop = () => {
    if (selectedStopId === null) {
      return;
    }
    return (
      <Polyline
        key={selectedStopId}
        coordinates={[
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          {
            latitude: busStopData[selectedStopId].latitude,
            longitude: busStopData[selectedStopId].longitude,
          },
        ]}
        strokeWidth={2}
        strokeColor="black"
        lineDashPattern={[10, 10]} // Customize the dash pattern here
      />
    );
  };

  const renderRoutePath = () => {
    if (selectedRouteId === null) {
      return;
    }
    const route = routesData.find((route) => route.id === selectedRouteId);
    // mapRef.current?.animateToRegion(route.pathCoords[0]);
    return (
      <Polyline
        coordinates={route.pathCoords}
        strokeWidth={2}
        strokeColor={route.color}
      />
    );
  };

  const renderRoutes = () => {
    const routesOnSelectedStopId = routesData.filter((route) =>
      route.stops.includes(selectedStopId)
    );

    return routesOnSelectedStopId.map((route) => (
      <Pressable
        key={route.id}
        style={{
          width: 24,
          height: 24,
          backgroundColor: route.color,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setSelectedRouteId(route.id);
        }}
      >
        <Text style={styles.busText}>{route.name}</Text>
      </Pressable>
    ));
  };

  const handleClosestStop = () => {
    setShowAllRoutes(false);
    if (selectedStopId !== null) {
      setSelectedStopId(null);
      return;
    }

    const startLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const allDistances = busStopData.map((busStop) => {
      return {
        id: busStop.id,
        distance: calculateDistance(
          startLocation.latitude,
          startLocation.longitude,
          busStop.latitude,
          busStop.longitude
        ),
        latitude: busStop.latitude,
        longitude: busStop.longitude,
      };
    });
    const smallestDistances = allDistances.filter(
      (obj) =>
        obj.distance === Math.min(...allDistances.map((obj) => obj.distance))
    );
    const region = {
      latitude: smallestDistances[0].latitude,
      longitude: smallestDistances[0].longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    };

    mapRef.current?.animateToRegion(region, 500);
    setSelectedStopId(smallestDistances[0].id);
  };

  const handleShowAllRoutes = () => {
    setSelectedStopId(null);
    setSelectedRouteId(null);
    setShowAllRoutes((current) => !current);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2, toString) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    if (toString) {
      const stringNumber = "~" + (distance * 1000).toFixed(1).toString() + "m";
      return stringNumber;
    }

    return distance;
  };

  const toRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  const handleCheckRegion = (newRegion) => {
    const distance = calculateDistance(
      location.coords.latitude,
      location.coords.longitude,
      newRegion.latitude,
      newRegion.longitude,
      false
    );

    if (distance > 10) {
      mapRef.current?.animateToRegion(defaultRegion, 1000);
    }
  };

  if (isLoading) {
    return (
      <View style={styles2.container}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles2.activityIndicator}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      {renderModalSelectedStop()}
      {renderAllRoutesModal()}
      {renderActiveRouteModal()}
      <SearchBar testLocation={testLocation} />
      <MapView
        style={styles.map}
        mapType={mapType}
        region={region}
        onRegionChangeComplete={handleCheckRegion}
        ref={mapRef}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        onUserLocationChange={(event) => {
          const currentLocation = event.nativeEvent.coordinate;
          if (!currentLocation) {
            return;
          }
          const { latitude, longitude } = currentLocation;
          setLocation({
            coords: {
              latitude,
              longitude,
            },
          });
        }}
        onPress={() => {
          setSelectedRouteId(null);
          setSelectedStopId(null);
        }}
      >
        {renderPolylineClosestStop()}
        {renderAllRoutes()}
        {renderRoutePath()}
        {renderBusStopMarkers()}
      </MapView>
      <View style={styles.buttonClosestStop}>
        <Pressable onPress={handleClosestStop}>
          <MaterialCommunityIcons name="bus-stop" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.buttonRoutes}>
        <Pressable onPress={handleShowAllRoutes}>
          <FontAwesome5 name="route" size={30} color="black" />
        </Pressable>
      </View>
      <View style={styles.buttonChangeMapStyle}>
        <Pressable onPress={handleChangeMapType}>
          <Image
            source={mapType === "standard" ? standard : satellite}
            style={styles.imageContainer}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Overview;
