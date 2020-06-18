import { select, call, put } from 'redux-saga/effects'
import {
  selectUpdatedPlaces,
  selectTargetRoom,
  selectDeleted,
  selectCreated,
} from 'src/ducks/room-editing/selectors'
import { Map } from 'src/constants/urls'
import { request } from 'src/sagas/request'
import { Response, PlaceResponse } from 'src/types/api'
import {
  editSubmitFailed,
  editSubmitSuccess,
} from 'src/ducks/room-editing/actions'

export function* editSubmitWorker() {
  const updatedPlaces: ReturnType<typeof selectUpdatedPlaces> = yield select(
    selectUpdatedPlaces
  )
  const deletedPlaces: ReturnType<typeof selectDeleted> = yield select(
    selectDeleted
  )
  const createdPlaces: ReturnType<typeof selectCreated> = yield select(
    selectCreated
  )
  const roomId: ReturnType<typeof selectTargetRoom> = yield select(
    selectTargetRoom
  )

  try {
    if (!roomId) {
      throw new Error()
    }

    const { places }: Response<PlaceResponse> = yield call(request, 'post', {
      url: Map.ROOM_EDIT(roomId),
      data: {
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
          delete: deletedPlaces,
          create: Object.keys(createdPlaces).map((placeId) => ({
            areaId: createdPlaces[placeId],
            ...updatedPlaces[placeId],
          })),
        },
      },
    })

    yield put(editSubmitSuccess(roomId, places, deletedPlaces))
  } catch (e) {
    yield put(editSubmitFailed())
  }
}
