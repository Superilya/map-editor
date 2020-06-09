import { select, call, put } from 'redux-saga/effects';
import { selectUpdatedPlaces, selectTargetRoom, selectDeleted } from "src/ducks/room-editing/selectors"
import { Map } from 'src/constants/urls'
import { request } from 'src/sagas/request'
import { Response, PlaceResponse } from 'src/types/api';
import { editSubmitFailed, editSubmitSuccess } from 'src/ducks/room-editing/actions';

export const editSubmitWorker = function* () {
    const updatedPlaces: ReturnType<typeof selectUpdatedPlaces> = yield select(selectUpdatedPlaces);
    const deletedPlaces: ReturnType<typeof selectDeleted> = yield select(selectDeleted);
    const roomId: ReturnType<typeof selectTargetRoom> = yield select(selectTargetRoom);

    try {
        if (!roomId) {
            throw new Error();
        }

        const { places }: Response<PlaceResponse> = yield call(request, 'post', { url: Map.ROOM_EDIT(roomId), data: {
            places: {
                update: Object.keys(updatedPlaces)
                    .map(Number)
                    .filter(placeId => deletedPlaces.indexOf(placeId) === -1)
                    .map(placeId => ({
                        id: placeId,
                        ...updatedPlaces[placeId]
                    })),
                delete: deletedPlaces
            }
        } });

        yield put(editSubmitSuccess(roomId, places, deletedPlaces));
    } catch (e) {
        yield put(editSubmitFailed());
    }
}