import React, { useContext } from "react";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UsersStack } from "../../types/navigation";
import { StudentContext } from "../../Context/StudentContext";

const List = ({ navigation }: NativeStackScreenProps<UsersStack>) => {
  const { users, isLoading, fetch } = useContext(StudentContext);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <FlatList
      refreshing={isLoading}
      onRefresh={fetch}
      data={users}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { id: item.id })}
        >
          <Text>
            {item.firstName} {item.lastName}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default List;
