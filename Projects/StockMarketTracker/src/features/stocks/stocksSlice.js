import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchResults, setLoading, setError } = stocksSlice.actions;
export default stocksSlice.reducer;
