import { RoomEditinActionType } from './action-types';
import { Room, Place } from 'src/types/api';

export const editStart = (roomId: Room['id']) => ({
    type: RoomEditinActionType.EDIT_START,
    roomId
});

export const editSubmit = () => ({
    type: RoomEditinActionType.EDIT_SUBMIT
})

export const editSubmitSuccess = (places: Array<Place>) => ({
    type: RoomEditinActionType.EDIT_SUBMIT_SUCCESS,
    places
});

export const editSubmitFailed = () => ({
    type: RoomEditinActionType.EDIT_SUBMIT_FAILED
});

export const editCancel = () => ({
    type: RoomEditinActionType.EDIT_CANCEL
})

export const setPosition = (placeId: Place['id'], x: Place['x'], y: Place['y']) => ({
    type: RoomEditinActionType.SET_POSITION,
    placeId,
    x, y
});

export const setRotation = (placeId: Place['id'], rotation: Place['rotation']) => ({
    type: RoomEditinActionType.SET_ROTATION,
    rotation,
    placeId
})
