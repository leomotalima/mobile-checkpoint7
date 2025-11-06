import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Components/Auth";
import { AuthStack } from "../types/navigation";
import NewUser from "../Components/Auth/NewUser";

const Stack = createNativeStackNavigator<AuthStack>();

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NewUser" component={NewUser} />
    </Stack.Navigator>
  );
};

export default Auth;
