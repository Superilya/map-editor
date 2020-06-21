import { all, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { AppActionType } from 'src/ducks/app/action-types'
import { PlacesActionType } from 'src/ducks/places/action-types'
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types'
import { AreasActionType } from 'src/ducks/areas/action-types'
import { SearchActionType } from 'src/ducks/search/action-types'

import { getLocationChange } from './location'
import { goToPageWorker } from './workers/go-to-page'
import { changeMyPlaceWorker } from './workers/change-my-place'
import { editSubmitWorker } from './workers/edit-submit'
import { getMapObjectsWorker } from './workers/get-map-objects'
import { search } from './workers/search'

export function* sagas() {
  yield all([
    takeLatest(PlacesActionType.CHANGE_MY_PLACE, changeMyPlaceWorker),
    takeLatest(AppActionType.GO_TO_PAGE, goToPageWorker),
    takeLatest(LOCATION_CHANGE, getLocationChange),
    takeLatest(RoomEditinActionType.EDIT_SUBMIT, editSubmitWorker),
    takeLatest(AreasActionType.GET_MAP_OBJECTS, getMapObjectsWorker),
    takeLatest(SearchActionType.SEARCH, search),
  ])
}
