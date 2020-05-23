import { StrictEffect, call, select, put } from 'redux-saga/effects';
import { QueryType, ParamsType } from 'src/types/routing';

import { getRoomsWorker } from 'src/sagas/workers/get-rooms';
import { getPlacesWorker } from 'src/sagas/workers/get-places';
import { getUsersWorker } from 'src/sagas/workers/get-users';

import { selectTargetBuilding } from 'src/ducks/buildings/selectors';
import { Building, Room, Place, User } from 'src/types/api';
import { buildingLink } from 'src/routing/links';
import { replace } from 'connected-react-router';
import { getDefaultFloor } from 'src/utils/building';

type CacheType = {
    floor: number | null;
    buildingId: number | null;
}

let cacheData: CacheType = {
    floor: null,
    buildingId: null
};

export const initBuilding = function* (query: QueryType, params: ParamsType): Generator<StrictEffect, void, any> {
    const buildingId = Number(params.buildingId);
    const building: Building = yield select(selectTargetBuilding(buildingId));
    const floor = Number(params.floor);

    if (!building || (buildingId === cacheData.buildingId && floor === cacheData.floor)) {
        return;
    }

    if (isNaN(floor)) {
        const defaultFloor = getDefaultFloor(building);

        yield put(replace(buildingLink.get({ buildingId: String(building.id), floor: String(defaultFloor) })));

        return;
    }

    cacheData = {
        buildingId,
        floor
    };

    const rooms: Array<Room> = yield call(getRoomsWorker, { buildingId: building.id, floor: floor });
    const targetUserIds: Array<User['id']> = [];

    for (let i = 0; i < rooms.length; i++) {
        const places: Array<Place> = yield call(getPlacesWorker, { roomId: rooms[i].id });

        const userIds = places
            .map(({ userId }) => userId)
            .filter(Boolean);

        targetUserIds.push(...userIds);
    }

    if (targetUserIds.length) {
        yield call(getUsersWorker, { userIds: targetUserIds });
    }
}