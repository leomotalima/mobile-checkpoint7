import { IconButton } from "react-native-paper";

type ConfirmProps = {
  save: () => void;
};

const Confirm = ({ save }: ConfirmProps) => {
  return <IconButton icon="check" onPress={save} />;
};

export default Confirm;
