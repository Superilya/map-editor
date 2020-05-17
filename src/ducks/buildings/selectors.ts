import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';
import { Building } from 'src/types/api';

export const selectBuildings = createSelector(
    (state: RootStoreType) => state.buildings.entity,
    (state: RootStoreType) => state.buildings.list,
    (entity, list) => list.map(id => entity[id])
);

export const selectIsBuildingsLoading = (state: RootStoreType) => state.buildings.state.isBuildingsLoading;
export const selectTargetBuilding = (buildingId: Building['id']) => (state: RootStoreType) => (
    state.buildings.entity[buildingId]
);
