import { combineReducers } from 'redux';
import { updated } from './updated';
import { deleted } from './deleted';
import { created } from './created';

export const placesEditing = combineReducers({
    updated,
    deleted,
    created,
});
