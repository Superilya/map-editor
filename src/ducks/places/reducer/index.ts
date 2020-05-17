import { combineReducers } from 'redux';
import { entity } from './entity';
import { list } from './list';

export const places = combineReducers({
    entity,
    list
});
