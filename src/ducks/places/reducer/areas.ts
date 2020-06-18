import { InferValueTypes } from 'src/types/common'
import { Room, Area } from 'src/types/api'
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types'
import { editSubmitSuccess } from 'src/ducks/room-editing/actions'
import { PlacesActionType } from '../action-types'
import * as actions from '../actions'

export type ActionTypes = ReturnType<
  InferValueTypes<typeof actions> | typeof editSubmitSuccess
>

type StateType = Record<Room['id'], Area['id']>

export const initialState: StateType = {}

export const areas = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {
    case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
    case PlacesActionType.GET_PLACES_SUCCESS: {
      return action.places.reduce(
        (acc, place) => {
          acc[place.id] = place.area.id

          return acc
        },
        { ...state }
      )
    }

    default: {
      return state
    }
  }
}
