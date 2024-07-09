import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";



const image = require("../assets/img.jpg");
import {fetchMovies } from "../Services/Api";
const MoviePagination = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");


  //Apiden verileri çekiyorum
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData =  await fetchMovies();
        setEpisodes(movieData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Toplam pagination sayısı
  const totalPages = Math.ceil(episodes.length / 6);

  // Arama fonksiyonu
  const searchEpisodes = (query) => {
    if (query.trim() === "") {
      return episodes;
    } else {
      return episodes.filter((episode) =>
        episode.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const renderEpisodes = () => {
    // Arama sonucuna göre episodları filtrele
    const filteredEpisodes = searchEpisodes(searchQuery); //arama filter fonksiyonum

    // sayfa başına gösterilecek data yapısı 
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    const currentEpisodes = filteredEpisodes.slice(startIndex, endIndex);

    //eğer herhangi bir data yok ise gösterilecek
    if (currentEpisodes.length === 0) {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.noDataText}>Kayıt Bulunamadı</Text>
        </View>
      );
    }

    //Data var ise getir
    return (
      <View style={styles.itemContainer}>
        {currentEpisodes.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleMoviePress(item.id)}
            style={styles.item}
          >
            <Image source={image} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemEpisode}>{item.episode}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  //Yönlendirme 
  const handleMoviePress = (episodeId) => {
    navigation.navigate("Episode", { id: episodeId });
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    setCurrentPage(1); // Arama yapıldığında sayfa numarasını sıfırla
  };

  return (
    <View style={styles.container}>
      {/* Arama çubuğu */}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Bölüm Ara..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {renderEpisodes()}

     

      <View style={styles.paginationContainer}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <TouchableOpacity
              key={pageNumber}
              onPress={() => handlePageChange(pageNumber)}
              style={[
                styles.pageButton,
                pageNumber === currentPage && styles.activePageButton,
              ]}
            >
              <Text style={styles.pageButtonText}>{pageNumber}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
    height: 650,
    width: "100%",
  },
  inputContainer:{
    width:'80%',
    justifyContent: 'flex-end',
    alignItems:"flex-end"
  },
  searchInput: {
    width: "50%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Yatayda sıralanan öğelerin alt alta geçişini sağlar
    justifyContent: "center",
    marginTop: 20,
    height: "85%",
  },
  item: {
    width: 150,
    height: "30%",
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "brown",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color:"white"
  },
  itemEpisode: {
    fontSize: 14,
    textAlign: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
  },

  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  activePageButton: {
    backgroundColor: "#0056b3",
  },
  pageButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MoviePagination;
