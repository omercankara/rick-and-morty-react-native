import { createSlice } from "@reduxjs/toolkit";

const FavoritesSlice = createSlice({
  name: 'FavoriteCharacters',
  initialState: {
    Favorites: []
  },
  reducers: {
    addFavorite: (state, action) => {
      // Eleman id al
      const newFavoriteId = action.payload.id;
      // state içinde ilgili kayıt varmı ?
      const existingFavorite = state.Favorites.find(item => item.id === newFavoriteId);
      // false dönerse eke 
      if (!existingFavorite) {
        state.Favorites.push(action.payload);
      }
  
    },
    removeFavorite: (state, action) => {
      state.Favorites = state.Favorites.filter(item => item.id !== action.payload.id);
    }
  }
});

export const { addFavorite, removeFavorite } = FavoritesSlice.actions;
export default FavoritesSlice.reducer;
