import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
 
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { removeFavorite } from "../store/redux/Favorites";


export default function () {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.Favorites.Favorites);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDeleteItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    // Burada silme işlemini gerçekleştirirsiniz, örneğin redux veya başka bir yöntemle
    console.log("Silme işlemi yapılacak:", selectedItem);
    setModalVisible(false);
    // Silme işlemi tamamlandıktan sonra state'i güncellemeyi unutmayın
    dispatch(removeFavorite({id:selectedItem.id})); // Burada selectedItem.id'yi removeFavorite action'ına gönderiyoruz
    console.log(selectedItem.id);
  };

  const handleDeleteCancel = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favorites.length > 0 ? (
        favorites.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => handleDeleteItem(item)}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.image }} style={styles.poster} />
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.trashContainer}>
              <AntDesign name="delete" size={24} color="black" />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Herhangi Bir İçerik Bulunamadı.</Text>
        </View>
      )}

      {/* Silme işlemi için modal */}
      <Modal isVisible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Silmek istediğinizden emin misiniz?
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleDeleteCancel}
            >
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={handleDeleteConfirm}
            >
              <Text style={styles.buttonText}>Sil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 0,
  },
  item: {
    padding: 10,
    borderRadius: 8,
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    width: "60%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  trashContainer: {
    width: "40%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  poster: {
    width: "30%",
    height: "70%",
    backgroundColor: "red",
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#909090",
  },
  emptyContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
