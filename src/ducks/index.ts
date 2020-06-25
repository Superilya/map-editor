import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { users } from './users/reducer';
import { buildings } from './buildings/reducer';
import { rooms } from './rooms/reducer';
import { places } from './places/reducer';
import { roomEditing } from './room-editing/reducer';
import { areas } from './areas/reducer';
import { search } from './search/reducer';
import { objects } from './objects/reducer';
import { placesEditing } from './places-editing/reducer';
import { objectsEditing } from './objects-editing/reducer';

export const getReducers = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        objectsEditing,
        placesEditing,
        roomEditing,
        buildings,
        objects,
        places,
        search,
        areas,
        rooms,
        users,
    });

export type RootStoreType = ReturnType<ReturnType<typeof getReducers>>;
