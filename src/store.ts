import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import { getReducers } from 'src/ducks'
import { sagas } from 'src/sagas'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any // eslint-disable-line
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = (contextRoot: string) => {
  const history = createBrowserHistory({ basename: contextRoot })
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    getReducers(history),
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  )

  sagaMiddleware.run(sagas)

  return { store, history }
}
