import { InferValueTypes } from 'src/types/common'
import { Place } from 'src/types/api'
import { RoomEditinActionType } from '../action-types'
import * as actions from '../actions'

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

type StateType = Array<Place['id']>

export const initialState: StateType = []

export const deletedPlaces = (
  state: StateType = initialState,
  action: ActionTypes
): StateType => {
  switch (action.type) {
    case RoomEditinActionType.DELETE_PLACE: {
      if (state.indexOf(action.placeId) !== -1) {
        return state
      }

      return [...state, action.placeId]
    }

    case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
    case RoomEditinActionType.EDIT_CANCEL: {
      return []
    }

    default: {
      return state
    }
  }
}
