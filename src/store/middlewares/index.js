import { all } from 'redux-saga/effects'
import type { Saga } from 'redux-saga'
import homeSaga from 'store/home/sagas'
import middlewareSagas from './sagas'

export default () => {
  function* rootSaga(): Saga {
    yield all([
      ...middlewareSagas,
      ...homeSaga,
    ])
  }
  return rootSaga
}
