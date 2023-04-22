import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import foodReducer from './food/foodReducer';
import orderReducer from './order/orderReducer';
import userReducer from './user/userReducer';
import goodReducer from './goods/goodReducer';

const rootReducer = combineReducers({
    foodReducer,
    orderReducer,
    userReducer,
    goodReducer
});


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["userReducer"],

};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
})

export const persistor = persistStore(store);
