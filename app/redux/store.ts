import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Reducer
import userReducer from './reducer/userReducer';
//API
import { userAPI } from './api/userAPI';
import { dropdownAPI } from './api/dropdownAPI';

// persist config for user slice
const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: [
    'authToken',
    'rfrs',
    'Email',
    'FirstName',
    'LastName',
    'Role',
    'exp',
    'IsKycVerified',
    'IsApproved',
    'IsKycCreated',
    'IsRejected',
    'AgreementDocument',
    'RejectedReason',
    'IdentityUserId',
    'isLoggedIn',
  ],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [dropdownAPI.reducerPath]: dropdownAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(userAPI.middleware, dropdownAPI.middleware),
});

export const resetApiState = (dispatch: AppDispatch) => {
  dispatch(userAPI.util.resetApiState());
  dispatch(dropdownAPI.util.resetApiState());
};

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
