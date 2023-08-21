import { busStopData } from "../bus-data/bus-stop";

export const findNearestBusStopAtDesiredLocation = (streetLocation) => {
  const allDistances = busStopData
    .filter((busStop) => busStop.inUse)
    .map((busStop) => {
      return {
        id: busStop.id,
        distance: calculateDistance(
          streetLocation.latitude,
          streetLocation.longitude,
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
  const nearestBusStop = {
    latitude: smallestDistances[0].latitude,
    longitude: smallestDistances[0].longitude,
  };
  return nearestBusStop;
};

export const calculateDistance = (lat1, lon1, lat2, lon2, toString) => {
  const R = 6371;
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

export const getRandomColorRGB = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red},${green},${blue})`;
};
