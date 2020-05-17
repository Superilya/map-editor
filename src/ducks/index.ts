import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { users } from './users/reducer';
import { buildings } from './buildings/reducer';
import { rooms } from './rooms/reducer';
import { buildingPage } from './building-page/reducer';
import { places } from './places/reducer';

export const getReducers = (history: History) => combineReducers({
    router: connectRouter(history),
    buildingPage,
    buildings,
    places,
    rooms,
    users
});

export type RootStoreType = ReturnType<ReturnType<typeof getReducers>>
