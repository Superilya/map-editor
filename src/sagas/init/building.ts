import { StrictEffect, call, select, put } from 'redux-saga/effects';
import { QueryType, ParamsType } from 'src/types/routing';
import { getRoomsWorker } from 'src/sagas/workers/get-rooms';
import { selectTargetBuilding } from 'src/ducks/buildings/selectors';
import { Building } from 'src/types/api';
import { setFloor } from 'src/ducks/building-page/actions';

export const initBuilding = function* (query: QueryType, params: ParamsType): Generator<StrictEffect, void, any> {
    const buildingId = Number(params.buildingId);
    const building: Building = yield select(selectTargetBuilding(buildingId));

    if (!building) {
        return;
    }

    const floor = building.floors[0];

    yield put(setFloor(floor))
    yield call(getRoomsWorker, { buildingId: building.id, floor });
}