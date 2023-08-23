import { View, Text, Pressable, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { busStopData, routesData } from "../bus-data/bus-stop";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { styles, styles2, mapStyle } from "../styles";
import standard from "../images/mapType/standard.jpg";
import satellite from "../images/mapType/satellite.jpg";
import { searchLocation } from "../functions/api";
import SearchBar from "../components/SearchBar";
import { UserContext } from "../context/context";
import langs from "../lang-data/langs";
import {
  calculateDistance,
  findNearestBusStopAtDesiredLocation,
} from "../functions/helpers";
import { parseJSONRoute } from "../convert-functions/getDataConvert";
import { ScrollView } from "react-native";

const Overview = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const userCtx = useContext(UserContext);
  const currentLang = langs.find(
    (lang) => lang.name === userCtx.userData.data.lang
  );
  const markerRenderRadius = userCtx.userData.data.radius;

  const defaultRegion = {
    latitude: 44.865432725353116,
    longitude: 13.85591309765663,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [region, setRegion] = useState(defaultRegion);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [mapType, setMapType] = useState("standard");
  const [showSearchedStreet, setShowSearchedStreet] = useState(null);
  const [routesToMarker, setRoutesToMarker] = useState(null);
  const [errorShowPath, setErrorShowPath] = useState(null);
  const [regionChange, setRegionChange] = useState({
    latitude: 44.865432725353116,
    longitude: 13.85591309765663,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const mapRef = useRef(null);
  let regionChangeTimeout = null;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Linking.openSettings();
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!routesToMarker) {
      setShowAllRoutes(false);
    } else {
      setShowAllRoutes(true);
    }
  }, [routesToMarker]);

  const busStopDataInUse = useMemo(() => {
    return busStopData.filter((busStop) => busStop.inUse);
  }, []);

  const handleClosestPath = () => {
    const markerStops = [];
    const personStops = [];
    const possibleRoutesIDs = [];
    const correctRoutesData = [];

    busStopDataInUse.forEach((busStop) => {
      const distanceToMarker = calculateDistance(
        showSearchedStreet.latitude,
        showSearchedStreet.longitude,
        busStop.latitude,
        busStop.longitude
      );
      const distanceToPerson = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        busStop.latitude,
        busStop.longitude
      );
      if (distanceToMarker <= 0.25 && !markerStops.includes(busStop.id)) {
        markerStops.push(busStop.id);
      }
      if (distanceToPerson <= 0.25 && !personStops.includes(busStop.id)) {
        personStops.push(busStop.id);
      }
    });

    routesData.forEach((route) => {
      const passes =
        route.stops.some((id) => markerStops.includes(id)) &&
        route.stops.some((id) => personStops.includes(id));
      if (passes && !possibleRoutesIDs.includes(route.id)) {
        possibleRoutesIDs.push(route.id);
      }
    });

    possibleRoutesIDs.forEach((possibleRouteID) => {
      let personStopID;
      let wayPointStopID;
      const singleRoute = routesData.find(
        (route) => route.id === possibleRouteID
      );
      const distancesToPerson = singleRoute.stops
        .map((busStop) => {
          const singleStop = busStopData.find((stop) => stop.id === busStop);
          return {
            stopId: singleStop.id,
            distance: calculateDistance(
              location.coords.latitude,
              location.coords.longitude,
              singleStop.latitude,
              singleStop.longitude
            ),
          };
        })
        .sort((a, b) => {
          return a.distance < b.distance ? -1 : 1;
        });

      const distancesToMarker = singleRoute.stops
        .map((busStop) => {
          const singleStop = busStopData.find((stop) => stop.id === busStop);
          return {
            stopId: singleStop.id,
            distance: calculateDistance(
              showSearchedStreet.latitude,
              showSearchedStreet.longitude,
              singleStop.latitude,
              singleStop.longitude
            ),
          };
        })
        .sort((a, b) => {
          return a.distance < b.distance ? -1 : 1;
        });
      wayPointStopID = distancesToMarker[0].stopId;
      personStopID = distancesToPerson[0].stopId;
      const wayPointStopIndex = singleRoute.stops.indexOf(wayPointStopID);
      const personStopIndex = singleRoute.stops.indexOf(personStopID);

      if (personStopIndex < wayPointStopIndex) {
        correctRoutesData.push({
          id: singleRoute.id,
          numOfStops: wayPointStopIndex - personStopIndex,
          startStopID: personStopID,
          endStopID: wayPointStopID,
        });
      }
    });

    correctRoutesData.sort((a, b) => (a.numOfStops < b.numOfStops ? -1 : 1));
    if (correctRoutesData.length > 0) {
      setRoutesToMarker(correctRoutesData);
    } else {
      setErrorShowPath(true);
      setRoutesToMarker(null);
    }
  };

  const findLocation = async (searchText) => {
    setSelectedRouteId(null);
    setShowAllRoutes(false);
    setSelectedStopId(null);
    const foundLocation = await searchLocation(searchText);

    if (foundLocation.status === "fail") {
      setShowSearchedStreet("error");
      return;
    }
    const selectedRegion = {
      latitude: foundLocation.latitude,
      longitude: foundLocation.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    };
    setShowSearchedStreet({
      streetName: searchText,
      latitude: selectedRegion.latitude,
      longitude: selectedRegion.longitude,
    });

    const nearStop = findNearestBusStopAtDesiredLocation({
      latitude: selectedRegion.latitude,
      longitude: selectedRegion.longitude,
    });

    mapRef.current?.animateToRegion(selectedRegion, 1000);

    setTimeout(() => {
      mapRef.current?.animateToRegion(
        {
          latitude: nearStop.latitude,
          longitude: nearStop.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        },
        1500
      );
    }, 2500);
  };

  const handleChangeMapType = () => {
    if (mapType === "standard") {
      setMapType("satellite");
      return;
    }
    setMapType("standard");
  };

  const renderSearchedStreetMarker = () => {
    if (showSearchedStreet === null || showSearchedStreet === "error") {
      return;
    }

    return (
      <Marker
        key={showSearchedStreet.latitude}
        tracksViewChanges={false}
        coordinate={{
          latitude: showSearchedStreet.latitude,
          longitude: showSearchedStreet.longitude,
        }}
      ></Marker>
    );
  };

  const renderSearchBarError = () => {
    if (showSearchedStreet !== "error") {
      return;
    }

    setTimeout(() => {
      setShowSearchedStreet(null);
    }, 3000);

    return (
      <View
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 999,
          top: insets.top + 70,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 50,
        }}
      >
        <View style={styles.errorStreet}>
          <Text style={{ fontSize: 10 }}>{currentLang.errorStreet}</Text>
        </View>
      </View>
    );
  };

  const renderStreetInstructions = () => {
    if (showSearchedStreet === null || showSearchedStreet === "error") {
      return;
    }

    const nearStop = findNearestBusStopAtDesiredLocation(showSearchedStreet);

    return (
      <View
        style={{
          width: "100%",
          position: "absolute",
          zIndex: 999,
          top: insets.top + 70,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 100,
        }}
      >
        <View style={styles.streetInstructions}>
          <Pressable
            style={styles.closeInstructions}
            onPress={() => {
              setErrorShowPath(null);
              setRoutesToMarker(null);
              setShowSearchedStreet(null);
            }}
          >
            <AntDesign name="closecircle" size={24} color="black" />
          </Pressable>

          <Text style={{ fontSize: 10 }}>
            {currentLang.distanceFromYourLocation}{" "}
            {calculateDistance(
              location.coords.latitude,
              location.coords.longitude,
              showSearchedStreet.latitude,
              showSearchedStreet.longitude,
              true
            )}
          </Text>
          <Text style={{ fontSize: 10 }}>
            {currentLang.nearestStopAtDesiredLocation}{" "}
            {calculateDistance(
              showSearchedStreet.latitude,
              showSearchedStreet.longitude,
              nearStop.latitude,
              nearStop.longitude,
              true
            )}
          </Text>
          <Pressable
            style={{
              backgroundColor: "aqua",
              width: 150,
              height: 30,
              marginTop: 8,
              borderRadius: 999,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleClosestPath}
          >
            <Text style={{ color: "white", fontWeight: 700 }}>
              {currentLang.showPath}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const renderStreetInstructionsError = () => {
    if (errorShowPath === null) {
      return null;
    }
    return (
      <View
        style={{
          width: 320,
          height: 120,
          position: "absolute",
          zIndex: 9999,
          backgroundColor: "#fafafa",
          top: insets.top + 250,
          right: insets.right + 50,
          borderWidth: 1,
          borderColor: "black",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <AntDesign name="warning" size={24} color="red" />
        <Text style={{ fontSize: 12 }}>{currentLang.adequateRoute}</Text>
        <Pressable
          style={{
            width: 50,
            height: 25,
            borderRadius: 999,
            backgroundColor: "aqua",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setErrorShowPath(null);
          }}
        >
          <Text style={{ color: "white", fontWeight: 700 }}>OK</Text>
        </Pressable>
      </View>
    );
  };

  const renderPolylineClosestStreetStop = () => {
    if (routesToMarker !== null) {
      return;
    }
    if (showSearchedStreet === null || showSearchedStreet === "error") {
      return;
    }
    const nearestStop = findNearestBusStopAtDesiredLocation(showSearchedStreet);
    return (
      <>
        <Polyline
          key={nearestStop.latitude}
          coordinates={[
            {
              latitude: showSearchedStreet.latitude,
              longitude: showSearchedStreet.longitude,
            },
            {
              latitude: nearestStop.latitude,
              longitude: nearestStop.longitude,
            },
          ]}
          strokeWidth={2}
          strokeColor="black"
          lineDashPattern={[10, 10]}
        />
        <Polyline
          key={location.latitude}
          coordinates={[
            {
              latitude: showSearchedStreet.latitude,
              longitude: showSearchedStreet.longitude,
            },
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          ]}
          strokeWidth={2}
          strokeColor="black"
          lineDashPattern={[10, 10]}
        />
      </>
    );
  };

  const renderBusStopMarkers = () => {
    // parseJSONRoute();
    if (routesToMarker !== null && selectedRouteId !== null) {
      const selectedRoute = routesToMarker.filter(
        (route) => route.id === selectedRouteId
      );

      const startStop = busStopData.find(
        (stop) => stop.id === selectedRoute[0].startStopID
      );
      const endStop = busStopData.find(
        (stop) => stop.id === selectedRoute[0].endStopID
      );

      let allMarkers = busStopData.map(
        (busStop) =>
          routesData[selectedRouteId].stops.includes(busStop.id) && (
            <Marker
              key={busStop.id}
              coordinate={{
                latitude: busStop.latitude,
                longitude: busStop.longitude,
              }}
              tracksViewChanges={false}
              style={styles.markerBusStopView}
              onPress={() => {
                setShowAllRoutes(false);
                setSelectedStopId(busStop.id);
              }}
            >
              {busStop.id === startStop.id ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 12, fontWeight: 700 }}>
                      {currentLang.start}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.busStopViewMarker,
                      { borderColor: "green", borderWidth: 2 },
                    ]}
                  >
                    <MaterialIcons
                      name="directions-bus"
                      size={10}
                      color="darkorange"
                    />
                  </View>
                </View>
              ) : null}
              {busStop.id === endStop.id ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 12, fontWeight: 700 }}>
                      {currentLang.finish}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.busStopViewMarker,
                      { borderColor: "red", borderWidth: 2 },
                    ]}
                  >
                    <MaterialIcons
                      name="directions-bus"
                      size={10}
                      color="darkorange"
                    />
                  </View>
                </View>
              ) : null}
              {busStop.id !== startStop.id && busStop.id !== endStop.id ? (
                <View style={styles.busStopViewMarker}>
                  <MaterialIcons
                    name="directions-bus"
                    size={10}
                    color="darkorange"
                  />
                </View>
              ) : null}
            </Marker>
          )
      );

      return allMarkers;
    }

    if (selectedRouteId !== null) {
      return busStopData.map(
        (busStop) =>
          routesData[selectedRouteId].stops.includes(busStop.id) && (
            <Marker
              key={busStop.id}
              coordinate={{
                latitude: busStop.latitude,
                longitude: busStop.longitude,
              }}
              tracksViewChanges={false}
              style={styles.markerBusStopView}
              onPress={() => {
                setShowAllRoutes(false);
                setSelectedStopId(busStop.id);
              }}
            >
              <View style={styles.busStopViewMarker}>
                <MaterialIcons
                  name="directions-bus"
                  size={10}
                  color="darkorange"
                />
              </View>
            </Marker>
          )
      );
    }

    return busStopDataInUse.map((busStop) =>
      calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        busStop.latitude,
        busStop.longitude
      ) < markerRenderRadius ? (
        <Marker
          key={busStop.id}
          coordinate={{
            latitude: busStop.latitude,
            longitude: busStop.longitude,
          }}
          style={styles.markerBusStopView}
          tracksViewChanges={false}
          onPress={() => {
            setShowAllRoutes(false);
            setSelectedStopId(busStop.id);
          }}
        >
          <View style={styles.busStopViewMarker}>
            <MaterialIcons name="directions-bus" size={14} color="darkorange" />
          </View>
        </Marker>
      ) : null
    );
  };

  const renderModalSelectedStop = () => {
    if (selectedStopId === null) {
      return;
    }

    const currentBusStop = busStopData.find(
      (busStop) => busStop.id === selectedStopId
    );

    // console.log(currentBusStop);

    return (
      <View style={styles.modalSelectedStop}>
        <View>
          <Image
            source={currentBusStop?.image}
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
                  currentBusStop.latitude,
                  currentBusStop.longitude,
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
              flex: 0.5,
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
                {currentLang.stopDetails}
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

    let routesForRender = routesData;

    if (routesToMarker) {
      const tempArray = routesToMarker.map((route) => route.id);
      routesForRender = routesData
        .filter((route) =>
          routesToMarker.some((markerRoute) => markerRoute.id === route.id)
        )
        .sort((a, b) => {
          const indexA = tempArray.indexOf(a.id);
          const indexB = tempArray.indexOf(b.id);
          return indexA - indexB;
        });

      return (
        <View style={styles.renderAllRoutesModal}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              gap: 50,
            }}
          ></View>
          <View style={{ flexDirection: "row", gap: 20, marginTop: 10 }}>
            <Text style={{ fontWeight: 700 }}>Route</Text>
            <Text style={{ fontWeight: 700 }}>Num. of stops</Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.renderAllRoutesViewContainer}
          >
            {routesForRender.map((route) => (
              <View key={route.id} style={styles.renderAllRoutesSingleRoute}>
                <Pressable
                  style={styles.pressableSingleRoute}
                  onPress={() => {
                    setShowSearchedStreet(null);
                    setSelectedRouteId(route.id);
                  }}
                >
                  <Text style={styles.renderAllRoutesSingleRouteName}>
                    {route.name}
                  </Text>
                </Pressable>
                <Text style={{ fontWeight: 700, fontSize: 16 }}>
                  {
                    routesToMarker.find((element) => element.id === route.id)
                      .numOfStops
                  }
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.renderAllRoutesModal}>
        <View style={styles.renderAllRoutesModalTitleView}>
          <Text style={styles.renderAllRoutesModalTitleText}>
            {currentLang.allRoutes}
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.renderAllRoutesViewContainer}>
          {routesForRender.map((route) => (
            <View
              key={route.id}
              style={[
                styles.renderAllRoutesSingleRoute,
                { justifyContent: "center" },
              ]}
            >
              <Pressable
                style={styles.pressableSingleRoute}
                onPress={() => {
                  setShowSearchedStreet(null);
                  setSelectedRouteId(route.id);
                }}
              >
                <Text style={styles.renderAllRoutesSingleRouteName}>
                  {route.name}
                </Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
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
          top: insets.top + 80,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.renderActiveModalContentView}>
          <Text style={styles.renderActiveModalContentViewText}>
            {currentLang.activeRoute}
            <Text style={{ fontWeight: "bold" }}>
              {" " +
                routesData.find((route) => route.id === selectedRouteId).name}
            </Text>
          </Text>
          <Ionicons
            name="close-circle"
            size={28}
            color="black"
            onPress={() => {
              setShowAllRoutes(null);
              setRoutesToMarker(null);
              setSelectedRouteId(null);
            }}
          />
        </View>
      </View>
    );
  };

  const renderPolylineClosestStop = () => {
    if (selectedStopId === null) {
      return;
    }

    const currentBusStop = busStopData.find(
      (busStop) => busStop.id === selectedStopId
    );
    return (
      <Polyline
        key={selectedStopId}
        coordinates={[
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          {
            latitude: currentBusStop.latitude,
            longitude: currentBusStop.longitude,
          },
        ]}
        strokeWidth={2}
        strokeColor="black"
        lineDashPattern={[10, 10]}
      />
    );
  };

  const renderRoutePath = () => {
    if (selectedRouteId === null) {
      return;
    }
    let route = routesData.find((route) => route.id === selectedRouteId);

    return (
      <Polyline
        key={route.id}
        coordinates={route.pathCoords}
        strokeWidth={3}
        strokeColor={routesToMarker === null ? route.color : "aqua"}
      />
    );
  };

  const renderRoutes = () => {
    const routesOnSelectedStopId = routesData.filter((route) => {
      if (
        route.stops.includes(selectedStopId) &&
        !(route.stops[route.stops.length - 1] === selectedStopId)
      ) {
        return route.name;
      }
    });

    return routesOnSelectedStopId.map((route) => (
      <Pressable
        key={route.id}
        style={{
          width: 24,
          height: 24,
          borderRadius: 999,
          backgroundColor: route.color,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setRoutesToMarker(null);
          setShowSearchedStreet(null);
          setSelectedRouteId(route.id);
        }}
      >
        <Text style={styles.busText}>{route.name}</Text>
      </Pressable>
    ));
  };

  const renderButtons = () => {
    return (
      <>
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
      </>
    );
  };

  const handleClosestStop = () => {
    setSelectedRouteId(null);
    setShowSearchedStreet(null);
    setShowAllRoutes(false);
    if (selectedStopId !== null) {
      setSelectedStopId(null);
      return;
    }

    const startLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const allDistances = busStopDataInUse.map((busStop) => {
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

  const handleCheckRegion = (newRegion) => {
    const distance = calculateDistance(
      location.coords.latitude,
      location.coords.longitude,
      newRegion.latitude,
      newRegion.longitude,
      false
    );

    if (distance > 15) {
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
      <SearchBar findLocation={findLocation} />
      {renderStreetInstructions()}
      {renderModalSelectedStop()}
      {renderAllRoutesModal()}
      {renderActiveRouteModal()}
      {renderSearchBarError()}
      {renderButtons()}
      {renderStreetInstructionsError()}
      <MapView
        style={styles.map}
        mapType={mapType}
        initialRegion={region}
        onRegionChangeComplete={(region) => {
          if (regionChangeTimeout) {
            clearTimeout(regionChangeTimeout);
          }

          regionChangeTimeout = setTimeout(() => {
            handleCheckRegion(region);
            setRegionChange(region);
          }, 1000);
        }}
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
        {renderSearchedStreetMarker()}
        {renderPolylineClosestStop()}
        {renderRoutePath()}
        {renderBusStopMarkers()}
        {renderPolylineClosestStreetStop()}
      </MapView>
    </View>
  );
};

export default Overview;
