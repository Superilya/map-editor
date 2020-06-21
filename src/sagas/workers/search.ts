import { put, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { request } from 'src/sagas/request'
import {
  search as searchAction,
  searchSuccess,
  searchFailed,
} from 'src/ducks/search/actions'
import { Map } from 'src/constants/urls'
import { SearchResponse } from 'src/types/api'
import { buildingLink } from 'src/routing/links'

export function* search({ userId }: ReturnType<typeof searchAction>) {
  try {
    const resulr: SearchResponse = yield call(request, 'get', {
      url: Map.SEARCH,
      data: { userId },
    })

    const targetSearch = resulr.search.find((place) => place.userId === userId)

    if (!targetSearch) {
      throw new Error()
    }

    yield put(
      push(
        buildingLink.get(
          {
            buildingId: String(targetSearch.room.building.id),
            floor: String(targetSearch.room.floor),
          },
          { place: String(targetSearch.id) }
        )
      )
    )

    yield put(searchSuccess())
  } catch {
    yield put(searchFailed())
  }
}
