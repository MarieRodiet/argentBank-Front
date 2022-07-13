import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from './loginSlice.js';
import { userSlice } from './userSlice.js'
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const persistedLoginReducer = persistReducer(persistConfig, loginSlice.reducer);
const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

/*the redux persisted state in storage
overrides the initial state whenever it changes*/
export const store = configureStore({
  reducer: {
    login: persistedLoginReducer,
    user: persistedUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: false
  })
});


export const persistor = persistStore(store)



