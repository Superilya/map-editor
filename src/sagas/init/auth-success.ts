import { call, put } from 'redux-saga/effects'
import { AuthSuccessPageQuery } from 'src/types/routing'
import { auth } from 'src/utils/auth'
import { replace } from 'connected-react-router'
import { rootLink } from 'src/routing/links'

export function* initAuthSuccess(query: AuthSuccessPageQuery) {
  if (!query.uuid) {
    return
  }

  yield call(() => {
    auth.uuid = query.uuid || null
  })

  yield put(replace(rootLink.get()))
}
