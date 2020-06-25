import { Place, Room } from 'src/types/api';
import { PlacesActionType } from './action-types';

export const getPlaces = (roomId: Room['id']) => ({
    type: PlacesActionType.GET_PLACES,
    roomId,
});

export const getPlacesSuccess = (roomId: Room['id'], places: Array<Place>) => ({
    type: PlacesActionType.GET_PLACES_SUCCESS,
    roomId,
    places,
});

export const getPlacesFailed = () => ({
    type: PlacesActionType.GET_PLACES_FAILED,
});

export const changeMyPlace = (targetPlaceId: Place['id']) => ({
    type: PlacesActionType.CHANGE_MY_PLACE,
    targetPlaceId,
});

export const changeMyPlaceSuccess = (places: Array<Place>) => ({
    type: PlacesActionType.CHANGE_MY_PLACE_SUCCESS,
    places,
});

export const changeMyPlaceFailed = () => ({
    type: PlacesActionType.CHANGE_MY_PLACE_FAILED,
});
