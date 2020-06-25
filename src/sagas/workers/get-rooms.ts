import { call, put } from 'redux-saga/effects';

import { Map } from 'src/constants/urls';
import { request } from 'src/sagas/request';
import { Response, RoomsResponse, Building } from 'src/types/api';
import {
    getRooms,
    getRoomsSuccess,
    getRoomsFailed,
} from 'src/ducks/rooms/actions';

type WorkerParams = {
    floor: Building['floors'][0];
    buildingId: Building['id'];
};

export function* getRoomsWorker({ floor, buildingId }: WorkerParams) {
    try {
        yield put(getRooms());

        const { rooms }: Response<RoomsResponse> = yield call(request, 'get', {
            url: Map.ROOMS,
            data: { floor, building: buildingId },
        });

        yield put(getRoomsSuccess(rooms));

        return rooms;
    } catch (error) {
        yield put(getRoomsFailed());

        return null;
    }
}
