import { call, put } from 'redux-saga/effects';

import { Map } from 'src/constants/urls';
import { request } from 'src/sagas/request';
import { Response, Room, ObjectResponse } from 'src/types/api';
import { getObjectsSuccess, getObjectsFailed } from 'src/ducks/objects/actions';

type WorkerParams = {
    roomId: Room['id'];
};

export function* getObjectsWorker({ roomId }: WorkerParams) {
    try {
        const { objects }: Response<ObjectResponse> = yield call(
            request,
            'get',
            {
                url: Map.OBJECTS,
                data: { room: roomId },
            }
        );

        yield put(getObjectsSuccess(roomId, objects));

        return objects;
    } catch (error) {
        yield put(getObjectsFailed());

        return null;
    }
}
