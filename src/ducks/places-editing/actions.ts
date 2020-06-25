import { Place, Area } from 'src/types/api';
import { PlacesEditinActionType } from './action-types';

export const setPlacePosition = (
    placeId: Place['id'],
    x: Place['x'],
    y: Place['y']
) => ({
    type: PlacesEditinActionType.SET_PLACE_POSITION,
    placeId,
    x,
    y,
});

export const setPlaceRotation = (
    placeId: Place['id'],
    rotation: Place['rotation']
) => ({
    type: PlacesEditinActionType.SET_PLACE_ROTATION,
    rotation,
    placeId,
});

export const deletePlace = (placeId: Place['id']) => ({
    type: PlacesEditinActionType.DELETE_PLACE,
    placeId,
});

export const createPlace = (areaId: Area['id'], id: string) => ({
    type: PlacesEditinActionType.CREATE_PLACE,
    areaId,
    id,
});
