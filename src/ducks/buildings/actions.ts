import { BuildingsActionType } from './action-types';
import { Building } from 'src/types/api';

export const getBuildings = () => ({
    type: BuildingsActionType.GET_BUILDINGS
});

export const getBuildingsSuccess = (buildings: Array<Building>) => ({
    type: BuildingsActionType.GET_BUILDINGS_SUCCESS,
    buildings
});

export const getBuildingsFailed = () => ({
    type: BuildingsActionType.GET_BUILDINGS_FAILED
});
