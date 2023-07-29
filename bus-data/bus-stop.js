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
        latitude: 44.879109984727535,
        longitude: 13.86339891775331,
      },
      {
        latitude: 44.879431600145345,
        longitude: 13.862965515292569,
      },
      {
        latitude: 44.87851047576797,
        longitude: 13.861450626883196,
      },
      {
        latitude: 44.87845293949115,
        longitude: 13.861247635507352,
      },
      {
        latitude: 44.878366634968,
        longitude: 13.861202526312722,
      },
      {
        latitude: 44.87826594619407,
        longitude: 13.861236358208695,
      },
      {
        latitude: 44.87701721534451,
        longitude: 13.860457603935846,
      },
      {
        latitude: 44.87674186217728,
        longitude: 13.860198401912209,
      },
      {
        latitude: 44.87634189669469,
        longitude: 13.859429091379328,
      },
      {
        latitude: 44.87593133785076,
        longitude: 13.858234729552175,
      },
      {
        latitude: 44.875639573766684,
        longitude: 13.85749531432441,
      },
      {
        latitude: 44.875164148376534,
        longitude: 13.856606287625961,
      },
      {
        latitude: 44.87488687225803,
        longitude: 13.855498560767135,
      },
      {
        latitude: 44.874448356940206,
        longitude: 13.854366216648788,
      },
      {
        latitude: 44.87394926926975,
        longitude: 13.854082170064355,
      },
      {
        latitude: 44.87321416699619,
        longitude: 13.853798449603778,
      },
      {
        latitude: 44.872516131638484,
        longitude: 13.853493346320478,
      },
      {
        latitude: 44.87103347023669,
        longitude: 13.852838887302767,
      },
      {
        latitude: 44.86861267876348,
        longitude: 13.85177962668358,
      },
      {
        latitude: 44.867539109735496,
        longitude: 13.851201659224863,
      },
      {
        latitude: 44.86654682211066,
        longitude: 13.850561902696898,
      },
      {
        latitude: 44.86550600392091,
        longitude: 13.849791438161997,
      },
      {
        latitude: 44.86536269027257,
        longitude: 13.849657134146646,
      },
      {
        latitude: 44.86521881660867,
        longitude: 13.849544361160067,
      },
      {
        latitude: 44.86462573358476,
        longitude: 13.849283855512045,
      },
      {
        latitude: 44.863863189288644,
        longitude: 13.848972602011528,
      },
      {
        latitude: 44.863071859062615,
        longitude: 13.848686158620263,
      },
      {
        latitude: 44.862586701228835,
        longitude: 13.848463826221272,
      },
      {
        latitude: 44.86077927361394,
        longitude: 13.847659496329454,
      },
      {
        latitude: 44.86064873833979,
        longitude: 13.847491046721702,
      },
      {
        latitude: 44.86080042265034,
        longitude: 13.846656951666178,
      },
      {
        latitude: 44.86100385179886,
        longitude: 13.845862347280146,
      },
      {
        latitude: 44.860987216265215,
        longitude: 13.845823455224874,
      },
      {
        latitude: 44.85987217944034,
        longitude: 13.845330977766462,
      },
      {
        latitude: 44.85912308560949,
        longitude: 13.845037275890773,
      },
      {
        latitude: 44.85824842476155,
        longitude: 13.84466104607559,
      },
      {
        latitude: 44.858142887827604,
        longitude: 13.84465535625221,
      },
      {
        latitude: 44.85812272151245,
        longitude: 13.844576647020082,
      },
      {
        latitude: 44.85806711177723,
        longitude: 13.844552034148645,
      },
      {
        latitude: 44.858014542566465,
        longitude: 13.844597487402478,
      },
      {
        latitude: 44.85801623834812,
        longitude: 13.844699557858215,
      },
      {
        latitude: 44.858053545532165,
        longitude: 13.844748200809775,
      },
      {
        latitude: 44.85797271326731,
        longitude: 13.844975467074082,
      },
    ],
    // pathCoords: [
    //   {
    //     latitude: 44.863828,
    //     longitude: 13.848977,
    //   },
    //   {
    //     latitude: 44.863048,
    //     longitude: 13.848685,
    //   },
    //   {
    //     latitude: 44.8629,
    //     longitude: 13.849498,
    //   },
    //   {
    //     latitude: 44.863527,
    //     longitude: 13.850627,
    //   },
    // ],
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
