
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // each item: { symbol, name, quantity, latestPrice }
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addToPortfolio: (state, action) => {
      const { symbol, name, latestPrice } = action.payload;
      const existing = state.items.find((item) => item.symbol === symbol);

      if (existing) {
        // if already there, just increase quantity by 1
        existing.quantity += 1;
        existing.latestPrice = latestPrice; // update to newest price
      } else {
        state.items.push({
          symbol,
          name,
          quantity: 1,
          latestPrice,
        });
      }
    },
    removeFromPortfolio: (state, action) => {
      const symbol = action.payload;
      state.items = state.items.filter((item) => item.symbol !== symbol);
    },
    updateQuantity: (state, action) => {
      const { symbol, quantity } = action.payload;
      const existing = state.items.find((item) => item.symbol === symbol);
      if (existing && quantity > 0) {
        existing.quantity = quantity;
      }
    },
    clearPortfolio: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToPortfolio,
  removeFromPortfolio,
  updateQuantity,
  clearPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
