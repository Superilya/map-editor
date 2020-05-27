import { call, put, StrictEffect } from 'redux-saga/effects';
import { ParamsType, AuthSuccessPageQuery } from 'src/types/routing';
import { auth } from 'src/utils/auth';
import { replace } from 'connected-react-router';
import { rootLink } from 'src/routing/links';

export const initAuthSuccess = function* (query: AuthSuccessPageQuery, params: ParamsType): Generator<StrictEffect, void, any> {
    if (!query.uuid) {
        return;
    }

    yield call(() => auth.uuid = query.uuid || null);

    yield put(replace(rootLink.get()));
}