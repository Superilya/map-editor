import qs from 'qs'
import { getConfig } from 'src/routing/config'
import { call } from 'redux-saga/effects'
import { LocationChangeAction } from 'connected-react-router'
import { matchPath } from 'react-router'
import { QueryType } from 'src/types/routing'

export function* getLocationChange(action: LocationChangeAction) {
  const config = getConfig()
  let isFound = false
  let i = 0

  while (i < config.length && !isFound) {
    const route = config[i]
    const match = matchPath(action.payload.location.pathname, route)

    if (match && match.isExact) {
      if (Array.isArray(route.init)) {
        for (let j = 0; j < route.init.length; j += 1) {
          yield call(
            route.init[j],
            qs.parse(action.payload.location.search, {
              ignoreQueryPrefix: true,
            }) as QueryType,
            match.params,
            action.payload.isFirstRendering
          )
        }
      }

      isFound = true
    }
    i += 1
  }
}
