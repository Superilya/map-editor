import { combineReducers } from 'redux';
import { entity } from './entity';
import { places } from './places';
import { objects } from './objects';

export const areas = combineReducers({
    objects,
    entity,
    places,
});
