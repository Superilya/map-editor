import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';

export const selectPlaceAreasList = createSelector(
    (state: RootStoreType) => state.areas.entity,
    (state: RootStoreType) => state.areas.places,
    (entity, placesList) =>
        placesList.map((areaId) => entity[areaId]).filter(Boolean)
);

export const selectObjectsAreasList = createSelector(
    (state: RootStoreType) => state.areas.entity,
    (state: RootStoreType) => state.areas.objects,
    (entity, placesList) =>
        placesList.map((areaId) => entity[areaId]).filter(Boolean)
);
