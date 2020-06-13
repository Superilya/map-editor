import { InferValueTypes } from 'src/types/common'
import { Place, Room } from 'src/types/api'
import { editSubmitSuccess } from 'src/ducks/room-editing/actions'
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types'
import * as actions from '../actions'
import { PlacesActionType } from '../action-types'

export type ActionTypes = ReturnType<
  InferValueTypes<typeof actions> | typeof editSubmitSuccess
>

type StateType = Record<Room['id'], Array<Place['id']>>

export const initialState: StateType = {}

export const list = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {
    case PlacesActionType.GET_PLACES_SUCCESS: {
      return {
        ...state,
        [action.roomId]: action.places.map(({ id }) => id),
      }
    }

    case RoomEditinActionType.EDIT_SUBMIT_SUCCESS: {
      if (!Array.isArray(state[action.roomId])) {
        return state
      }

      return {
        ...state,
        [action.roomId]: state[action.roomId].filter(
          (placeId) => action.deletedPlaces.indexOf(placeId) === -1
        ),
      }
    }

    default: {
      return state
    }
  }
}
