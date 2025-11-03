import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

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

  const handleGetCurrentAddress = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Ative o acesso à localização.");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.EXPO_PUBLIC_MAPBOX_KEY}`
      );
      const data = await response.json();
      const place = data.features?.[0]?.place_name;
      if (place) setForm((prev) => ({ ...prev, address: place }));
      else Alert.alert("Erro", "Não foi possível identificar o endereço.");
    } catch (error) {
      Alert.alert("Erro", "Falha ao obter localização.");
    }
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
          label="Último nome"
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
        <Button
          mode="outlined"
          onPress={handleGetCurrentAddress}
          style={{ marginTop: 5 }}
        >
          Usar localização atual
        </Button>
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
