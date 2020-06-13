import { Room, Place } from 'src/types/api'
import { SelectedEditType } from 'src/types/place-editing'
import { RoomEditinActionType } from './action-types'

export const editStart = (roomId: Room['id']) => ({
  type: RoomEditinActionType.EDIT_START,
  roomId,
})

export const editSubmit = () => ({
  type: RoomEditinActionType.EDIT_SUBMIT,
})

export const editSubmitSuccess = (
  roomId: Room['id'],
  places: Array<Place>,
  deletedPlaces: Array<Place['id']>
) => ({
  type: RoomEditinActionType.EDIT_SUBMIT_SUCCESS,
  deletedPlaces,
  roomId,
  places,
})

export const editSubmitFailed = () => ({
  type: RoomEditinActionType.EDIT_SUBMIT_FAILED,
})

export const editCancel = () => ({
  type: RoomEditinActionType.EDIT_CANCEL,
})

export const setPosition = (
  placeId: Place['id'],
  x: Place['x'],
  y: Place['y']
) => ({
  type: RoomEditinActionType.SET_POSITION,
  placeId,
  x,
  y,
})

export const setRotation = (
  placeId: Place['id'],
  rotation: Place['rotation']
) => ({
  type: RoomEditinActionType.SET_ROTATION,
  rotation,
  placeId,
})

export const deletePlace = (placeId: Place['id']) => ({
  type: RoomEditinActionType.DELETE_PLACE,
  placeId,
})

export const selectEdit = (target: SelectedEditType) => ({
  type: RoomEditinActionType.SELECT_EDIT,
  target,
})
