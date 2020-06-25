import { combineReducers } from 'redux';
import { targetRoom } from './target-room';
import { state } from './state';
import { selectedEdit } from './selected-edit';

export const roomEditing = combineReducers({
    state,
    targetRoom,
    selectedEdit,
});
