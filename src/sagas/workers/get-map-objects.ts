import { call, put } from 'redux-saga/effects';
import { Map } from 'src/constants/urls';
import { request } from 'src/sagas/request';
import { Response, AreaResponse } from 'src/types/api';
import { ObjectTypes } from 'src/constants/objects';
import { getObjectsAreasSuccess } from 'src/ducks/areas/actions';

export function* getMapObjectsWorker() {
    try {
        const { areas }: Response<AreaResponse> = yield call(request, 'get', {
            url: Map.AREAS,
            data: { objectType: [ObjectTypes.PLACE, ObjectTypes.OBJECT] },
        });

        yield put(getObjectsAreasSuccess(areas));
    } catch (e) {
        console.log(e);
    }
}
