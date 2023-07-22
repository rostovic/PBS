import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Overview from "../screens/Overview";
import BusStopDetails from "../screens/BusStopDetails";

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
