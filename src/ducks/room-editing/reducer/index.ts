import { combineReducers } from 'redux'
import { targetRoom } from './target-room'
import { updatedPlaces } from './updated-places'
import { state } from './state'
import { deletedPlaces } from './deleted-places'
import { selectedEdit } from './selected-edit'
import { created } from './created'

export const roomEditing = combineReducers({
  state,
  targetRoom,
  updatedPlaces,
  selectedEdit,
  deletedPlaces,
  created,
})