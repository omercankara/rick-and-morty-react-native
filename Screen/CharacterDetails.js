import { StyleSheet, View } from "react-native";
import React from "react";
import CharacterPagination from "../Components/CharacterPagination";

export default function CharacterDetails({ route, navigation }) {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <CharacterPagination id={id} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
