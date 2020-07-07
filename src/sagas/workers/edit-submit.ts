import { select, call, put } from 'redux-saga/effects';
import { selectTargetRoom } from 'src/ducks/room-editing/selectors';
import {
    selectUpdatedPlaces,
    selectDeletedPlaces,
    selectCreatedPlaces,
} from 'src/ducks/places-editing/selectors';
import {
    selectUpdatedObjects,
    selectDeletedObjects,
    selectCreatedObjects,
} from 'src/ducks/objects-editing/selectors';
import { Map } from 'src/constants/urls';
import { request } from 'src/sagas/request';
import { Response, PlaceResponse, ObjectResponse, RoomsResponse } from 'src/types/api';
import {
    editSubmitFailed,
    editSubmitSuccess,
    editSubmit,
} from 'src/ducks/room-editing/actions';
import { RootStoreType } from 'src/ducks';

export function* editSubmitWorker({ fields }: ReturnType<typeof editSubmit>) {
    const updatedPlaces: ReturnType<typeof selectUpdatedPlaces> = yield select(
        selectUpdatedPlaces
    );
    const deletedPlaces: ReturnType<typeof selectDeletedPlaces> = yield select(
        selectDeletedPlaces
    );
    const createdPlaces: ReturnType<typeof selectCreatedPlaces> = yield select(
        selectCreatedPlaces
    );

    const updatedObjects: ReturnType<typeof selectUpdatedObjects> = yield select(
        selectUpdatedObjects
    );
    const deletedObjects: ReturnType<typeof selectDeletedObjects> = yield select(
        selectDeletedObjects
    );
    const createdObjects: ReturnType<typeof selectCreatedObjects> = yield select(
        selectCreatedObjects
    );

    const roomId: ReturnType<typeof selectTargetRoom> = yield select(
        selectTargetRoom
    );

    try {
        if (!roomId) {
            throw new Error();
        }

        const existPlaces = yield select(
            (state: RootStoreType) => state.places.list[roomId] || []
        );

        const existObjects = yield select(
            (state: RootStoreType) => state.objects.list[roomId] || []
        );

        const {
            places,
            objects,
            rooms
        }: Response<Partial<PlaceResponse & ObjectResponse & RoomsResponse>> = yield call(
            request,
            'post',
            {
                url: Map.ROOM_EDIT(roomId),
                data: {
                    fields,
                    places: {
                        update: Object.keys(updatedPlaces)
                            .map(Number)
                            .filter(
                                (placeId) =>
                                    Boolean(placeId) &&
                                    deletedPlaces.indexOf(placeId) === -1 &&
                                    !createdPlaces[placeId]
                            )
                            .map((placeId) => ({
                                id: placeId,
                                ...updatedPlaces[placeId],
                            })),
                        delete: deletedPlaces.filter((id) =>
                            existPlaces.includes(id)
                        ),
                        create: Object.keys(createdPlaces).map((placeId) => ({
                            areaId: createdPlaces[placeId],
                            ...updatedPlaces[placeId],
                        })),
                    },
                    objects: {
                        // TODO убрать копи паст
                        update: Object.keys(updatedObjects)
                            .map(Number)
                            .filter(
                                (placeId) =>
                                    Boolean(placeId) &&
                                    deletedObjects.indexOf(placeId) === -1 &&
                                    !createdObjects[placeId]
                            )
                            .map((placeId) => ({
                                id: placeId,
                                ...updatedObjects[placeId],
                            })),
                        delete: deletedObjects.filter((id) =>
                            existObjects.includes(id)
                        ),
                        create: Object.keys(createdObjects).map((placeId) => ({
                            areaId: createdObjects[placeId],
                            ...updatedObjects[placeId],
                        })),
                    },
                },
            }
        );

        yield put(
            editSubmitSuccess(
                roomId,
                deletedPlaces,
                deletedObjects,
                places,
                objects,
                rooms
            )
        );
    } catch (e) {
        yield put(editSubmitFailed());
    }
}
