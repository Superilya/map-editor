import { StrictEffect, fork, select } from 'redux-saga/effects';
import { QueryType, ParamsType } from 'src/types/routing';

import { selectSelfUser } from 'src/ducks/users/selectors';
import { selectBuildings } from 'src/ducks/buildings/selectors';

import { getSelfWorker } from 'src/sagas/workers/get-self';
import { getBuildingsWorker } from 'src/sagas/workers/get-buildings';

export const initLayout = function* (query: QueryType, params: ParamsType, isFirstRendering: boolean): Generator<StrictEffect, void, any> {
    const selfUser = yield select(selectSelfUser);
    const buildings = yield select(selectBuildings);

    if (!selfUser) { 
        yield fork(getSelfWorker);
    }

    if (!buildings.length) {
        yield fork(getBuildingsWorker);
    }
}