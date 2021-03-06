import { call } from 'redux-saga/effects';
import * as requestUtil from 'src/utils/request';
import { auth } from 'src/utils/auth';
import { CustomError } from 'src/utils/error';
import { Errors } from 'src/constants/error';

import { Auth } from 'src/constants/urls';

import { authSuccess } from 'src/routing/links';
import { CONTEXT_ROOT } from 'src/constants/context';
import qs from 'qs';

export function* request<T>(
    method: keyof typeof requestUtil,
    params: requestUtil.RequestType
) {
    try {
        const uuid: string = yield call(() => auth.uuid);

        if (!uuid) {
            throw new CustomError(Errors.UNAUTHORIZED);
        }

        return yield call(
            (): Promise<T> =>
                requestUtil[method]<T>({
                    ...params,
                    headers: { uuid },
                })
        );
    } catch (exception) {
        if (
            (exception instanceof CustomError && exception.isAuthError()) ||
            (Array.isArray(exception.errors) &&
                exception.errors.includes(Errors.UNAUTHORIZED))
        ) {
            yield call((): void => {
                window.location.href = `${Auth.UI}?${qs.stringify({
                    returnUrl: `${CONTEXT_ROOT}${authSuccess.get()}`,
                })}`;
            });
        }

        throw exception;
    }
}
