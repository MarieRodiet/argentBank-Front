import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from './loginSlice.js';
import { userSlice } from './userSlice.js'
// import { persistReducer, persistStore } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    user: userSlice.reducer
  }
})

// persist config obj
// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage: AsyncStorage,
// };

// const persistedLoginReducer = persistReducer(persistConfig, loginSlice.reducer);
// const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);
// const store = configureStore({
//   reducer: {
//     login: persistedLoginReducer,
//     user: persistedUserReducer
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
//     serializableCheck: false
//   })
// });

// export const persistor = persistStore(store)
// export default store;


