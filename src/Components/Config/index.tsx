import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { StyleSheet, Alert } from "react-native";

const Config = () => {
  const { user, updateProfile, logout } = useContext(AuthContext);

  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    username: user?.username ?? "",
    address: user?.address ?? "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.firstName.trim() || !form.username.trim()) {
      Alert.alert("Erro", "Preencha os campos obrigatórios.");
      return;
    }

    updateProfile(form);
    Alert.alert("Sucesso", "Dados atualizados com sucesso!");
  };

  return (
    <Surface style={styles.container}>
      <Surface mode="flat" style={styles.content}>
        <Text variant="titleLarge" style={{ marginBottom: 15 }}>
          Editar Perfil
        </Text>

        <TextInput
          label="Primeiro Nome"
          mode="outlined"
          value={form.firstName}
          onChangeText={(v) => handleChange("firstName", v)}
          style={styles.input}
        />
        <TextInput
          label="Sobrenome"
          mode="outlined"
          value={form.lastName}
          onChangeText={(v) => handleChange("lastName", v)}
          style={styles.input}
        />
        <TextInput
          label="Nome de Usuário"
          mode="outlined"
          value={form.username}
          onChangeText={(v) => handleChange("username", v)}
          style={styles.input}
        />
        <TextInput
          label="Endereço"
          mode="outlined"
          value={form.address}
          onChangeText={(v) => handleChange("address", v)}
          style={styles.input}
        />

        <Button mode="contained" onPress={handleSave} style={{ marginTop: 10 }}>
          Salvar Alterações
        </Button>

        <Button
          mode="outlined"
          onPress={logout}
          style={{ marginTop: 20 }}
          textColor="red"
        >
          Logout
        </Button>
      </Surface>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 10,
  },
});

export default Config;
