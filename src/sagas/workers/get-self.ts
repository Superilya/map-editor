import { call, put } from 'redux-saga/effects';

import { Users } from 'src/constants/urls';
import { getSelf, getSelfFailed, getSelfSuccess } from 'src/ducks/users/actions';
import { request } from 'src/sagas/request';
import { Response, UserResponse } from 'src/types/api';

export const getSelfWorker = function* () {
    try {
        yield put(getSelf());

        const { users }: Response<UserResponse> = yield call(request, 'get', { url: Users.SELF });
        const selfUser = users[0];

        yield put(getSelfSuccess(selfUser));

        return selfUser;
    } catch (error) {
        yield put(getSelfFailed());
    }
}