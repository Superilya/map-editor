import { RouteProps } from 'react-router'
import { SearchPage } from 'src/components/search-page'
import { BuildingPage } from 'src/components/building-page'

import { initLayout } from 'src/sagas/init/layout'
import { initAuthSuccess } from 'src/sagas/init/auth-success'
import { initBuilding } from 'src/sagas/init/building'

import { StrictEffect } from 'redux-saga/effects'
import { ParamsType, QueryType } from 'src/types/routing'
import { rootLink, authSuccess, buildingLink } from './links'

export type TRoute = RouteProps & {
  key: string
  init?: Array<
    (
      query: QueryType,
      params: ParamsType,
      isFirstRendering: boolean
    ) => Generator<StrictEffect, void, any>
  >
}

export const getConfig = (): Array<TRoute> => {
  const config: TRoute[] = [
    {
      path: rootLink.source,
      key: 'root',
      exact: true,
      component: SearchPage,
      init: [initLayout],
    },
    {
      path: buildingLink.source,
      key: 'building',
      exact: true,
      component: BuildingPage,
      init: [initLayout, initBuilding],
    },
    {
      path: authSuccess.source,
      key: 'auth-success',
      exact: true,
      component: () => null,
      init: [initAuthSuccess],
    },
  ]

  return config
}
