import { InferValueTypes } from 'src/types/common'
import { SearchActionType } from './action-types'
import * as actions from './actions'

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

type StateType = {
  isLoading: boolean
}

export const initialState: StateType = {
  isLoading: false,
}

export const self = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {
    case SearchActionType.SEARCH: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case SearchActionType.SEARCH_SUCCESS:
    case SearchActionType.SEARCH_FAILED: {
      return {
        ...state,
        isLoading: false,
      }
    }

    default: {
      return state
    }
  }
}
