import { RootStoreType } from 'src/ducks';
import { createSelector } from 'reselect';
import { Room } from 'src/types/api';
import {
    selectSelectedEditObjectType,
    selectSelectedEditObjectId,
} from 'src/ducks/room-editing/selectors';
import { editableList, editableObject } from 'src/utils/common-selectors';

export const selectUpdatedObjects = (state: RootStoreType) =>
    state.objectsEditing.updated;
export const selectDeletedObjects = (state: RootStoreType) =>
    state.objectsEditing.deleted;
export const selectCreatedObjects = (state: RootStoreType) =>
    state.objectsEditing.created;

export const selectEditedObjects = createSelector(
    (state: RootStoreType) => state.objects.entity,
    (state: RootStoreType, props: { roomId: Room['id'] }) =>
        state.objects.list[props.roomId],
    (state: RootStoreType) => state.objects.areas,
    selectUpdatedObjects,
    selectDeletedObjects,
    selectCreatedObjects,
    (state: RootStoreType) => state.areas.entity,
    editableList
);

export const selectEditableObjectFields = createSelector(
    selectSelectedEditObjectType,
    selectSelectedEditObjectId,
    (state: RootStoreType) => state.objects.areas,
    (state: RootStoreType) => state.objects.entity,
    selectUpdatedObjects,
    selectCreatedObjects,
    (state: RootStoreType) => state.areas.entity,
    editableObject
);
