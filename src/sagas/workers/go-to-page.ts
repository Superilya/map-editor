import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { goToPage } from 'src/ducks/app/actions';

export const goToPageWorker = function* ({ url }: ReturnType<typeof goToPage>) {
    yield put(push(url));
};
