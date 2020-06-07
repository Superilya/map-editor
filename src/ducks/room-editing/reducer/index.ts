import { combineReducers } from 'redux';
import { targetRoom } from './target-room';
import { updatedPlaces } from './updated-places';
import { state } from './state';

export const roomEditing = combineReducers({
    state,
    targetRoom,
    updatedPlaces
});