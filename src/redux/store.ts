import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import reducer from './reducer';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);
