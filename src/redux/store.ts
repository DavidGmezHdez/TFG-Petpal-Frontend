import {persistStore, persistReducer} from 'redux-persist';
import reducer from './reducer';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['user'],
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducer>;
