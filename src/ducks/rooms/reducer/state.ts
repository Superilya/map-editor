import { InferValueTypes } from 'src/types/common'
import { RoomsActionType } from '../action-types'
import * as actions from '../actions'

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

type StateType = {
  isRoomsLoading: boolean
}

export const initialState: StateType = {
  isRoomsLoading: false,
}

export const state = (
  reducerState = initialState,
  action: ActionTypes
): StateType => {
  switch (action.type) {
    case RoomsActionType.GET_ROOMS: {
      return {
        ...reducerState,
        isRoomsLoading: true,
      }
    }

    case RoomsActionType.GET_ROOMS_FAILED:
    case RoomsActionType.GET_ROOMS_SUCCESS: {
      return {
        ...reducerState,
        isRoomsLoading: false,
      }
    }

    default: {
      return reducerState
    }
  }
}
