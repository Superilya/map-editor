import { InferValueTypes } from 'src/types/common'
import { Room } from 'src/types/api'
import { RoomEditinActionType } from '../action-types'
import * as actions from '../actions'

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

export type StateType = Room['id'] | null

export const initialState: StateType = null

export const targetRoom = (
  state: StateType = initialState,
  action: ActionTypes
): StateType => {
  switch (action.type) {
    case RoomEditinActionType.EDIT_START: {
      return action.roomId
    }

    case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
    case RoomEditinActionType.EDIT_CANCEL: {
      return null
    }

    default: {
      return state
    }
  }
}
