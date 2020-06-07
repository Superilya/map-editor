import { select, call, put } from 'redux-saga/effects';
import { selectUpdatedPlaces, selectTargetRoom } from "src/ducks/room-editing/selectors"
import { Map } from 'src/constants/urls'
import { request } from 'src/sagas/request'
import { Response, PlaceResponse } from 'src/types/api';
import { editSubmitFailed, editSubmitSuccess } from 'src/ducks/room-editing/actions';

export const editSubmitWorker = function* () {
    const updatedPlaces: ReturnType<typeof selectUpdatedPlaces> = yield select(selectUpdatedPlaces);
    const roomId: ReturnType<typeof selectTargetRoom> = yield select(selectTargetRoom);

    try {
        if (!roomId) {
            throw new Error();
        }

        const { places }: Response<PlaceResponse> = yield call(request, 'post', { url: Map.ROOM_EDIT(roomId), data: {
            places: {
                update: Object.keys(updatedPlaces).map(placeIdStr => {
                    const placeId = Number(placeIdStr);

                    return {
                        id: placeId,
                        ...updatedPlaces[placeId]
                    };
                })
            }
        } });

        yield put(editSubmitSuccess(places));
    } catch (e) {
        yield put(editSubmitFailed());
    }
}