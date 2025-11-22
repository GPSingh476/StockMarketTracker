import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "../features/stocks/stocksSlice";
import portfolioReducer from "../features/portfolio/portfolioSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    portfolio: portfolioReducer,
    watchlist: watchlistReducer,
  },
});
