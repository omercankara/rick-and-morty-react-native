const { configureStore } = require("@reduxjs/toolkit");
import Favorites from "./Favorites";

export const store = configureStore({
    reducer:{
        Favorites:Favorites
    }
});
