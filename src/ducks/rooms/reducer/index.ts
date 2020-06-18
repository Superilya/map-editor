import { combineReducers } from 'redux'
import { entity } from './entity'
import { list } from './list'
import { state } from './state'
import { areas } from './areas'

export const rooms = combineReducers({
  entity,
  state,
  areas,
  list,
})
