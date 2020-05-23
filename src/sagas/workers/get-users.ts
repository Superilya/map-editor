import { call, put } from 'redux-saga/effects';

import { Users } from 'src/constants/urls';
import { getUsers, getUsersSuccess, getUsersFailed } from 'src/ducks/users/actions';
import { request } from 'src/sagas/request';
import { Response, UserResponse, User } from 'src/types/api';

type WorkerParams = {
    userIds?: Array<User['id']>
}

type UserRequestType = {
    ids?: Array<User['id']>
}

export const getUsersWorker = function* ({ userIds }: WorkerParams) {
    try {
        yield put(getUsers());

        const data: UserRequestType = {};

        if (Array.isArray(userIds)) {
            data.ids = userIds;
        }

        const { users }: Response<UserResponse> = yield call(request, 'get', { url: Users.LIST, data });

        yield put(getUsersSuccess(users));

        return users;
    } catch (error) {
        yield put(getUsersFailed());
    }
}