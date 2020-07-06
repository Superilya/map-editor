import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';
import { Room } from 'src/types/api';
import { selectSelectedEditObjectId } from 'src/ducks/room-editing/selectors';
import { editableList, editableObject } from 'src/utils/common-selectors';

export const selectUpdatedPlaces = (state: RootStoreType) =>
    state.placesEditing.updated;
export const selectDeletedPlaces = (state: RootStoreType) =>
    state.placesEditing.deleted;
export const selectCreatedPlaces = (state: RootStoreType) =>
    state.placesEditing.created;

export const selectEditedPlaces = createSelector(
    (state: RootStoreType) => state.places.entity,
    (state: RootStoreType, props: { roomId: Room['id'] }) =>
        state.places.list[props.roomId],
    (state: RootStoreType) => state.places.areas,
    selectUpdatedPlaces,
    selectDeletedPlaces,
    selectCreatedPlaces,
    (state: RootStoreType) => state.areas.entity,
    editableList
);

export const selectEditablePlaceFields = createSelector(
    selectSelectedEditObjectId,
    (state: RootStoreType) => state.places.areas,
    (state: RootStoreType) => state.places.entity,
    selectUpdatedPlaces,
    selectCreatedPlaces,
    (state: RootStoreType) => state.areas.entity,
    editableObject
);
