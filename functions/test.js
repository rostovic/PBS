import jsonFile from "./test_1_2.json";

export const decodePolyline = (polylineStr) => {
  let index = 0;
  const points = [];
  let lat = 0;
  let lng = 0;

  while (index < polylineStr.length) {
    let shift = 0;
    let result = 0;
    let byte;

    do {
      byte = polylineStr.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;

    do {
      byte = polylineStr.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    points.push([lat * 1e-5, lng * 1e-5]);
  }

  return points;
};

export const parseJSONRoute = () => {
  const data = jsonFile;
  //   console.log(data.routes[0].legs[0].steps[0].start_location.lat);
  const route = [];
  data.routes[0].legs[0].steps.forEach((step) => {
    const decodedPolylineCoords = decodePolyline(step.polyline.points).map(
      (polyline) => {
        return { latitude: polyline[0], longitude: polyline[1] };
      }
    );

    // console.log(decodedPolylineCoords);
    route.push(
      {
        latitude: step.start_location.lat,
        longitude: step.start_location.lng,
      },
      ...decodedPolylineCoords,
      {
        latitude: step.end_location.lat,
        longitude: step.end_location.lng,
      }
    );
  });

  //   console.log(
  //     "-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  //   );
  //   console.log(
  //     "-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  //   );
  //   console.log(
  //     "-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  //   );
  //   console.log(
  //     "-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"
  //   );
  //   console.log(route);
};
