import { combineReducers } from 'redux';
import { entity } from './entity';
import { self } from './self';
import { state } from './state';

export const users = combineReducers({
    entity,
    self,
    state
});
