import { all } from 'redux-saga/effects';

import { authSaga } from './slices';

const generators = [authSaga()];

export function* rootSaga(): Generator<unknown, void, unknown> {
  yield all(generators);
}
