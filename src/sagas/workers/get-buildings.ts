import { call, put } from 'redux-saga/effects';

import { Map } from 'src/constants/urls';
import { getBuildings, getBuildingsSuccess, getBuildingsFailed } from 'src/ducks/buildings/actions';
import { request } from 'src/sagas/request';
import { Response, BuildingResponse } from 'src/types/api';

export const getBuildingsWorker = function* () {
    try {
        yield put(getBuildings());

        const { buildings }: Response<BuildingResponse> = yield call(request, 'get', { url: Map.BUILDINGS });

        yield put(getBuildingsSuccess(buildings));

        return buildings;
    } catch (error) {
        console.log(error);
        yield put(getBuildingsFailed());
    }
}