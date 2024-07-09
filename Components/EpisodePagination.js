import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,

  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const image = require("../assets/episode.jpg");
import {fetchEpisodeById } from "../Services/Api";
const EpisodePagination = ({ id }) => {
  const navigation = useNavigation();

  const [episode, setEpisode] = useState(null); // bölüm bilgisini tutan state
  const [currentPage, setCurrentPage] = useState(1); //pagination yapısı
  const [characterData, setCharacterData] = useState([]); // Karakter apilerimi tutacak state
  const [searchQuery, setSearchQuery] = useState(""); // Arama sorgusu için state

  //Karakter api bağlantılarını ve karakteri  döndürdüğüm yapı
  useEffect(() => {
    const fetchData = async () => {
      try {

        const characterData = await fetchEpisodeById(id);

      

        setEpisode(characterData)
        const characters = characterData.characters.map(
          (
            url //character içindeki api linklerine tek seferde istek at dönen datayı characterDataya bas
          ) => axios.get(url)
        );
        const charactersData = await Promise.all(characters);
        setCharacterData(charactersData.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  const handleCharacterPress = (characterId) => {
    // Karakter detay sayfasına yönlendirme işlemi burada yapılabilir
    navigation.navigate("characterDetails", { id: characterId });
  };

  const handlePageChange = (pageNumber) => {
    //pagination fonksiyonu
    setCurrentPage(pageNumber);
  };

  const searchCharacterByName = () => {
    //Arama inputu fonskiyonu
    const query = searchQuery.toLowerCase();
    const filteredCharacters = characterData.filter((character) =>
      character.name.toLowerCase().includes(query)
    );
    return filteredCharacters;
  };

  if (!episode) {
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

  //SearchQuery içinde parametre varsa filtreleme methodumu çalıştır yoksa characterDatayı geri dön
  const filteredCharacters = searchQuery
    ? searchCharacterByName()
    : characterData;
  const currentCharacters = filteredCharacters.slice(startIndex, endIndex);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={image} style={styles.headerİmage} />
        <Text style={styles.name}>{episode.name}</Text>
        <Text style={styles.airDate}>{episode.air_date}</Text>
        <Text style={styles.episode}>{episode.episode}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Karakter bul..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Karakter yoksa  Veya Karakterler varsa yapılacak işlemler */}
      {currentCharacters.length === 0 ? (
        <View style={styles.container}>
          <Text>Karakter Bulunamaı</Text>
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
                <Image
                  source={{ uri: item.image }}
                  style={styles.characterImage}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Sayfalama Butonları */}
      {characterData.length > itemsPerPage && (
        <View style={styles.paginationContainer}>
          {Array.from(
            { length: Math.ceil(characterData.length / itemsPerPage) },
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
};

const styles = StyleSheet.create({
  container: {
    height: 750,
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
    padding:10
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
    width: "100%",
    height: "35%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerİmage: {
    width: "100%",
    borderRadius: 15,
    height: "75%",
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
    alignItems:"flex-start",
    justifyContent: "flex-start",
    height:100,
  },
  paginationButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
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

export default EpisodePagination;
