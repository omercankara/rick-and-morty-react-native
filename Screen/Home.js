import React from "react";
import { View, StyleSheet } from "react-native";
import MoviePagination from "../Components/MoviePagination"; // doğru yolu belirttiğinizden emin olun
import { NavigationContainer } from "@react-navigation/native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MoviePagination navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    
    
  },
});

export default Home;
