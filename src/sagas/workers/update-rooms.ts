import { call, put } from 'redux-saga/effects';
import { updateRooms, setFloor } from 'src/ducks/building-page/actions';
import { getRoomsWorker } from './get-rooms';

export const updateRoomsWorker = function* ({ floor, buildingId }: ReturnType<typeof updateRooms>) {
    yield put(setFloor(floor));
    yield call(getRoomsWorker, { floor, buildingId });
};
