import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import client from "../../api";
import { useEffect, useState } from "react";
import { UsersStack } from "../../types/navigation";
import { Student } from "../../types/students";

const Details = ({ route }: NativeStackScreenProps<UsersStack, "Details">) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<Student>();
  const { id } = route.params;

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await client.get<Student>(`/students/${id}`);
      setUser(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: `https://api.dicebear.com/9.x/personas/png?seed=${user?.firstName}`,
        }}
      />
      <Text style={styles.title}>Primeiro nome</Text>
      <Text>{user?.firstName}</Text>
      <Text style={styles.title}>Último nome</Text>
      <Text>{user?.lastName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 128,
    borderWidth: 1,
    borderColor: "#c9c9c9",
  },
});

export default Details;
