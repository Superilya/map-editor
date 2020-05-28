import { match, compile } from 'path-to-regexp'
import {
  BuildingPageParams,
  ParamsType,
  QueryType,
  BuildingPageQuery,
} from 'src/types/routing'
import qs from 'qs'

const assemblePath = <Q extends QueryType = {}>(url: string, query?: Q) => {
  const targetQuery = qs.stringify(query)

  if (!targetQuery) {
    return url
  }

  return `${url}?${targetQuery}`
}

export type InternalLink<
  P extends ParamsType = {},
  Q extends QueryType = {}
> = {
  source: string
  get: (params?: P, query?: Q) => string
  is: (target: string) => boolean
}

const MAIN = '/'

export const rootLink: InternalLink = {
  source: MAIN,
  get: () => MAIN,
  is: (target) => target === MAIN,
}

const AUTH_SUCCESS = '/auth-succcess'

export const authSuccess: InternalLink = {
  source: AUTH_SUCCESS,
  get: () => AUTH_SUCCESS,
  is: (target) => target === AUTH_SUCCESS,
}

const BUILDING = '/building/:buildingId/:floor?'
const buildingCompile = compile(BUILDING)
const buildingMatch = match(BUILDING)

export const buildingLink: InternalLink<
  BuildingPageParams,
  BuildingPageQuery
> = {
  source: BUILDING,
  get: (params, query) => assemblePath(buildingCompile(params), query),
  is: (target) => Boolean(buildingMatch(target)),
}
