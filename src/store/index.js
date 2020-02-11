import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux'
import Reactotron from 'reactotron-react-native'
import storage from '@react-native-community/async-storage'
import createSaga from './middlewares'
import authReducer from './auth/reducer'
import * as authAction from './auth/actions'
import homeReducer from './home/reducer'
import * as homeAction from './home/actions'
import * as reportAction from './report/actions'
import reportReducer from './report/reducer'

import 'config/ReactotronConfig'


const config = {
  key: 'root',
  storage,
  blacklist: [
    'authStore', 'homeStore', 'reportStore',
  ],
}

const authConfig = {
  key: 'authStore',
  storage,
  whitelist: ['signUp', 'signIn'],
  blacklist: ['isLoading'],
}

const createReducers = () => persistCombineReducers(config, {
  authStore: persistReducer(authConfig, authReducer),
  homeStore: homeReducer,
  reportStore: reportReducer,
})

const createMiddlewares = (sagaMiddleware) => {
  const middlewares = []

  // Saga Middleware
  if (sagaMiddleware) {
    middlewares.push(sagaMiddleware)
  }
  return applyMiddleware.apply({}, middlewares)
}
let store
const buildStore = (reducers, initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  if (__DEV__) {
    // eslint-disable-line
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      store = createStore(
        reducers,
        {},
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
          compose(
            applyMiddleware(sagaMiddleware),
            Reactotron.createEnhancer(),
          ),
        ),
      )
    } else {
      store = createStore(
        createReducers(reducers),
        {},
        compose(
          applyMiddleware(sagaMiddleware),
          Reactotron.createEnhancer(),
        ),
      )
    }
  } else {
    store = createStore(createReducers(reducers), initialState, compose(createMiddlewares(sagaMiddleware)))
  }

  const persistor = persistStore(store)
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(createReducers(reducers))
    })
  }
  store.reducers = createReducers(reducers)
  sagaMiddleware.run(createSaga())
  return { persistor, store }
}

export default buildStore()
export const actions = {
  ...authAction,
  ...homeAction,
  ...reportAction,
}
export const stores = store
export { default as effects } from './middlewares/effects'
