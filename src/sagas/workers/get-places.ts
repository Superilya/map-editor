import { call, put } from 'redux-saga/effects'

import { Map } from 'src/constants/urls'
import { request } from 'src/sagas/request'
import { Response, Room, PlaceResponse } from 'src/types/api'
import { getPlacesSuccess, getPlacesFailed } from 'src/ducks/places/actions'

type WorkerParams = {
  roomId: Room['id']
}

export function* getPlacesWorker({ roomId }: WorkerParams) {
  try {
    const { places }: Response<PlaceResponse> = yield call(request, 'get', {
      url: Map.PLACES,
      data: { room: roomId },
    })

    yield put(getPlacesSuccess(roomId, places))

    return places
  } catch (error) {
    yield put(getPlacesFailed())

    return null
  }
}
