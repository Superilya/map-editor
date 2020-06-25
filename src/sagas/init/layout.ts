import { fork, select } from 'redux-saga/effects';

import { selectSelfUser } from 'src/ducks/users/selectors';
import { selectBuildings } from 'src/ducks/buildings/selectors';

import { getSelfWorker } from 'src/sagas/workers/get-self';
import { getBuildingsWorker } from 'src/sagas/workers/get-buildings';

export function* initLayout() {
    const selfUser = yield select(selectSelfUser);
    const buildings = yield select(selectBuildings);

    if (!selfUser) {
        yield fork(getSelfWorker);
    }

    if (!buildings.length) {
        yield fork(getBuildingsWorker);
    }
}
