import { Alert } from "react-native";

const showAlert = (title, message) => {
  Alert.alert(title, message);
};

export default showAlert;
