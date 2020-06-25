import { RootStoreType } from 'src/ducks';

export const selectTargetRoom = (state: RootStoreType) =>
    state.roomEditing.targetRoom;
export const selectIsSubmitting = (state: RootStoreType) =>
    state.roomEditing.state.isSubmitting;

export const selectSelectedEditObjectType = (state: RootStoreType) =>
    state.roomEditing.selectedEdit.objectType;
export const selectSelectedEditObjectId = (state: RootStoreType) =>
    state.roomEditing.selectedEdit.id;
