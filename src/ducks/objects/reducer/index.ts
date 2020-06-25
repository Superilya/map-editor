import { combineReducers } from 'redux';
import { entity } from './entity';
import { list } from './list';
import { areas } from './areas';

export const objects = combineReducers({
    entity,
    areas,
    list,
});
