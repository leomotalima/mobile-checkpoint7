import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Surface, Text, TextInput, IconButton, ActivityIndicator } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import * as Location from 'expo-location';





const Config = () => {
  const { user, logout, editAccount } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleEdit = () => {
    setEditedFirstName(user?.firstName || '');
    setEditedLastName(user?.lastName || '');
    setEditedAddress(user?.address || '');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    await editAccount(editedFirstName, editedLastName, editedAddress);
    setIsEditing(false);
  };

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
      setEditedAddress(address);
    }

    setIsLoadingLocation(false);
  };

  return (
    <Surface style={styles.container}>
      {!isEditing ? (
        <Surface mode="flat" style={styles.content}>
          <Text>Primeiro Nome</Text>
          <Text>{user?.firstName}</Text>
          <Text>Sobrenome</Text>
          <Text>{user?.lastName}</Text>
          <Text>Email</Text>
          <Text>{user?.email}</Text>
          <Text>Endereço</Text>
          <Text>{user?.address}</Text>
          <Button mode="contained" onPress={handleEdit} style={styles.button}>Editar</Button>
        </Surface>
      ) : (
        <Surface mode="flat" style={styles.content}>
          <Text>Primeiro Nome</Text>
          <TextInput
            value={editedFirstName}
            onChangeText={setEditedFirstName}
          />
          <Text>Sobrenome</Text>
          <TextInput
            value={editedLastName}
            onChangeText={setEditedLastName}
          />
          <Text>Email</Text>
          <Text>{user?.email}</Text>
          <Text>Endereço</Text>
          <View style={styles.addressContainer}>
            <TextInput
              value={editedAddress}
              onChangeText={setEditedAddress}
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
          <Button mode="contained" onPress={handleSave} style={styles.button}>Salvar</Button>
          <Button mode="outlined" onPress={handleCancel} style={styles.button}>Cancelar</Button>
        </Surface>
      )}
      <Button onPress={logout}>Logout</Button>
    </Surface>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
  },
  button: {
    marginTop: 10,
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

export default Config;
