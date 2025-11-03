import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Surface, TextInput } from "react-native-paper";

const NewUser = () => {
  const { createAccount } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Surface style={styles.container}>
      <TextInput placeholder="e-mail" onChangeText={setEmail} />
      <TextInput placeholder="password" onChangeText={setPassword} />
      <Button onPress={() => createAccount(email, password)}>Criar conta</Button>
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

export default NewUser;
