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
    top: 300,
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
    top: 375,
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
    borderWidth: 0.5,
    borderColor: "lightgray",
    borderRadius: 999,
    padding: 6,
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
    height: "80%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
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
    gap: 2,
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
  },
  buttonChangeMapStyle: {
    position: "absolute",
    top: 450,
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
});

export { mapStyle, styles2, styles, help };
