import { InferValueTypes } from 'src/types/common'
import { Area } from 'src/types/api'
import { RoomsActionType } from 'src/ducks/rooms/action-types'
import { PlacesActionType } from 'src/ducks/places/action-types'
import { RoomEditinActionType } from 'src/ducks/room-editing/action-types'
import { getRoomsSuccess } from 'src/ducks/rooms/actions'
import { getPlacesSuccess } from 'src/ducks/places/actions'
import { editSubmitSuccess } from 'src/ducks/room-editing/actions'
import * as actions from '../actions'
import { AreasActionType } from '../action-types'

export type ActionTypes = ReturnType<
  | InferValueTypes<typeof actions>
  | typeof getRoomsSuccess
  | typeof getPlacesSuccess
  | typeof editSubmitSuccess
>

type StateType = Record<Area['id'], Area>

export const initialState: StateType = {}

export const entity = (
  state = initialState,
  action: ActionTypes
): StateType => {
  switch (action.type) {
    case AreasActionType.GET_MAP_OBJECTS_SUCCESS: {
      return action.areas.reduce(
        (acc, area) => {
          acc[area.id] = area

          return acc
        },
        { ...state }
      )
    }

    case RoomsActionType.GET_ROOMS_SUCCESS: {
      return action.rooms.reduce(
        (acc, room) => {
          acc[room.area.id] = room.area

          return acc
        },
        { ...state }
      )
    }

    case RoomEditinActionType.EDIT_SUBMIT_SUCCESS:
    case PlacesActionType.GET_PLACES_SUCCESS: {
      return action.places.reduce(
        (acc, place) => {
          acc[place.area.id] = place.area

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
