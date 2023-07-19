import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./Help";
import Overview from "./Overview";
import BusStopDetails from "./BusStopDetails";

const Stack = createNativeStackNavigator();

const TabHomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Overview"
        component={Overview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BusStopDetails"
        component={BusStopDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TabHomeScreen;
