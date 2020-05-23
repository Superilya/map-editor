import { all, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import { AppActionType } from 'src/ducks/app/action-types';
import { getLocationChange } from './location';

import { goToPageWorker } from './workers/go-to-page';

export function* sagas() {
    yield all([
        yield takeLatest(AppActionType.GO_TO_PAGE, goToPageWorker),
        yield takeLatest(LOCATION_CHANGE, getLocationChange)
    ]);
}