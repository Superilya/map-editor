import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { goToPage } from 'src/ducks/app/actions';

export function* goToPageWorker({ url }: ReturnType<typeof goToPage>) {
    yield put(push(url));
}
