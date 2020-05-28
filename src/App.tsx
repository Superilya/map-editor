import React from 'react'
import 'konva'
import { Switch, Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { configureStore } from 'src/store'
import { CONTEXT_ROOT } from 'src/constants/context'
import { GlobalStyle } from 'src/styles'
import { getConfig } from './routing/config'

const { store, history } = configureStore(CONTEXT_ROOT)

export const App = () => {
  const config = getConfig()

  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            {config.map((route) => (
              <Route {...route} />
            ))}
            <Route render={() => <div>хз</div>} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </>
  )
}
