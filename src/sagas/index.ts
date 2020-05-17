import { all, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { AppActionType } from 'src/ducks/app/action-types';
import { getLocationChange } from './location';

import { goToPageWorker } from './workers/go-to-page';
import { updateRoomsWorker } from './workers/update-rooms';
import { BuildingPageActionType } from 'src/ducks/building-page/action-types';

export function* sagas() {
    yield all([
        yield takeLatest(AppActionType.GO_TO_PAGE, goToPageWorker),
        yield takeLatest(BuildingPageActionType.UPDATE_ROOMS, updateRoomsWorker),
        yield takeLatest(LOCATION_CHANGE, getLocationChange)
    ]);
}