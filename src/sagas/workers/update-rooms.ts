import { call, put, select } from 'redux-saga/effects';
import { updateRooms, setFloor } from 'src/ducks/building-page/actions';
import { selectRooms } from 'src/ducks/rooms/selectors';
import { getRoomsWorker } from './get-rooms';
import { getPlacesWorker } from './get-places';

import { Room } from 'src/types/api';

export const updateRoomsWorker = function* ({ floor, buildingId }: ReturnType<typeof updateRooms>) {
    yield put(setFloor(floor));
    yield call(getRoomsWorker, { floor, buildingId });

    const rooms: Array<Room> = yield select(selectRooms);

    for (let i = 0; i < rooms.length; i++) {
        yield call(getPlacesWorker, { roomId: rooms[i].id });
    }
};
