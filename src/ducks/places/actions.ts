import { PlacesActionType } from './action-types';
import { Place, Room } from 'src/types/api';

export const getPlaces = (roomId: Room['id']) => ({
    type: PlacesActionType.GET_PLACES,
    roomId
});

export const getPlacesSuccess = (roomId: Room['id'], places: Array<Place>) => ({
    type: PlacesActionType.GET_PLACES_SUCCESS,
    roomId,
    places
});

export const getPlacesFailed = () => ({
    type: PlacesActionType.GET_PLACES_FAILED
});
