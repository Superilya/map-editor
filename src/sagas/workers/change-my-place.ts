import { call, put } from 'redux-saga/effects'

import { Map } from 'src/constants/urls'
import {
  changeMyPlace,
  changeMyPlaceSuccess,
  changeMyPlaceFailed,
} from 'src/ducks/places/actions'
import { request } from 'src/sagas/request'
import { Response, PlaceResponse } from 'src/types/api'

export function* changeMyPlaceWorker(action: ReturnType<typeof changeMyPlace>) {
  try {
    const { places }: Response<PlaceResponse> = yield call(request, 'post', {
      url: Map.CHANGE_MY_PLACE(action.targetPlaceId),
    })

    yield put(changeMyPlaceSuccess(places))

    return places
  } catch (error) {
    yield put(changeMyPlaceFailed())

    return null
  }
}
