import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Student } from "../../types/users";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UsersStack } from "../../types/navigation";
import { StudentContext } from "../../Context/StudentContext";
import { Surface, TextInput } from "react-native-paper";
import Confirm from "./Confirm";

const Form = ({ navigation }: NativeStackScreenProps<UsersStack>) => {
  const { fetch, save } = useContext(StudentContext);
  const [student, setStudent] = useState<Student>();

  const handleChangeText = (field: keyof Student) => {
    return (value: string) => {
      setStudent((previous) => ({ ...previous!, [field]: value }));
    };
  };

  const doSave = async () => {
    await save(student!);
    navigation.pop();
    fetch();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Confirm save={doSave} />,
    });
  }, [navigation, student]);

  return (
    <ScrollView>
      <Surface style={{ gap: 10 }}>
        <TextInput
          placeholder="Nome"
          onChangeText={handleChangeText("firstName")}
        />
        <TextInput
          placeholder="Sobrenome"
          onChangeText={handleChangeText("lastName")}
        />
        <TextInput
          placeholder="Email"
          onChangeText={handleChangeText("email")}
        />
      </Surface>
    </ScrollView>
  );
};

export default Form;
