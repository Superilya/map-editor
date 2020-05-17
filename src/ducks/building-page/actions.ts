import { BuildingPageActionType } from './action-types';
import { Building } from 'src/types/api';

export const updateRooms = (buildingId: Building['id'], floor: Building['floors'][0]) => ({
    type: BuildingPageActionType.UPDATE_ROOMS,
    buildingId,
    floor
});

export const setFloor = (floor: Building['floors'][0]) => ({
    type: BuildingPageActionType.SET_FLOOR,
    floor
});
