import { InferValueTypes } from 'src/types/common'
import { UsersActionType } from '../action-types'
import * as actions from '../actions'

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

type StateType = {
  isSelfLoading: boolean
}

export const initialState: StateType = {
  isSelfLoading: false,
}

export const state = (
  reducerState = initialState,
  action: ActionTypes
): StateType => {
  switch (action.type) {
    case UsersActionType.GET_SELF: {
      return {
        ...reducerState,
        isSelfLoading: true,
      }
    }

    case UsersActionType.GET_SELF_FAILED:
    case UsersActionType.GET_SELF_SUCCESS: {
      return {
        ...reducerState,
        isSelfLoading: false,
      }
    }

    default: {
      return reducerState
    }
  }
}
