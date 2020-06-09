import { combineReducers } from 'redux';
import { targetRoom } from './target-room';
import { updatedPlaces } from './updated-places';
import { state } from './state';
import { deletedPlaces } from './deleted-places';

export const roomEditing = combineReducers({
    state,
    targetRoom,
    updatedPlaces,
    deletedPlaces
});