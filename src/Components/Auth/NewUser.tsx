import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Surface, TextInput, IconButton, ActivityIndicator } from "react-native-paper";
import * as Location from 'expo-location';

const NewUser = () => {
  const { createAccount } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleUseCurrentLocation = async () => {
    setIsLoadingLocation(true);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setIsLoadingLocation(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced
    });

    const { latitude, longitude } = location.coords;

    const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN;
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/reverse?` +
      `longitude=${longitude}&latitude=${latitude}&` +
      `language=pt&country=BR&access_token=${MAPBOX_TOKEN}`
    );

    const data = await response.json();
    const address = data.features[0]?.properties?.full_address;

    if (address) {
      setAddress(address);
    }

    setIsLoadingLocation(false);
  };

  return (
    <Surface style={styles.container}>
      <TextInput placeholder="e-mail" onChangeText={setEmail} />
      <TextInput placeholder="Primeiro Nome" onChangeText={setFirstName} />
      <TextInput placeholder="Sobrenome" onChangeText={setLastName} />
      <View style={styles.addressContainer}>
        <TextInput
          placeholder="Endereço"
          onChangeText={setAddress}
          value={address}
          style={styles.addressInput}
        />
        <IconButton
          icon="map-marker"
          mode="contained"
          onPress={handleUseCurrentLocation}
          disabled={isLoadingLocation}
          loading={isLoadingLocation}
        />
      </View>
      {isLoadingLocation && <ActivityIndicator animating={true} />}
      <TextInput placeholder="password" secureTextEntry onChangeText={setPassword} />
      <Button onPress={() => createAccount(email, password, firstName, lastName, address)}>Criar conta</Button>
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
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addressInput: {
    flex: 1,
  },
});

export default NewUser;
