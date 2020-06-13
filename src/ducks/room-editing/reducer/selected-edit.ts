import { InferValueTypes } from 'src/types/common'
import { SelectedEditType } from 'src/types/place-editing'
import { RoomEditinActionType } from '../action-types'
import * as actions from '../actions'

export type ActionTypes = ReturnType<InferValueTypes<typeof actions>>

type StateType = SelectedEditType

export const initialState: StateType = {
  objectType: null,
  id: null,
}

export const selectedEdit = (
  state: StateType = initialState,
  action: ActionTypes
): StateType => {
  switch (action.type) {
    case RoomEditinActionType.SELECT_EDIT: {
      return action.target
    }

    case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
    case RoomEditinActionType.EDIT_CANCEL: {
      return {
        objectType: null,
        id: null,
      }
    }

    default: {
      return state
    }
  }
}
