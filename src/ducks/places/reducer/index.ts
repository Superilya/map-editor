import { combineReducers } from 'redux';
import { entity } from './entity';
import { list } from './list';
import { areas } from './areas';

export const places = combineReducers({
    entity,
    areas,
    list,
});
