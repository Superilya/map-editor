import { InferValueTypes } from 'src/types/common'
import { Area } from 'src/types/api'
import { RoomEditinActionType } from '../action-types'
import * as actions from '../actions'

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

type StateType = Record<string, Area['id']>

export const initialState: StateType = {}

export const created = (
  state: StateType = initialState,
  action: ActionTypes
): StateType => {
  switch (action.type) {
    case RoomEditinActionType.CREATE_PLACE: {
      return {
        ...state,
        [action.id]: action.areaId,
      }
    }

    case RoomEditinActionType.DELETE_PLACE: {
      if (!state[action.placeId]) {
        return state
      }

      const targetState = { ...state }

      delete targetState[action.placeId]

      return targetState
    }

    case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
    case RoomEditinActionType.EDIT_CANCEL: {
      return {}
    }

    default: {
      return state
    }
  }
}
