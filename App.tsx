import { NavigationContainer } from "@react-navigation/native";
import UsersNavigation from "./src/Navigation/Users";
import Login from "./src/Components/Auth";
import { AuthProvider } from "./src/Context/AuthContext";
import Index from "./src/Navigation";

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
