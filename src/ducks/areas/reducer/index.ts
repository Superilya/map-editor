import { combineReducers } from 'redux';
import { entity } from './entity';
import { places } from './places';
import { objects } from './objects';
import { editedBorders } from './edited-borders';
import { selectedBorder } from './selected-border';

export const areas = combineReducers({
    editedBorders,
    selectedBorder,
    objects,
    entity,
    places,
});
