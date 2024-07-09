import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { useDispatch,useSelector } from "react-redux";
import { addFavorite } from "../store/redux/Favorites";
import showAlert from "../Alert/Alert";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fetchCharacterById, fetchCharactersByUrls } from "../Services/Api";
const image = require("../assets/movie.jpg");


export default function CharacterPagination({ id,navigation }) {
  const dispatch = useDispatch();
  const [character, setCharacter] = useState(null); // bölüm bilgisini tutan state
  const [currentPage, setCurrentPage] = useState(1); //pagination yapısı
  const [characterMovieData, setCharacterMovie] = useState([]); // Karakter apilerimi tutacak state
  const [searchQuery, setSearchQuery] = useState(""); // Arama sorgusu için state

  const favoritesCharacter = useSelector((state) => state.Favorites.Favorites);


  //Karakter api bağlantılarını ve karakteri döndürdüğüm yapı
  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterData = await fetchCharacterById(id);
        setCharacter(characterData);
        const episodeData = await fetchCharactersByUrls(characterData.episode);
        setCharacterMovie(episodeData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [id]);


  const addToFavorites = () => {
    if (favoritesCharacter.length >= 10) {
      // Eğer favorilerin sayısı 10'dan fazlaysa uyarı göster
      showAlert(
        "Uyarı", "Favorilere daha fazla karakter ekleyemezsiniz, maksimum 10 karaktere kadar ekleme yapabilirsiniz.");
    } else {
      dispatch(addFavorite(character)); // Favorilere ekleme işlemi
      showAlert(
        "Başarılı", "Favorilere Eklendi"
      );
    }
  };

   // film detay sayfasına yönlendirme işlemi
  const handleCharacterPress = (movieId) => {
   
    navigation.navigate("Episode", { id: movieId });
  };

  const handlePageChange = (pageNumber) => {
    //pagination fonksiyonu
    setCurrentPage(pageNumber);
  };


 //Arama inputu fonskiyonu
  const searchCharacterByName = () => {
    const query = searchQuery.toLowerCase();
    const filteredCharacters = characterMovieData.filter((characterMovie) =>
      characterMovie.name.toLowerCase().includes(query)
    );
    return filteredCharacters;
  };

  if (!character) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Karakterlerin sayfalanması için gerekli hesaplama
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  //Kelimeye göre filtreleme 
  const filteredCharacters = searchQuery
    ? searchCharacterByName()
    : characterMovieData;
  const currentCharacters = filteredCharacters.slice(startIndex, endIndex);

  return (
    <View style={styles.container}>
     
      <View style={styles.item}>
        <Image source={{ uri: character.image }} style={styles.headerİmage} />
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.species}>{character.species}</Text>
        <Text style={styles.gender}>{character.gender}</Text>

        <View style={styles.favoritesBtn}>
          <TouchableOpacity onPress={addToFavorites}>
            <AntDesign name="hearto" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Bölüm Bul..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Karakter yoksa  Veya Karakterler varsa yapılacak işlemler */}
      {currentCharacters.length === 0 ? (
        <View style={styles.container}>
          <Text>Karakter Bulunamadı.</Text>
        </View>
      ) : (
        <View style={styles.rootContainer}>
          {currentCharacters.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.characterler}
              onPress={() => handleCharacterPress(item.id)}
            >
              <View style={styles.characterContainer}>
                <Text style={styles.characterTitle}>{item.name}</Text>
                <Image source={image} style={styles.characterImage} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Sayfalama Butonları */}
      {characterMovieData.length > itemsPerPage && (
        <View style={styles.paginationContainer}>
          {Array.from(
            { length: Math.ceil(characterMovieData.length / itemsPerPage) },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <TouchableOpacity
              key={pageNumber}
              style={[
                styles.paginationButton,
                pageNumber === currentPage && styles.activePaginationButton,
              ]}
              onPress={() => handlePageChange(pageNumber)}
              disabled={pageNumber === currentPage}
            >
              <Text style={styles.paginationButtonText}>
                {pageNumber.toString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 750,
    width:'100%',
    justifyContent: "space-around",
    alignItems: "center",
  },

  searchContainer: {
    width: "95%",
    height: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 20,
  },

  input: {
    height: "100%",
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    width: "50%",
    padding: 10,
  },

  characterContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  characterImage: {
    width: "75%",
    height: 90,
    borderRadius: 80,
    textAlign: "center",
  },

  item: {
    width: "50%",
    height: "32%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "flex-end",
   
    position: "relative",
   
  },
  favoritesBtn: {
    
    left:0,
  
  },

  headerİmage: {
    width: 100,
    borderRadius: 15,
    height: 100,
  },

  rootContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
    height: "45%",
  },

  itemContainer: {
    display: "flex",
    height: "70%",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  characterler: {
    width: "30%",
    height: "45%",
    marginBottom: 5,
    backgroundColor: "brown",
    borderRadius: 5,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#909090",
  },
  airDate: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#999999",
  },
  episode: {
    fontSize: 12,
    color: "#999999",
  },

  characterTitle: {
    textAlign: "center",
    marginVertical: 10,
    color: "white",
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: 100,
  },
  paginationButton: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginHorizontal: 7,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  activePaginationButton: {
    backgroundColor: "blue",
  },
  paginationButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
