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

export const selectTargetArea = createSelector(
    ({ areas }: RootStoreType) => areas.selectedBorder,
    ({ areas }: RootStoreType) => areas.editedBorders,
    ({ areas }: RootStoreType) => areas.entity,
    (selectedBorder, editedBorders, entity) => {
        const targetBorder = selectedBorder;

        if (!targetBorder.areaId) {
            return null;
        }

        const updatedBorders = editedBorders[targetBorder.areaId];
        const area = entity[targetBorder.areaId];

        if (!area) {
            return null;
        }

        if (!Array.isArray(updatedBorders)) {
            return area;
        }

        return {
            ...area,
            borders: updatedBorders,
        };
    }
);

export const selectTargetBorder = createSelector(
    selectTargetArea,
    ({ areas }: RootStoreType) => areas.selectedBorder,
    (area, selectedBorder) => {
        if (!area || !selectedBorder.borderId || !selectedBorder.areaId) {
            return null;
        }

        return (
            area.borders.find(({ id }) => id === selectedBorder.borderId) ||
            null
        );
    }
);
