import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonClosestStop: {
    position: "absolute",
    top: 250,
    right: 10,
    zIndex: 1,
    width: 50,
    height: 50,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRoutes: {
    position: "absolute",
    top: 325,
    right: 10,
    zIndex: 1,
    width: 50,
    height: 50,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 6,
  },

  distanceText: {
    fontWeight: 700,
    fontSize: 12,
  },

  busText: {
    fontWeight: 700,
    fontSize: 10,
    color: "white",
  },
  modalSelectedStop: {
    flexDirection: "row",
    height: 200,
    flex: 1,
    position: "absolute",
    backgroundColor: "white",
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  busStopViewMarker: {
    width: 20,
    height: 20,
    borderWidth: 0.5,
    borderColor: "lightgray",
    borderRadius: 999,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
  },
  renderAllRoutesModal: {
    height: 200,
    flex: 1,
    position: "absolute",
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  renderAllRoutesModalTitleView: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  renderAllRoutesModalTitleText: {
    fontWeight: 700,
    fontSize: 16,
  },
  renderAllRoutesViewContainer: {
    flexGrow: 1,
    padding: 16,
    gap: 8,
  },
  renderAllRoutesSingleRoute: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  renderAllRoutesSingleRouteName: {
    fontWeight: 700,
  },

  renderActiveModalContentView: {
    width: "50%",
    borderRadius: 30,
    padding: 14,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  renderActiveModalContentViewText: {
    width: "80%",
    textAlign: "center",
  },

  markerBusStopView: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalSelectedStopViewRightPart: {
    flex: 1,
    backgroundColor: "white",
  },
  modalSelectedStopViewRightPartTop: {
    flex: 1,
    alignItems: "center",
  },

  modalSelectedStopViewRightPartTopDistance: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingLeft: 4,
    gap: 4,
  },
  modalSelectedStopViewRightPartTopBus: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingLeft: 4,
    gap: 4,
  },
  modalSelectedStopViewRightPartRoutes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
    width: 80,
  },
  pressableClickForMoreDetails: {
    flex: 1,
    backgroundColor: "aqua",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textClickForMoreDetails: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 12,
  },
  buttonChangeMapStyle: {
    position: "absolute",
    top: 400,
    right: 10,
    zIndex: 1,
    width: 50,
    height: 50,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
  },
  imageContainer: {
    width: 49, // Set the desired width
    height: 49, // Set the desired height
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  errorStreet: {
    width: 200,
    height: 25,
    backgroundColor: "white",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 2,
  },
  streetInstructions: {
    width: 300,
    height: 75,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
  },
  closeInstructions: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 4,
    right: 4,
  },
  pressableSingleRoute: {
    width: 35,
    height: 35,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: {
    transform: [{ scale: 2 }],
  },
});

const mapStyle = [
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const help = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 10,
  },
  singleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  customRow1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  customView1: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  textBackground1: {
    width: 35,
    height: 35,
    backgroundColor: "aqua",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  customBusIconStyle: {
    borderWidth: 0.5,
    borderColor: "lightgray",
    borderRadius: 999,
    padding: 6,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
  },
  infoMadeBy: {
    justifyContent: "center",
    height: 250,
    width: "100%",
    alignItems: "center",
  },
  imageContainerFipu: {
    height: 100,
    width: 300,
    resizeMode: "contain",
  },
});

const firstScreenStyle = StyleSheet.create({
  imageView: {
    height: 500,
    width: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  textIconView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    gap: 50,
  },
  greetingsText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#29733B",
  },
  pressableContinue: {
    backgroundColor: "#29733B",
    borderRadius: 999,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

const settingsStyle = StyleSheet.create({
  contentView: {
    width: 300,
    height: 600,
    alignItems: "center",
  },
  changeLangView: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  changeLangButton: {
    width: 150,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  langModal: {
    position: "absolute",
    zIndex: 999,
    height: 120,
    width: 400,
    top: 135,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    backgroundColor: "#fafafa",
  },
});

const searchBar = StyleSheet.create({
  searchBar: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarInput: {
    width: "100%",
    height: "100%",
    textAlign: "center",
  },
  buttonSearchLocation: {
    position: "absolute",
    right: 10,
    zIndex: 1,
    width: 35,
    height: 35,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export {
  mapStyle,
  styles2,
  styles,
  help,
  firstScreenStyle,
  settingsStyle,
  searchBar,
};
