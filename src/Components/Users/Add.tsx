import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UsersStack } from "../../types/navigation";
import { IconButton } from "react-native-paper";

const Add = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UsersStack>>();
  return <IconButton icon="plus" onPress={() => navigation.navigate("Form")} />;
};

export default Add;
