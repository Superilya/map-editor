import { combineReducers } from 'redux'
import { entity } from './entity'
import { places } from './places'

export const areas = combineReducers({
  entity,
  places,
})
