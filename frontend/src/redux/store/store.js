// store.js
import { createStore } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';//new
import storage from 'redux-persist/lib/storage';//new

const initialState = {
  user: {
    name: '',
    role: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          name: action.payload.name,
          role: action.payload.role,
        },
      };
    default:
      return state;
  }
};

const persistConfig = {//new
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer); //new

const store = createStore(persistedReducer);
const persistor = persistStore(store);//new

export { store, persistor };

