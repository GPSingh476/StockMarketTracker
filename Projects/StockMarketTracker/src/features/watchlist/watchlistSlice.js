// src/features/watchlist/watchlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // each item: { symbol, name }
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const { symbol, name } = action.payload;
      const exists = state.items.find((item) => item.symbol === symbol);
      if (!exists) {
        state.items.push({ symbol, name });
      }
    },
    removeFromWatchlist: (state, action) => {
      const symbol = action.payload;
      state.items = state.items.filter((item) => item.symbol !== symbol);
    },
    clearWatchlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice.reducer;
