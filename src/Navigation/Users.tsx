import { createNativeStackNavigator } from "@react-navigation/native-stack";
import List from "../Components/Users/List";
import Details from "../Components/Users/Details";
import { UsersStack } from "../types/navigation";
import Form from "../Components/Users/Form";
import { StudentProvider } from "../Context/StudentContext";
import Add from "../Components/Users/Add";

const Stack = createNativeStackNavigator<UsersStack>();

const UsersNavigation = () => {
  return (
    <StudentProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={List}
          options={{
            headerRight: () => <Add />,
          }}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Form" component={Form} />
      </Stack.Navigator>
    </StudentProvider>
  );
};

export default UsersNavigation;
