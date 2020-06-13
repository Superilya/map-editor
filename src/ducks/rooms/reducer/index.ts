import { combineReducers } from 'redux'
import { entity } from './entity'
import { list } from './list'
import { state } from './state'

export const rooms = combineReducers({
  entity,
  state,
  list,
})
