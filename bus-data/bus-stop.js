const busStopData = [
  {
    id: 0,
    name: "MARULICEVA-A",
    latitude: 44.862631515447056,
    longitude: 13.848365364253958,
    image: require("../images/MARULICEVA-A.jpg"),
  },
  {
    id: 1,
    name: "TRG REPUBLIKE -B (MUP - CENTAR)",
    latitude: 44.86562625806086,
    longitude: 13.850121463015592,
    image: "",
  },
];

const routesData = [
  {
    id: 0,
    name: "3a",
    color: "aqua",
    stops: [0],
    pathCoords: [
      {
        latitude: 44.863828,
        longitude: 13.848977,
      },
      {
        latitude: 44.863048,
        longitude: 13.848685,
      },
      {
        latitude: 44.8629,
        longitude: 13.849498,
      },
      {
        latitude: 44.863527,
        longitude: 13.850627,
      },
    ],
  },
];

const busesData = [
  {
    id: 0,
    name: "Bus 1",
    routes: [0],
  },
  {
    id: 1,
    name: "Bus 2",
    routes: [0],
  },
];

export { busStopData, busesData, routesData };
