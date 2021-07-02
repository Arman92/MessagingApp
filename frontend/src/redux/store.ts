import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './sagas';
import { authReducer, conversationReducer } from './slices';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// declare middleware in this array
const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: {
    auth: authReducer,
    conversation: conversationReducer,
  },
  middleware: [
    ...middlewares,
    ...getDefaultMiddleware({
      serializableCheck: true,
    }),
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

// then run the saga
sagaMiddleware.run(rootSaga);

export default store;
