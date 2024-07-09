import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api/';


//BÖLÜMLERİ ÇEK
export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/episode`);
    return response.data.results;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

//IDYE GÖRE BÖLÜMLERİ ÇEK
export const fetchEpisodeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/episode/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};

//ID GÖRE KARAKTRLERİ ÇEK
export const fetchCharacterById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};

//FİLMİN KARAKTERLERİNİ ÇEK
export const fetchCharactersByUrls = async (characterUrls) => {
  try {
    const characterRequests = characterUrls.map(url => axios.get(url));
    const responses = await Promise.all(characterRequests);
    return responses.map(res => res.data);
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
};