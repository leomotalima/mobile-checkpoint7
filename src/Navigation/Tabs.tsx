import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UsersNavigation from "./Users";
import Config from "../Components/Config";
import { HomeTabs } from "../types/navigation";

const Stack = createBottomTabNavigator<HomeTabs>();

const Tabs = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Students" component={UsersNavigation} />
      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
};

export default Tabs;
