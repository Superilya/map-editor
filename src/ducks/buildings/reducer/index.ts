import { combineReducers } from 'redux'
import { entity } from './entity'
import { list } from './list'
import { state } from './state'

export const buildings = combineReducers({
  entity,
  state,
  list,
})
