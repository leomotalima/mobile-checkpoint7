import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Surface, TextInput } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStack } from "../../types/navigation";

const Login = ({ navigation }: NativeStackScreenProps<AuthStack>) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Surface style={styles.container}>
      <TextInput placeholder="email" onChangeText={setEmail} />
      <TextInput placeholder="password" onChangeText={setPassword} />
      <Button onPress={() => login(email, password)}>Login</Button>
      <Button onPress={() => navigation.navigate("NewUser")}>Não tem conta? Clique aqui</Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 10,
    justifyContent: "center",
  },
});

export default Login;
